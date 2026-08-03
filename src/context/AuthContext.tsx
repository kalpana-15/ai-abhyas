"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { enrollInCourse } from "@/actions/enrollmentActions";

export interface User {
  id?: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  enrolledCourses: string[];
  loading: boolean;
  login: (userData: User, redirectPath?: string) => void;
  register: (userData: User, redirectPath?: string) => void;
  logout: () => void;
  enroll: (courseTitle: string, shouldNavigate?: boolean) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshSession = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            avatar: data.user.avatar,
          });
          setEnrolledCourses(data.user.enrolledCourses || []);
        } else {
          setUser(null);
          setEnrolledCourses([]);
        }
      }
    } catch (error) {
      console.error("Error refreshing backend authentication session:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Perform verification of live JWT cookie session from PostgreSQL backend on mount
    refreshSession();
  }, []);

  const login = (userData: User & { enrolledCourses?: string[] }, redirectPath?: string) => {
    setUser(userData);
    if (userData.enrolledCourses) {
      setEnrolledCourses(userData.enrolledCourses);
    }
    router.push(redirectPath || "/dashboard");
  };

  const register = (userData: User, redirectPath?: string) => {
    setUser(userData);
    setEnrolledCourses([]);
    if (redirectPath) {
      router.push(redirectPath);
    } else {
      router.push("/dashboard");
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Error invoking logout route:", error);
    } finally {
      setUser(null);
      setEnrolledCourses([]);
      router.push("/");
    }
  };

  const enroll = async (courseTitle: string, shouldNavigate = true) => {
    if (!user) {
      // Prompt sign in if unauthenticated
      router.push(`/login?redirect=/enroll?course=${encodeURIComponent(courseTitle)}`);
      return;
    }

    // Immediately reflect optimistic update in state for snappy responsiveness
    setEnrolledCourses((prev) => {
      if (prev.includes(courseTitle)) return prev;
      return [...prev, courseTitle];
    });

    // Persist real record in PostgreSQL via Next.js Server Action
    const result = await enrollInCourse(courseTitle);
    if (result && !result.success) {
      console.warn("Enrollment server action feedback:", result.error || result.message);
    }

    // Refresh database session to guarantee exact synchronization of enrolled courses on dashboard
    await refreshSession();

    if (shouldNavigate) {
      router.push("/dashboard");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, enrolledCourses, loading, login, register, logout, enroll, refreshSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

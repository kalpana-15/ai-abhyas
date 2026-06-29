"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface User {
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  enrolledCourses: string[];
  login: (userData: User) => void;
  register: (userData: User) => void;
  logout: () => void;
  enroll: (courseTitle: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load from localStorage on initial render
    const storedUser = localStorage.getItem("ai_abhyas_user");
    const storedCourses = localStorage.getItem("ai_abhyas_courses");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Seed Dummy User
      const dummyUser = { 
        name: "Ananya Singh", 
        email: "ananya@example.com",
        role: "Student",
        avatar: "https://i.pravatar.cc/150?u=ananya" 
      };
      setUser(dummyUser);
      localStorage.setItem("ai_abhyas_user", JSON.stringify(dummyUser));
    }

    if (storedCourses) {
      setEnrolledCourses(JSON.parse(storedCourses));
    } else {
      // Seed Dummy Enrollment
      const dummyCourse = "Generative AI Masterclass";
      setEnrolledCourses([dummyCourse]);
      localStorage.setItem("ai_abhyas_courses", JSON.stringify([dummyCourse]));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("ai_abhyas_user", JSON.stringify(userData));
    router.push("/dashboard");
  };

  const register = (userData: User) => {
    setUser(userData);
    localStorage.setItem("ai_abhyas_user", JSON.stringify(userData));
    // Redirection happens in the component
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ai_abhyas_user");
    router.push("/");
  };

  const enroll = (courseTitle: string) => {
    if (!user) {
      // If not logged in, redirect to login
      router.push(`/login?redirect=/enroll?course=${encodeURIComponent(courseTitle)}`);
      return;
    }
    
    setEnrolledCourses((prev) => {
      if (prev.includes(courseTitle)) return prev; // Already enrolled
      const newCourses = [...prev, courseTitle];
      localStorage.setItem("ai_abhyas_courses", JSON.stringify(newCourses));
      return newCourses;
    });
    
    router.push("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ user, enrolledCourses, login, register, logout, enroll }}>
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

"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import scheduleData from "@/data/dashboard-schedule.json";
import { Video, Calendar, Clock, Users, ArrowRight } from "lucide-react";

export default function LiveClassesPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground mb-2">Live Classes</h1>
        <p className="text-muted-foreground">Join upcoming live interactive sessions and webinars.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Schedule List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" /> Upcoming Sessions
          </h2>
          
          {scheduleData.map((session, idx) => (
            <div key={idx} className="bg-card border border-border shadow-sm rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center justify-center bg-primary/5 text-primary rounded-xl w-24 h-24 shrink-0 border border-primary/10">
                <span className="text-sm font-bold uppercase">{session.date.split(" ")[1]}</span>
                <span className="text-3xl font-black">{session.date.split(" ")[0]}</span>
              </div>
              
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-md mb-2">
                  <Video className="w-3.5 h-3.5" /> Live Webinar
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{session.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {session.time}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 120+ Enrolled</span>
                </div>
              </div>

              <div className="shrink-0 mt-4 sm:mt-0">
                <button className="w-full sm:w-auto bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  Join Room <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-[#5E35B1] to-[#4527A0] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
            <h3 className="text-lg font-bold mb-2 relative z-10">Missed a class?</h3>
            <p className="text-white/80 text-sm mb-6 relative z-10">Don't worry, all live sessions are recorded and uploaded within 24 hours.</p>
            <button className="bg-white text-[#5E35B1] px-5 py-2 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors relative z-10 w-full">
              View Recordings
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">Your Instructors</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Instructor" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Dr. Sarah Jenkins</h4>
                    <p className="text-xs text-muted-foreground">Lead AI Researcher</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

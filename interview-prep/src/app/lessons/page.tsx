"use client";

import Link from "next/link";
import { LESSONS } from "@/data/lessons";

const DIFFICULTY_BADGE: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

export default function LessonsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Study Guides & Lessons</h1>
          <p className="text-indigo-100 text-lg max-w-2xl">
            Deep-dive into every embedded systems topic with code examples, diagrams,
            and expert tips. Master the concepts that interviewers love to test.
          </p>
        </div>
        {/* Decorative circuit-like pattern */}
        <svg className="absolute right-0 top-0 h-full w-64 opacity-10" viewBox="0 0 200 200">
          <circle cx="40" cy="40" r="4" fill="white"/>
          <circle cx="100" cy="30" r="4" fill="white"/>
          <circle cx="160" cy="60" r="4" fill="white"/>
          <circle cx="80" cy="100" r="4" fill="white"/>
          <circle cx="140" cy="120" r="4" fill="white"/>
          <circle cx="50" cy="160" r="4" fill="white"/>
          <circle cx="120" cy="170" r="4" fill="white"/>
          <circle cx="170" cy="150" r="4" fill="white"/>
          <line x1="40" y1="40" x2="100" y2="30" stroke="white" strokeWidth="1"/>
          <line x1="100" y1="30" x2="160" y2="60" stroke="white" strokeWidth="1"/>
          <line x1="80" y1="100" x2="140" y2="120" stroke="white" strokeWidth="1"/>
          <line x1="40" y1="40" x2="80" y2="100" stroke="white" strokeWidth="1"/>
          <line x1="160" y1="60" x2="140" y2="120" stroke="white" strokeWidth="1"/>
          <line x1="50" y1="160" x2="120" y2="170" stroke="white" strokeWidth="1"/>
          <line x1="120" y1="170" x2="170" y2="150" stroke="white" strokeWidth="1"/>
          <line x1="80" y1="100" x2="50" y2="160" stroke="white" strokeWidth="1"/>
          <line x1="140" y1="120" x2="170" y2="150" stroke="white" strokeWidth="1"/>
        </svg>
      </div>

      {/* Stats bar */}
      <div className="flex gap-6 text-sm text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-violet-500"></span>
          {LESSONS.length} Topics
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          {LESSONS.reduce((sum, l) => sum + l.sections.length, 0)} Sections
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          ~{LESSONS.reduce((sum, l) => sum + l.estimatedMinutes, 0)} min total
        </span>
      </div>

      {/* Lessons grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {LESSONS.map((lesson) => (
          <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="group">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
              {/* Colored top bar */}
              <div className={`h-2 bg-gradient-to-r ${lesson.gradientFrom} ${lesson.gradientTo}`} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{lesson.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-violet-700 transition">{lesson.title}</h3>
                      <p className="text-sm text-gray-500">{lesson.category}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${DIFFICULTY_BADGE[lesson.difficulty]}`}>
                    {lesson.difficulty}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{lesson.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>{lesson.sections.length} sections</span>
                    <span>{lesson.estimatedMinutes} min</span>
                  </div>
                  <span className="text-violet-600 font-medium group-hover:translate-x-1 transition-transform inline-block">
                    Start learning →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Learning path suggestion */}
      <div className="bg-gradient-to-r from-violet-50 to-pink-50 rounded-xl border border-violet-100 p-6">
        <h2 className="font-bold text-gray-900 mb-2">Suggested Learning Path</h2>
        <p className="text-sm text-gray-600 mb-4">For the most efficient prep, follow this order:</p>
        <div className="flex flex-wrap gap-2">
          {["Embedded C/C++", "Digital Logic", "Microcontrollers", "Communication Protocols", "RTOS", "Signal Processing", "System Design", "Behavioral"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="bg-violet-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">{i + 1}</span>
              <span className="text-sm font-medium text-gray-700">{step}</span>
              {i < 7 && <span className="text-gray-300 mx-1">→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

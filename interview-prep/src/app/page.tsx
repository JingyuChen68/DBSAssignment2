"use client";

import Link from "next/link";
import { useApp, DIFFICULTY_COLORS, STATUS_COLORS } from "@/context/AppContext";
import { LESSONS } from "@/data/lessons";

export default function Dashboard() {
  const { questions, companies, checklist } = useApp();

  const totalQuestions = questions.length;
  const masteredCount = questions.filter((q) => q.status === "Mastered").length;
  const inProgressCount = questions.filter((q) => q.status === "In Progress").length;
  const checklistDone = checklist.filter((i) => i.completed).length;
  const checklistTotal = checklist.length;
  const checklistPercent = checklistTotal > 0 ? Math.round((checklistDone / checklistTotal) * 100) : 0;
  const activeCompanies = companies.filter((c) => c.status === "Interviewing").length;

  const categoryBreakdown = questions.reduce<Record<string, number>>((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {});

  const recentQuestions = questions.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to EmbedPrep ⚡</h1>
          <p className="text-violet-100 text-lg">
            Your embedded systems &amp; hardware interview toolkit. Study lessons,
            practice questions, plan your career, and ace your interviews.
          </p>
        </div>
        {/* Decorative chip/circuit SVG */}
        <svg className="absolute right-4 bottom-4 w-32 h-32 opacity-10" viewBox="0 0 100 100">
          <rect x="25" y="25" width="50" height="50" rx="4" fill="none" stroke="white" strokeWidth="2"/>
          <rect x="35" y="35" width="30" height="30" rx="2" fill="white" opacity="0.3"/>
          <line x1="25" y1="40" x2="10" y2="40" stroke="white" strokeWidth="2"/>
          <line x1="25" y1="50" x2="10" y2="50" stroke="white" strokeWidth="2"/>
          <line x1="25" y1="60" x2="10" y2="60" stroke="white" strokeWidth="2"/>
          <line x1="75" y1="40" x2="90" y2="40" stroke="white" strokeWidth="2"/>
          <line x1="75" y1="50" x2="90" y2="50" stroke="white" strokeWidth="2"/>
          <line x1="75" y1="60" x2="90" y2="60" stroke="white" strokeWidth="2"/>
          <line x1="40" y1="25" x2="40" y2="10" stroke="white" strokeWidth="2"/>
          <line x1="50" y1="25" x2="50" y2="10" stroke="white" strokeWidth="2"/>
          <line x1="60" y1="25" x2="60" y2="10" stroke="white" strokeWidth="2"/>
          <line x1="40" y1="75" x2="40" y2="90" stroke="white" strokeWidth="2"/>
          <line x1="50" y1="75" x2="50" y2="90" stroke="white" strokeWidth="2"/>
          <line x1="60" y1="75" x2="60" y2="90" stroke="white" strokeWidth="2"/>
          <circle cx="10" cy="40" r="2" fill="white"/>
          <circle cx="10" cy="50" r="2" fill="white"/>
          <circle cx="10" cy="60" r="2" fill="white"/>
          <circle cx="90" cy="40" r="2" fill="white"/>
          <circle cx="90" cy="50" r="2" fill="white"/>
          <circle cx="90" cy="60" r="2" fill="white"/>
        </svg>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Questions" value={totalQuestions} sub={`${masteredCount} mastered`} color="bg-violet-50 border-violet-200" icon="🧠" />
        <StatCard label="In Progress" value={inProgressCount} sub="currently studying" color="bg-sky-50 border-sky-200" icon="📖" />
        <StatCard label="Companies" value={companies.length} sub={`${activeCompanies} interviewing`} color="bg-amber-50 border-amber-200" icon="🏢" />
        <StatCard label="Checklist" value={`${checklistPercent}%`} sub={`${checklistDone}/${checklistTotal} done`} color="bg-emerald-50 border-emerald-200" icon="✅" />
      </div>

      {/* Featured Lessons */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Study Guides</h2>
          <Link href="/lessons" className="text-sm text-violet-600 hover:text-violet-700 font-medium">
            View all {LESSONS.length} lessons →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {LESSONS.slice(0, 4).map((lesson) => (
            <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="group">
              <div className={`rounded-lg p-4 bg-gradient-to-br ${lesson.gradientFrom} ${lesson.gradientTo} text-white hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                <span className="text-2xl">{lesson.icon}</span>
                <p className="font-medium text-sm mt-2">{lesson.category}</p>
                <p className="text-xs opacity-80">{lesson.sections.length} sections · {lesson.estimatedMinutes}m</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Questions</h2>
            <Link href="/questions" className="text-sm text-violet-600 hover:text-violet-700 font-medium">
              View all →
            </Link>
          </div>
          {recentQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-4xl mb-2">🔧</p>
              <p>No questions yet. Add your first practice question!</p>
              <Link href="/questions" className="inline-block mt-3 text-sm bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition">
                Add Question
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentQuestions.map((q) => (
                <Link key={q.id} href={`/questions/${q.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition group">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate group-hover:text-violet-700 transition">{q.title}</p>
                    <p className="text-sm text-gray-500">{q.category}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[q.difficulty]}`}>{q.difficulty}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[q.status]}`}>{q.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/lessons" className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition font-medium text-sm">
                <span>📚</span> Study Lessons
              </Link>
              <Link href="/questions" className="flex items-center gap-3 p-3 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 transition font-medium text-sm">
                <span>🧠</span> Practice Questions
              </Link>
              <Link href="/career" className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition font-medium text-sm">
                <span>🗺️</span> Career Roadmap
              </Link>
              <Link href="/industry" className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition font-medium text-sm">
                <span>🏭</span> Industry Intel
              </Link>
              <Link href="/companies" className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition font-medium text-sm">
                <span>🏢</span> Research a Company
              </Link>
              <Link href="/checklist" className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition font-medium text-sm">
                <span>✅</span> Review Checklist
              </Link>
            </div>
          </div>

          {Object.keys(categoryBreakdown).length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">By Category</h2>
              <div className="space-y-2">
                {Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{cat}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color, icon }: { label: string; value: string | number; sub: string; color: string; icon: string }) {
  return (
    <div className={`rounded-xl border p-5 ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </div>
  );
}

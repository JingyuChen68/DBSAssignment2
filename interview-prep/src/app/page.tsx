"use client";

import Link from "next/link";
import { useApp, DIFFICULTY_COLORS, STATUS_COLORS } from "@/context/AppContext";

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
      <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to EmbedPrep ⚡</h1>
        <p className="text-violet-100 text-lg">
          Your embedded systems &amp; hardware interview toolkit. Track questions,
          research companies, and stay on top of your prep.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Questions" value={totalQuestions} sub={`${masteredCount} mastered`} color="bg-violet-50 border-violet-200" icon="🧠" />
        <StatCard label="In Progress" value={inProgressCount} sub="currently studying" color="bg-sky-50 border-sky-200" icon="📖" />
        <StatCard label="Companies" value={companies.length} sub={`${activeCompanies} interviewing`} color="bg-amber-50 border-amber-200" icon="🏢" />
        <StatCard label="Checklist" value={`${checklistPercent}%`} sub={`${checklistDone}/${checklistTotal} done`} color="bg-emerald-50 border-emerald-200" icon="✅" />
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
              <Link href="/questions" className="flex items-center gap-3 p-3 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 transition font-medium text-sm">
                <span>🧠</span> Add Practice Question
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

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useApp,
  QUESTION_CATEGORIES,
  DIFFICULTY_COLORS,
  STATUS_COLORS,
} from "@/context/AppContext";

export default function QuestionsPage() {
  const { questions, addQuestion, deleteQuestion } = useApp();

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(QUESTION_CATEGORIES[0]);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [answer, setAnswer] = useState("");
  const [notes, setNotes] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Filter state
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addQuestion({
      title: title.trim(),
      category,
      difficulty,
      answer: answer.trim(),
      notes: notes.trim(),
      status: "Not Started",
    });
    setTitle("");
    setAnswer("");
    setNotes("");
    setShowForm(false);
  };

  const filtered = questions.filter((q) => {
    if (filterCategory !== "All" && q.category !== filterCategory) return false;
    if (filterStatus !== "All" && q.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Practice Questions</h1>
          <p className="text-gray-500 mt-1">
            {questions.length} question{questions.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition font-medium text-sm"
        >
          {showForm ? "Cancel" : "+ Add Question"}
        </button>
      </div>

      {/* Add question form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-900">New Question</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Explain the difference between a mutex and a semaphore"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
              >
                {QUESTION_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <div className="flex gap-2">
                {(["Easy", "Medium", "Hard"] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                      difficulty === d
                        ? DIFFICULTY_COLORS[d] + " ring-2 ring-offset-1 ring-gray-300"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Answer (optional)
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              placeholder="Write your answer here..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Key concepts, tricky parts, resources..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition font-medium text-sm"
          >
            Save Question
          </button>
        </form>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
        >
          <option value="All">All Categories</option>
          {QUESTION_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Mastered">Mastered</option>
        </select>
      </div>

      {/* Questions list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-5xl mb-3">🔍</p>
          <p className="text-lg">
            {questions.length === 0
              ? "No questions yet. Click \"+ Add Question\" to get started!"
              : "No questions match your filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-sm transition group"
            >
              <Link href={`/questions/${q.id}`} className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 group-hover:text-violet-700 transition">
                  {q.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{q.category}</span>
                  <span className="text-gray-300">·</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[q.difficulty]}`}>
                    {q.difficulty}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[q.status]}`}>
                    {q.status}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => deleteQuestion(q.id)}
                className="text-gray-300 hover:text-rose-500 transition ml-3 text-lg"
                title="Delete question"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

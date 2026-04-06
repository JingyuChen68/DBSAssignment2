"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  useApp,
  QUESTION_CATEGORIES,
  DIFFICULTY_COLORS,
  STATUS_COLORS,
} from "@/context/AppContext";

export default function QuestionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { questions, updateQuestion, deleteQuestion } = useApp();

  const question = questions.find((q) => q.id === params.id);
  const [isEditing, setIsEditing] = useState(false);

  // Edit state
  const [editTitle, setEditTitle] = useState(question?.title || "");
  const [editCategory, setEditCategory] = useState(question?.category || "");
  const [editDifficulty, setEditDifficulty] = useState<"Easy" | "Medium" | "Hard">(question?.difficulty || "Medium");
  const [editAnswer, setEditAnswer] = useState(question?.answer || "");
  const [editNotes, setEditNotes] = useState(question?.notes || "");
  const [editStatus, setEditStatus] = useState<"Not Started" | "In Progress" | "Mastered">(question?.status || "Not Started");

  if (!question) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">🤷</p>
        <p className="text-xl text-gray-600 mb-4">Question not found</p>
        <Link
          href="/questions"
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          ← Back to Questions
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    updateQuestion(question.id, {
      title: editTitle,
      category: editCategory,
      difficulty: editDifficulty as "Easy" | "Medium" | "Hard",
      answer: editAnswer,
      notes: editNotes,
      status: editStatus as "Not Started" | "In Progress" | "Mastered",
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteQuestion(question.id);
    router.push("/questions");
  };

  const handleStatusChange = (newStatus: "Not Started" | "In Progress" | "Mastered") => {
    updateQuestion(question.id, { status: newStatus });
    setEditStatus(newStatus);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/questions"
        className="inline-flex items-center text-sm text-gray-500 hover:text-violet-600 transition"
      >
        ← Back to Questions
      </Link>

      {/* Main card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {isEditing ? (
          /* Edit mode */
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                  {QUESTION_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={editDifficulty}
                  onChange={(e) => setEditDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
              <textarea
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition text-sm font-medium">
                Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* View mode */
          <>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{question.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-500">{question.category}</span>
                  <span className="text-gray-300">·</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[question.difficulty]}`}>
                    {question.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(true)} className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition font-medium">
                  Edit
                </button>
                <button onClick={handleDelete} className="text-sm bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition font-medium">
                  Delete
                </button>
              </div>
            </div>

            {/* Status selector */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Status</p>
              <div className="flex gap-2">
                {(["Not Started", "In Progress", "Mastered"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      question.status === s
                        ? STATUS_COLORS[s] + " ring-2 ring-offset-1 ring-gray-300"
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer */}
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-2">Your Answer</h2>
              {question.answer ? (
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-wrap">
                  {question.answer}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No answer written yet. Click Edit to add one.
                </p>
              )}
            </div>

            {/* Notes */}
            {question.notes && (
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">Notes</h2>
                <div className="bg-amber-50 rounded-lg p-4 text-sm text-amber-800 border border-amber-100">
                  {question.notes}
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400">
              Added {new Date(question.createdAt).toLocaleDateString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

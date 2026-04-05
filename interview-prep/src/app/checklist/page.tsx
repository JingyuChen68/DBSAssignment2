"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";

const CHECKLIST_CATEGORIES = ["Technical", "Behavioral", "Research", "Practical"];

export default function ChecklistPage() {
  const { checklist, toggleChecklistItem, addChecklistItem, deleteChecklistItem } = useApp();

  const [newItemText, setNewItemText] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Technical");

  const totalItems = checklist.length;
  const completedItems = checklist.filter((i) => i.completed).length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    addChecklistItem(newItemText.trim(), newItemCategory);
    setNewItemText("");
  };

  const grouped = CHECKLIST_CATEGORIES.reduce<Record<string, typeof checklist>>((acc, cat) => {
    acc[cat] = checklist.filter((i) => i.category === cat);
    return acc;
  }, {});

  const categoryIcons: Record<string, string> = {
    Technical: "⚙️",
    Behavioral: "💬",
    Research: "🔎",
    Practical: "🛠️",
  };

  const categoryColors: Record<string, string> = {
    Technical: "border-violet-200 bg-violet-50",
    Behavioral: "border-pink-200 bg-pink-50",
    Research: "border-sky-200 bg-sky-50",
    Practical: "border-emerald-200 bg-emerald-50",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Prep Checklist</h1>
        <p className="text-gray-500 mt-1">
          Your interview preparation roadmap
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-bold text-gray-900">
            {completedItems}/{totalItems} ({progress}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-violet-500 to-pink-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="text-sm text-emerald-600 font-medium mt-2">
            🎉 You&apos;re fully prepared! Go crush that interview!
          </p>
        )}
      </div>

      {/* Add item form */}
      <form onSubmit={handleAddItem} className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add new checklist item
          </label>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="e.g. Review DMA concepts"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
          />
        </div>
        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
        >
          {CHECKLIST_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition font-medium text-sm whitespace-nowrap"
        >
          + Add
        </button>
      </form>

      {/* Grouped checklist */}
      <div className="space-y-6">
        {CHECKLIST_CATEGORIES.map((cat) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;
          const catDone = items.filter((i) => i.completed).length;
          return (
            <div key={cat} className={`rounded-xl border p-5 ${categoryColors[cat]}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span>{categoryIcons[cat]}</span>
                  {cat}
                </h2>
                <span className="text-xs text-gray-500 font-medium">
                  {catDone}/{items.length}
                </span>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-lg p-3 group"
                  >
                    <button
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition ${
                        item.completed
                          ? "bg-violet-600 border-violet-600 text-white"
                          : "border-gray-300 hover:border-violet-400"
                      }`}
                    >
                      {item.completed && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`flex-1 text-sm transition ${
                        item.completed ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {item.text}
                    </span>
                    <button
                      onClick={() => deleteChecklistItem(item.id)}
                      className="text-gray-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100 text-lg"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

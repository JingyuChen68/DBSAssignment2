"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { LESSONS } from "@/data/lessons";
import { useState } from "react";

export default function LessonDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lesson = LESSONS.find((l) => l.slug === slug);
  const [activeSection, setActiveSection] = useState(0);

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">📚</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson Not Found</h1>
        <p className="text-gray-500 mb-4">This lesson doesn&apos;t exist yet.</p>
        <Link href="/lessons" className="text-violet-600 hover:text-violet-700 font-medium">
          ← Back to Lessons
        </Link>
      </div>
    );
  }

  const currentIdx = LESSONS.findIndex((l) => l.slug === slug);
  const prevLesson = currentIdx > 0 ? LESSONS[currentIdx - 1] : null;
  const nextLesson = currentIdx < LESSONS.length - 1 ? LESSONS[currentIdx + 1] : null;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/lessons" className="hover:text-violet-600 transition">Lessons</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{lesson.title}</span>
      </div>

      {/* Hero */}
      <div className={`bg-gradient-to-br ${lesson.gradientFrom} ${lesson.gradientTo} rounded-2xl p-8 text-white`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{lesson.icon}</span>
          <div>
            <p className="text-sm opacity-80">{lesson.category}</p>
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
          </div>
        </div>
        <p className="opacity-90 max-w-2xl">{lesson.description}</p>
        <div className="flex items-center gap-4 mt-4 text-sm opacity-80">
          <span>{lesson.difficulty}</span>
          <span>·</span>
          <span>{lesson.sections.length} sections</span>
          <span>·</span>
          <span>~{lesson.estimatedMinutes} min</span>
        </div>
      </div>

      {/* Table of contents + content */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar TOC */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-20">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Contents</h3>
            <nav className="space-y-1">
              {lesson.sections.map((section, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSection(i)}
                  className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition ${
                    activeSection === i
                      ? "bg-violet-100 text-violet-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xs text-gray-400 mr-2">{i + 1}.</span>
                  {section.title}
                </button>
              ))}
              <button
                onClick={() => setActiveSection(lesson.sections.length)}
                className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition ${
                  activeSection === lesson.sections.length
                    ? "bg-violet-100 text-violet-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-xs text-gray-400 mr-2">✓</span>
                Key Takeaways
              </button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Progress bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{activeSection + 1} / {lesson.sections.length + 1}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${lesson.gradientFrom} ${lesson.gradientTo} transition-all duration-500`}
                style={{ width: `${((activeSection + 1) / (lesson.sections.length + 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Section content */}
          {activeSection < lesson.sections.length ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {lesson.sections[activeSection].title}
              </h2>

              <div className="prose prose-gray max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {lesson.sections[activeSection].content}
                </p>
              </div>

              {/* Code example */}
              {lesson.sections[activeSection].code && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {lesson.sections[activeSection].codeLanguage || "code"}
                    </span>
                    <span className="text-xs text-gray-400">Example</span>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto text-sm leading-relaxed">
                    <code>{lesson.sections[activeSection].code}</code>
                  </pre>
                </div>
              )}

              {/* Tips */}
              {lesson.sections[activeSection].tips && lesson.sections[activeSection].tips!.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                    <span>💡</span> Interview Tips
                  </h3>
                  <ul className="space-y-2">
                    {lesson.sections[activeSection].tips!.map((tip, i) => (
                      <li key={i} className="text-sm text-amber-900 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">▸</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                  disabled={activeSection === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-violet-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActiveSection(activeSection + 1)}
                  className="px-5 py-2.5 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                >
                  {activeSection === lesson.sections.length - 1 ? "View Takeaways →" : "Next Section →"}
                </button>
              </div>
            </div>
          ) : (
            /* Key Takeaways */
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Key Takeaways</h2>
              <p className="text-gray-500 mb-6">Remember these for your interview:</p>

              <div className="space-y-3 mb-8">
                {lesson.keyTakeaways.map((takeaway, i) => (
                  <div key={i} className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                    <span className="bg-emerald-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-emerald-900">{takeaway}</p>
                  </div>
                ))}
              </div>

              {/* Related questions link */}
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-5">
                <h3 className="font-semibold text-violet-800 mb-2">Ready to practice?</h3>
                <p className="text-sm text-violet-700 mb-3">
                  Test your knowledge with practice questions in this category.
                </p>
                <Link
                  href={`/questions?category=${encodeURIComponent(lesson.category)}`}
                  className="inline-block px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition"
                >
                  Practice {lesson.category} Questions →
                </Link>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setActiveSection(lesson.sections.length - 1)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-violet-700 transition"
                >
                  ← Back to Last Section
                </button>
              </div>
            </div>
          )}

          {/* Prev/Next lesson navigation */}
          <div className="grid grid-cols-2 gap-4">
            {prevLesson ? (
              <Link href={`/lessons/${prevLesson.slug}`} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-violet-300 hover:shadow transition group">
                <p className="text-xs text-gray-400 mb-1">← Previous Lesson</p>
                <p className="font-medium text-gray-900 group-hover:text-violet-700 transition">{prevLesson.icon} {prevLesson.title}</p>
              </Link>
            ) : <div />}
            {nextLesson ? (
              <Link href={`/lessons/${nextLesson.slug}`} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-violet-300 hover:shadow transition group text-right">
                <p className="text-xs text-gray-400 mb-1">Next Lesson →</p>
                <p className="font-medium text-gray-900 group-hover:text-violet-700 transition">{nextLesson.icon} {nextLesson.title}</p>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}

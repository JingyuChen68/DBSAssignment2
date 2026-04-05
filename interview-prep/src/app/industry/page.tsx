"use client";

import { useState, useMemo } from "react";
import { COMPANY_PROFILES, REAL_QUESTIONS as RQ1, INDUSTRY_TOPICS as IT1 } from "@/data/industryIntel";
import { REAL_QUESTIONS_EXTRA as RQ2, INDUSTRY_TOPICS_EXTRA as IT2 } from "@/data/industryIntelExtra";
import { REAL_QUESTIONS_EXTRA2 as RQ3, INDUSTRY_TOPICS_EXTRA2 as IT3 } from "@/data/industryIntelExtra2";

const REAL_QUESTIONS = [...RQ1, ...RQ2, ...RQ3];
const INDUSTRY_TOPICS = [...IT1, ...IT2, ...IT3];

type Tab = "companies" | "questions" | "topics";

const TOPIC_CATEGORIES = [
  "All",
  "Company Tech",
  "Real Problems",
  "Industry Trends",
  "Skills In Demand",
  "Standards & Certs",
  "Engineering Challenges",
  "Product Teardowns",
  "Career Paths",
];

const Q_CATEGORIES = ["All", "Technical", "System Design", "Behavioral", "Coding", "Hardware", "Debug"];

const SECTOR_ICONS: Record<string, string> = {
  "Automotive / EV": "🚗",
  "Consumer Electronics": "🍎",
  Semiconductor: "💾",
  Aerospace: "🚀",
  "Medical Devices": "🏥",
  Agriculture: "🌾",
  Robotics: "🤖",
  "Cloud / IoT": "☁️",
  "Search / AI / Autonomous": "🔍",
  "Industrial Automation": "🏭",
  Navigation: "📍",
};

const DIFF_COLORS: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-rose-100 text-rose-700",
};

const CAT_COLORS: Record<string, string> = {
  "Company Tech": "bg-violet-100 text-violet-700",
  "Real Problems": "bg-rose-100 text-rose-700",
  "Industry Trends": "bg-sky-100 text-sky-700",
  "Skills In Demand": "bg-emerald-100 text-emerald-700",
  "Standards & Certs": "bg-amber-100 text-amber-700",
  "Engineering Challenges": "bg-orange-100 text-orange-700",
  "Product Teardowns": "bg-indigo-100 text-indigo-700",
  "Career Paths": "bg-pink-100 text-pink-700",
};

export default function IndustryPage() {
  const [tab, setTab] = useState<Tab>("companies");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [topicCat, setTopicCat] = useState("All");
  const [qCat, setQCat] = useState("All");
  const [qCompanyFilter, setQCompanyFilter] = useState("All");
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const uniqueQCompanies = useMemo(() => {
    const companies = [...new Set(REAL_QUESTIONS.map((q) => q.company))].sort();
    return ["All", ...companies];
  }, []);

  const filteredQuestions = useMemo(() => {
    return REAL_QUESTIONS.filter((q) => {
      const matchesCat = qCat === "All" || q.category === qCat;
      const matchesCompany = qCompanyFilter === "All" || q.company === qCompanyFilter;
      const matchesSearch =
        !searchQuery ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.context.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesCompany && matchesSearch;
    });
  }, [qCat, qCompanyFilter, searchQuery]);

  const filteredTopics = useMemo(() => {
    return INDUSTRY_TOPICS.filter((t) => {
      const matchesCat = topicCat === "All" || t.category === topicCat;
      const matchesSearch =
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [topicCat, searchQuery]);

  const filteredCompanies = useMemo(() => {
    return COMPANY_PROFILES.filter((c) => {
      return (
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Industry Intel</h1>
          <p className="text-orange-100 text-lg max-w-2xl">
            Real companies, real interview questions, real engineering challenges.
            {" "}{COMPANY_PROFILES.length} companies, {REAL_QUESTIONS.length} interview questions, and {INDUSTRY_TOPICS.length} industry topics.
          </p>
        </div>
        <svg className="absolute right-4 top-4 w-36 h-36 opacity-10" viewBox="0 0 100 100">
          <rect x="10" y="20" width="30" height="25" rx="3" fill="white"/>
          <rect x="50" y="10" width="40" height="35" rx="3" fill="white"/>
          <rect x="15" y="55" width="35" height="30" rx="3" fill="white"/>
          <rect x="60" y="55" width="25" height="30" rx="3" fill="white"/>
          <line x1="40" y1="32" x2="50" y2="27" stroke="white" strokeWidth="1.5"/>
          <line x1="50" y1="45" x2="32" y2="55" stroke="white" strokeWidth="1.5"/>
          <line x1="72" y1="45" x2="72" y2="55" stroke="white" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-2 bg-white rounded-xl border border-gray-200 p-1.5">
        {[
          { key: "companies" as Tab, label: "Companies", icon: "🏢", count: COMPANY_PROFILES.length },
          { key: "questions" as Tab, label: "Real Questions", icon: "❓", count: REAL_QUESTIONS.length },
          { key: "topics" as Tab, label: "Industry Topics", icon: "🌍", count: INDUSTRY_TOPICS.length },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSearchQuery(""); }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === t.key
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              tab === t.key ? "bg-white/20" : "bg-gray-100"
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={
          tab === "companies" ? "Search companies, sectors, tech stacks..." :
          tab === "questions" ? "Search questions, companies..." :
          "Search topics, tags..."
        }
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-300 outline-none bg-white"
      />

      {/* ─── COMPANIES TAB ─── */}
      {tab === "companies" && (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCompanies.map((company) => {
            const isExpanded = expandedCompany === company.name;
            const companyQuestions = REAL_QUESTIONS.filter((q) => q.company === company.name);
            return (
              <div
                key={company.name}
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  isExpanded ? "border-orange-300 shadow-lg md:col-span-2" : "border-gray-200 hover:border-gray-300 hover:shadow"
                }`}
              >
                <button
                  onClick={() => setExpandedCompany(isExpanded ? null : company.name)}
                  className="w-full text-left p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{company.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 text-lg">{company.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{company.sector}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{company.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {company.techStack.slice(0, isExpanded ? undefined : 4).map((tech) => (
                          <span key={tech} className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full">{tech}</span>
                        ))}
                        {!isExpanded && company.techStack.length > 4 && (
                          <span className="text-xs text-gray-400">+{company.techStack.length - 4} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Embedded Teams</p>
                        <div className="space-y-1">
                          {company.embeddedTeams.map((team) => (
                            <div key={team} className="text-sm text-gray-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                              {team}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Interview Style</p>
                        <p className="text-sm text-gray-700">{company.interviewStyle}</p>
                        <p className="text-xs font-semibold text-gray-400 uppercase mt-3 mb-1">Salary Range</p>
                        <p className="text-sm font-medium text-emerald-700">{company.salaryRange}</p>
                        <p className="text-xs font-semibold text-gray-400 uppercase mt-3 mb-1">Locations</p>
                        <p className="text-sm text-gray-700">{company.locations.join(" · ")}</p>
                      </div>
                    </div>

                    {companyQuestions.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                          Sample Interview Questions ({companyQuestions.length})
                        </p>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {companyQuestions.slice(0, 6).map((q) => (
                            <div key={q.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${DIFF_COLORS[q.difficulty]}`}>
                                  {q.difficulty}
                                </span>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{q.question}</p>
                                  <p className="text-xs text-gray-500 mt-1">{q.context}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {companyQuestions.length > 6 && (
                            <button
                              onClick={() => { setTab("questions"); setQCompanyFilter(company.name); }}
                              className="text-sm text-orange-600 font-medium hover:text-orange-700"
                            >
                              View all {companyQuestions.length} questions →
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── QUESTIONS TAB ─── */}
      {tab === "questions" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-48">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Company</label>
              <select
                value={qCompanyFilter}
                onChange={(e) => setQCompanyFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 outline-none"
              >
                {uniqueQCompanies.map((c) => (
                  <option key={c} value={c}>{c === "All" ? "All Companies" : c}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-48">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Category</label>
              <select
                value={qCat}
                onChange={(e) => setQCat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 outline-none"
              >
                {Q_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-500">{filteredQuestions.length} questions found</p>

          <div className="space-y-3">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLORS[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{q.question}</p>
                    <p className="text-sm text-gray-500 mt-1">{q.context}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-medium">{q.company}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{q.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TOPICS TAB ─── */}
      {tab === "topics" && (
        <div className="space-y-4">
          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {TOPIC_CATEGORIES.map((cat) => {
              const count = cat === "All" ? INDUSTRY_TOPICS.length : INDUSTRY_TOPICS.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setTopicCat(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                    topicCat === cat
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <p className="text-sm text-gray-500">{filteredTopics.length} topics found</p>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow transition">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">{topic.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2 ${CAT_COLORS[topic.category] || "bg-gray-100 text-gray-600"}`}>
                    {topic.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{topic.content}</p>
                <div className="flex flex-wrap gap-1.5">
                  {topic.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                {topic.relevantCompanies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-gray-50">
                    {topic.relevantCompanies.map((c) => (
                      <span key={c} className="text-xs text-orange-600 font-medium">{c}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

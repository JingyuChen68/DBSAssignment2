"use client";

import { useState } from "react";
import { useApp, COMPANY_STATUS_COLORS } from "@/context/AppContext";

export default function CompaniesPage() {
  const { companies, addCompany, updateCompany, deleteCompany } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [techStack, setTechStack] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [status, setStatus] = useState<"Researching" | "Applied" | "Interviewing" | "Offer" | "Rejected">("Researching");

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCompany({
      name: name.trim(),
      role: role.trim(),
      notes: notes.trim(),
      techStack: techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      interviewDate,
      status,
    });
    setName("");
    setRole("");
    setNotes("");
    setTechStack("");
    setInterviewDate("");
    setStatus("Researching");
    setShowForm(false);
  };

  const statusOrder = ["Interviewing", "Applied", "Researching", "Offer", "Rejected"];
  const sorted = [...companies].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Research</h1>
          <p className="text-gray-500 mt-1">Track companies and interview details</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition font-medium text-sm"
        >
          {showForm ? "Cancel" : "+ Add Company"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">New Company</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Texas Instruments"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role / Position</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Embedded Software Engineer"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g. ARM Cortex-M, FreeRTOS, C, Python"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date</label>
              <input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="flex flex-wrap gap-2">
              {(["Researching", "Applied", "Interviewing", "Offer", "Rejected"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    status === s
                      ? COMPANY_STATUS_COLORS[s] + " ring-2 ring-offset-1 ring-gray-300"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Research Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Products they make, team info, interview format, culture notes..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          <button type="submit" className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition font-medium text-sm">
            Save Company
          </button>
        </form>
      )}

      {sorted.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-5xl mb-3">🏢</p>
          <p className="text-lg">No companies yet. Start researching your target companies!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{c.name}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${COMPANY_STATUS_COLORS[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  {c.role && <p className="text-sm text-gray-500 mt-0.5">{c.role}</p>}
                </div>
                <div className="flex items-center gap-3 ml-3">
                  {c.interviewDate && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {new Date(c.interviewDate).toLocaleDateString()}
                    </span>
                  )}
                  <span className="text-gray-400 text-lg">{expandedId === c.id ? "▲" : "▼"}</span>
                </div>
              </div>

              {expandedId === c.id && (
                <div className="border-t border-gray-100 p-5 space-y-4">
                  {c.techStack.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {c.techStack.map((tech, i) => (
                          <span key={i} className="text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {c.notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Research Notes</p>
                      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                        {c.notes}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-gray-700">Update Status:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(["Researching", "Applied", "Interviewing", "Offer", "Rejected"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateCompany(c.id, { status: s })}
                          className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                            c.status === s
                              ? COMPANY_STATUS_COLORS[s]
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteCompany(c.id)}
                    className="text-sm text-rose-500 hover:text-rose-600 transition font-medium"
                  >
                    Delete Company
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  category: string;
}

interface Skill {
  name: string;
  level: number; // 0-5
  category: string;
}

const CAREER_PATHS = [
  {
    title: "Firmware Engineer",
    icon: "⚙️",
    color: "violet",
    description: "Write low-level code that runs directly on microcontrollers and embedded processors.",
    stages: ["Intern/Junior", "Firmware Engineer", "Senior Firmware", "Staff/Principal", "Engineering Manager"],
    skills: ["C/C++", "RTOS", "Debugging", "Communication Protocols", "System Architecture"],
    companies: ["Tesla", "Apple", "Qualcomm", "Intel", "Medtronic", "John Deere"],
    salary: "$85K - $200K+",
  },
  {
    title: "Hardware Engineer",
    icon: "🔌",
    color: "emerald",
    description: "Design circuits, PCBs, and electronic systems from concept to production.",
    stages: ["Intern/Junior", "Hardware Engineer", "Senior HW Engineer", "Principal/Architect", "VP Engineering"],
    skills: ["Schematic Design", "PCB Layout", "Signal Integrity", "Power Design", "EMC/EMI"],
    companies: ["Apple", "Google", "SpaceX", "Rivian", "Analog Devices", "Texas Instruments"],
    salary: "$90K - $210K+",
  },
  {
    title: "Robotics Engineer",
    icon: "🤖",
    color: "sky",
    description: "Build autonomous systems combining sensors, actuators, and intelligent software.",
    stages: ["Intern/Junior", "Robotics Engineer", "Senior Robotics", "Tech Lead", "Director of Robotics"],
    skills: ["ROS", "Control Theory", "Sensor Fusion", "Motion Planning", "Computer Vision"],
    companies: ["Boston Dynamics", "Tesla", "Amazon Robotics", "Waymo", "iRobot", "Intuitive Surgical"],
    salary: "$95K - $220K+",
  },
  {
    title: "Automation/Controls Engineer",
    icon: "🏭",
    color: "amber",
    description: "Design and program industrial control systems for manufacturing and process industries.",
    stages: ["Intern/Junior", "Controls Engineer", "Senior Controls", "Lead/Principal", "Controls Manager"],
    skills: ["PLC Programming", "SCADA/HMI", "PID Tuning", "Industrial Networks", "Safety Systems"],
    companies: ["Rockwell", "Siemens", "ABB", "Emerson", "Honeywell", "Schneider Electric"],
    salary: "$75K - $160K+",
  },
];

const DEFAULT_MILESTONES: Milestone[] = [
  { id: "1", title: "Complete core embedded C lessons", description: "Finish all sections in the Embedded C/C++ lesson", targetDate: "2026-05-01", completed: false, category: "Learning" },
  { id: "2", title: "Build a portfolio project", description: "Create a complete embedded project (sensor node, motor controller, etc.) to showcase", targetDate: "2026-06-01", completed: false, category: "Projects" },
  { id: "3", title: "Practice 50 interview questions", description: "Go through at least 50 questions and mark them as Mastered", targetDate: "2026-05-15", completed: false, category: "Practice" },
  { id: "4", title: "Apply to 10 companies", description: "Submit applications to at least 10 target companies", targetDate: "2026-06-15", completed: false, category: "Job Search" },
  { id: "5", title: "Complete 3 mock interviews", description: "Practice with peers or mentors for technical + behavioral", targetDate: "2026-06-01", completed: false, category: "Practice" },
];

const DEFAULT_SKILLS: Skill[] = [
  { name: "C/C++", level: 0, category: "Programming" },
  { name: "Python", level: 0, category: "Programming" },
  { name: "RTOS (FreeRTOS)", level: 0, category: "Systems" },
  { name: "I2C / SPI / UART", level: 0, category: "Protocols" },
  { name: "ARM Cortex-M", level: 0, category: "Hardware" },
  { name: "PCB Design", level: 0, category: "Hardware" },
  { name: "Digital Logic", level: 0, category: "Hardware" },
  { name: "Signal Processing", level: 0, category: "Systems" },
  { name: "PLC / Ladder Logic", level: 0, category: "Automation" },
  { name: "Git & Version Control", level: 0, category: "Tools" },
  { name: "Oscilloscope / LA", level: 0, category: "Tools" },
  { name: "Linux / Shell", level: 0, category: "Tools" },
];

const SKILL_LABELS = ["Not Started", "Beginner", "Familiar", "Comfortable", "Proficient", "Expert"];
const SKILL_COLORS = ["bg-gray-200", "bg-red-300", "bg-orange-300", "bg-yellow-300", "bg-emerald-300", "bg-violet-400"];

export default function CareerPage() {
  const [milestones, setMilestones] = useState<Milestone[]>(DEFAULT_MILESTONES);
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const [selectedPath, setSelectedPath] = useState<number | null>(null);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newCat, setNewCat] = useState("Learning");

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const addMilestone = () => {
    if (!newTitle.trim()) return;
    const m: Milestone = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      targetDate: newDate,
      completed: false,
      category: newCat,
    };
    setMilestones((prev) => [...prev, m]);
    setNewTitle("");
    setNewDesc("");
    setNewDate("");
    setShowAddMilestone(false);
  };

  const updateSkill = (idx: number, level: number) => {
    setSkills((prev) => prev.map((s, i) => (i === idx ? { ...s, level } : s)));
  };

  const completedMilestones = milestones.filter((m) => m.completed).length;
  const avgSkillLevel = skills.reduce((sum, s) => sum + s.level, 0) / skills.length;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Career Roadmap</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Plan your embedded systems career path, track your skills, set milestones,
            and visualize your journey from student to industry expert.
          </p>
        </div>
        {/* Decorative timeline */}
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 h-32 w-48 opacity-15" viewBox="0 0 200 120">
          <line x1="10" y1="60" x2="190" y2="60" stroke="white" strokeWidth="3"/>
          <circle cx="30" cy="60" r="8" fill="white"/>
          <circle cx="80" cy="60" r="8" fill="white"/>
          <circle cx="130" cy="60" r="8" fill="white"/>
          <circle cx="180" cy="60" r="8" fill="white"/>
          <line x1="30" y1="52" x2="30" y2="25" stroke="white" strokeWidth="1.5"/>
          <line x1="80" y1="68" x2="80" y2="95" stroke="white" strokeWidth="1.5"/>
          <line x1="130" y1="52" x2="130" y2="25" stroke="white" strokeWidth="1.5"/>
          <line x1="180" y1="68" x2="180" y2="95" stroke="white" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-violet-600">{completedMilestones}/{milestones.length}</p>
          <p className="text-sm text-gray-600 mt-1">Milestones Complete</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-emerald-600">{avgSkillLevel.toFixed(1)}/5</p>
          <p className="text-sm text-gray-600 mt-1">Avg Skill Level</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-3xl font-bold text-amber-600">{skills.filter((s) => s.level >= 3).length}</p>
          <p className="text-sm text-gray-600 mt-1">Skills Comfortable+</p>
        </div>
      </div>

      {/* Career Paths */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Explore Career Paths</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {CAREER_PATHS.map((path, idx) => (
            <button
              key={path.title}
              onClick={() => setSelectedPath(selectedPath === idx ? null : idx)}
              className={`bg-white rounded-xl border p-5 text-left transition-all duration-300 ${
                selectedPath === idx
                  ? "border-violet-300 shadow-lg ring-2 ring-violet-100"
                  : "border-gray-200 hover:border-gray-300 hover:shadow"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{path.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{path.title}</h3>
                  <p className="text-sm text-gray-500">{path.salary}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{path.description}</p>

              {selectedPath === idx && (
                <div className="space-y-4 mt-4 pt-4 border-t border-gray-100">
                  {/* Career progression */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Career Progression</p>
                    <div className="flex items-center gap-1 flex-wrap">
                      {path.stages.map((stage, i) => (
                        <div key={stage} className="flex items-center gap-1">
                          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full font-medium">
                            {stage}
                          </span>
                          {i < path.stages.length - 1 && <span className="text-gray-300">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key skills */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Key Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill) => (
                        <span key={skill} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Companies */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Top Companies</p>
                    <div className="flex flex-wrap gap-2">
                      {path.companies.map((company) => (
                        <span key={company} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Tracker */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Skills Self-Assessment</h2>
        <p className="text-sm text-gray-500 mb-6">Rate your current proficiency in each area. Be honest — this helps you focus your prep.</p>

        <div className="space-y-4">
          {skills.map((skill, idx) => (
            <div key={skill.name} className="flex items-center gap-4">
              <div className="w-40 flex-shrink-0">
                <p className="text-sm font-medium text-gray-900">{skill.name}</p>
                <p className="text-xs text-gray-400">{skill.category}</p>
              </div>
              <div className="flex-1 flex items-center gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateSkill(idx, level)}
                    className={`h-8 flex-1 rounded-md text-xs font-medium transition-all ${
                      skill.level >= level && level > 0
                        ? `${SKILL_COLORS[level]} text-gray-800`
                        : level === 0 && skill.level === 0
                        ? "bg-gray-200 text-gray-500"
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                    title={SKILL_LABELS[level]}
                  >
                    {level === skill.level ? SKILL_LABELS[level] : ""}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills radar summary */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Programming", "Hardware", "Systems", "Tools"].map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              const avg = catSkills.length > 0 ? catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length : 0;
              const barWidth = (avg / 5) * 100;
              return (
                <div key={cat} className="text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">{cat}</p>
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-1">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{avg.toFixed(1)}/5</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Milestones & Goals</h2>
            <p className="text-sm text-gray-500">Track your progress toward landing that embedded systems role.</p>
          </div>
          <button
            onClick={() => setShowAddMilestone(!showAddMilestone)}
            className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition"
          >
            + Add Milestone
          </button>
        </div>

        {/* Add form */}
        {showAddMilestone && (
          <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Milestone title..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-300 focus:border-violet-300 outline-none"
            />
            <input
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description (optional)..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-300 focus:border-violet-300 outline-none"
            />
            <div className="flex gap-3">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-300 focus:border-violet-300 outline-none"
              />
              <select
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-300 focus:border-violet-300 outline-none"
              >
                <option>Learning</option>
                <option>Projects</option>
                <option>Practice</option>
                <option>Job Search</option>
                <option>Networking</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={addMilestone} className="px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 transition">
                Add
              </button>
              <button onClick={() => setShowAddMilestone(false)} className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-4">
            {milestones.map((m) => {
              const catColors: Record<string, string> = {
                Learning: "bg-violet-500",
                Projects: "bg-emerald-500",
                Practice: "bg-amber-500",
                "Job Search": "bg-sky-500",
                Networking: "bg-pink-500",
              };
              return (
                <div key={m.id} className="relative flex items-start gap-4 pl-12">
                  {/* Dot on timeline */}
                  <div className={`absolute left-4 top-2 w-5 h-5 rounded-full border-2 border-white shadow ${
                    m.completed ? "bg-emerald-500" : catColors[m.category] || "bg-gray-400"
                  }`}>
                    {m.completed && (
                      <svg className="w-3 h-3 text-white m-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  <div
                    className={`flex-1 bg-gray-50 rounded-lg p-4 cursor-pointer transition ${
                      m.completed ? "opacity-60" : ""
                    }`}
                    onClick={() => toggleMilestone(m.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-medium text-gray-900 ${m.completed ? "line-through" : ""}`}>
                          {m.title}
                        </h3>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{m.category}</span>
                      </div>
                      {m.targetDate && (
                        <span className="text-xs text-gray-400">{m.targetDate}</span>
                      )}
                    </div>
                    {m.description && (
                      <p className="text-sm text-gray-500 mt-1">{m.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress summary */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
              style={{ width: `${milestones.length > 0 ? (completedMilestones / milestones.length) * 100 : 0}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {completedMilestones} of {milestones.length} milestones complete ({milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0}%)
          </p>
        </div>
      </div>
    </div>
  );
}

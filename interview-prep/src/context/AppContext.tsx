"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { QUESTION_BANK } from "@/data/questionBank";
import { QUESTION_BANK_EXPANDED } from "@/data/questionBankExpanded";
import { QUESTION_BANK_EXTRA } from "@/data/questionBankExtra";
import { QUESTION_BANK_FINAL } from "@/data/questionBankFinal";

// Types
export interface Question {
  id: string;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  answer: string;
  status: "Not Started" | "In Progress" | "Mastered";
  notes: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  role: string;
  notes: string;
  techStack: string[];
  interviewDate: string;
  status: "Researching" | "Applied" | "Interviewing" | "Offer" | "Rejected";
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

// Categories specific to embedded systems / hardware / automation
export const QUESTION_CATEGORIES = [
  "Embedded C/C++",
  "RTOS & Scheduling",
  "Digital Logic & Circuits",
  "Communication Protocols",
  "Microcontrollers",
  "PCB & Hardware Design",
  "Automation & PLC",
  "Signal Processing",
  "Power Electronics",
  "System Design",
  "Behavioral",
];

export const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-rose-100 text-rose-700",
};

export const STATUS_COLORS: Record<string, string> = {
  "Not Started": "bg-gray-100 text-gray-600",
  "In Progress": "bg-sky-100 text-sky-700",
  Mastered: "bg-emerald-100 text-emerald-700",
};

export const COMPANY_STATUS_COLORS: Record<string, string> = {
  Researching: "bg-purple-100 text-purple-700",
  Applied: "bg-sky-100 text-sky-700",
  Interviewing: "bg-amber-100 text-amber-700",
  Offer: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

// Default checklist for embedded systems interviews
const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: "1", text: "Review C pointer arithmetic and memory management", completed: false, category: "Technical" },
  { id: "2", text: "Practice bit manipulation problems", completed: false, category: "Technical" },
  { id: "3", text: "Study RTOS concepts: semaphores, mutexes, deadlocks", completed: false, category: "Technical" },
  { id: "4", text: "Review I2C, SPI, UART protocols", completed: false, category: "Technical" },
  { id: "5", text: "Brush up on interrupt handling and ISR best practices", completed: false, category: "Technical" },
  { id: "6", text: "Review digital logic: flip-flops, state machines, timing diagrams", completed: false, category: "Technical" },
  { id: "7", text: "Practice reading datasheets and schematics", completed: false, category: "Technical" },
  { id: "8", text: "Prepare STAR-format stories for behavioral questions", completed: false, category: "Behavioral" },
  { id: "9", text: "Research target company's products and tech stack", completed: false, category: "Research" },
  { id: "10", text: "Prepare questions to ask the interviewer", completed: false, category: "Research" },
  { id: "11", text: "Set up and test embedded dev environment", completed: false, category: "Practical" },
  { id: "12", text: "Review a past hardware project to discuss in detail", completed: false, category: "Practical" },
];

interface AppContextType {
  questions: Question[];
  addQuestion: (q: Omit<Question, "id" | "createdAt">) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  companies: Company[];
  addCompany: (c: Omit<Company, "id">) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  addChecklistItem: (text: string, category: string) => void;
  deleteChecklistItem: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([...QUESTION_BANK, ...QUESTION_BANK_EXPANDED, ...QUESTION_BANK_EXTRA, ...QUESTION_BANK_FINAL]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);

  const addQuestion = (q: Omit<Question, "id" | "createdAt">) => {
    const newQ: Question = {
      ...q,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setQuestions((prev) => [newQ, ...prev]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const addCompany = (c: Omit<Company, "id">) => {
    const newC: Company = { ...c, id: Date.now().toString() };
    setCompanies((prev) => [newC, ...prev]);
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCompany = (id: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addChecklistItem = (text: string, category: string) => {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text,
      completed: false,
      category,
    };
    setChecklist((prev) => [...prev, newItem]);
  };

  const deleteChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        companies,
        addCompany,
        updateCompany,
        deleteCompany,
        checklist,
        toggleChecklistItem,
        addChecklistItem,
        deleteChecklistItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

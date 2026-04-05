# EmbedPrep — Embedded Systems Interview Prep Tool

## Project Overview
EmbedPrep is a multi-page Next.js + Tailwind CSS interview preparation tool built specifically for embedded systems, hardware, and automation engineering roles. It stores data in client-side state (React context) — data lives in memory and resets on refresh.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **State:** React Context API (client-side, in-memory)

## Pages / Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Dashboard with stats, recent questions, quick actions |
| `/questions` | `src/app/questions/page.tsx` | Browse & add practice questions with filters |
| `/questions/[id]` | `src/app/questions/[id]/page.tsx` | View/edit a single question (dynamic route) |
| `/companies` | `src/app/companies/page.tsx` | Company research tracker with notes & tech stacks |
| `/checklist` | `src/app/checklist/page.tsx` | Preparation checklist grouped by category |

## Data Model

### Question
- `id`: string (timestamp)
- `title`: string
- `category`: enum (Embedded C/C++, RTOS & Scheduling, Digital Logic & Circuits, Communication Protocols, Microcontrollers, PCB & Hardware Design, Automation & PLC, Signal Processing, Power Electronics, System Design, Behavioral)
- `difficulty`: Easy | Medium | Hard
- `answer`: string
- `status`: Not Started | In Progress | Mastered
- `notes`: string
- `createdAt`: ISO date string

### Company
- `id`: string
- `name`: string
- `role`: string
- `notes`: string
- `techStack`: string[]
- `interviewDate`: string
- `status`: Researching | Applied | Interviewing | Offer | Rejected

### ChecklistItem
- `id`: string
- `text`: string
- `completed`: boolean
- `category`: Technical | Behavioral | Research | Practical

## Style Preferences
- Colorful & friendly aesthetic
- Gradient accents (violet → pink)
- Rounded corners, soft shadows
- Category-specific color coding
- Clean typography with good spacing
- Interactive hover states and transitions

## Key Components
- `Navbar` — Shared navigation across all pages
- `AppProvider` — React context provider for all state
- `StatCard` — Dashboard stat display component

## Notes
- All data is client-side only — refreshing clears everything
- Default checklist items are pre-populated for embedded systems prep
- Categories are tailored to embedded/hardware interview topics

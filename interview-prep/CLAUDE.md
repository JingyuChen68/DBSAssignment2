# EmbedPrep — Embedded Systems Interview Prep Tool

## Project Overview
EmbedPrep is a comprehensive, multi-page Next.js + Tailwind CSS interview preparation tool built specifically for embedded systems, hardware, and automation engineering roles. It features 510+ practice questions, 17 in-depth study guides, 610+ industry intel items, a career roadmap planner, company research tracker, and preparation checklist. Data is stored in client-side state (React context) — data lives in memory and resets on refresh.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **State:** React Context API (client-side, in-memory)

## Pages / Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Dashboard with stats, featured lessons, recent questions, quick actions |
| `/lessons` | `src/app/lessons/page.tsx` | 17 study guides with suggested learning path |
| `/lessons/[slug]` | `src/app/lessons/[slug]/page.tsx` | Individual lesson with sections, code examples, tips, progress tracking |
| `/questions` | `src/app/questions/page.tsx` | Browse & add 510+ practice questions with filters |
| `/questions/[id]` | `src/app/questions/[id]/page.tsx` | View/edit a single question (dynamic route) |
| `/industry` | `src/app/industry/page.tsx` | 610+ items: 20 company profiles, 289 real interview questions, 321 industry topics |
| `/career` | `src/app/career/page.tsx` | Career roadmap with 4 paths, skills self-assessment, milestones timeline |
| `/companies` | `src/app/companies/page.tsx` | Company research tracker with notes & tech stacks |
| `/checklist` | `src/app/checklist/page.tsx` | Preparation checklist grouped by category |

## Data Model

### Question
- `id`, `title`, `category` (11 embedded-specific categories), `difficulty` (Easy/Medium/Hard), `answer`, `status` (Not Started/In Progress/Mastered), `notes`, `createdAt`

### Company
- `id`, `name`, `role`, `notes`, `techStack[]`, `interviewDate`, `status` (Researching/Applied/Interviewing/Offer/Rejected)

### ChecklistItem
- `id`, `text`, `completed`, `category` (Technical/Behavioral/Research/Practical)

### Lesson (data only)
- `slug`, `category`, `title`, `description`, `sections[]` (with content, code, tips), `keyTakeaways[]`, `difficulty`, `estimatedMinutes`

### Industry Intel (data only)
- `CompanyProfile`: name, sector, embeddedTeams[], techStack[], interviewStyle, salaryRange, locations[]
- `RealQuestion`: company, question, category, difficulty, context
- `IndustryTopic`: title, category, content, tags[], relevantCompanies[]

## Data Files
- `src/data/questionBank.ts` — 131 questions (IDs from 1000)
- `src/data/questionBankExpanded.ts` — 210 questions (IDs from 2000)
- `src/data/questionBankExtra.ts` — 101 questions (IDs from 5000)
- `src/data/questionBankFinal.ts` — 68 questions (IDs from 8000)
- `src/data/lessons.ts` — 10 core technical lessons + type definitions
- `src/data/lessonsExpanded.ts` — 7 non-coding lessons (case studies, cheat sheets, career advice)
- `src/data/industryIntel.ts` — 20 company profiles, 89 questions, 121 topics
- `src/data/industryIntelExtra.ts` — 100 questions, 100 topics
- `src/data/industryIntelExtra2.ts` — 100 questions, 100 topics

## Style Preferences
- Colorful & friendly aesthetic with gradient accents (violet → pink primary)
- Per-section gradient themes (each lesson and page has its own color scheme)
- SVG decorative illustrations (circuit patterns, chip diagrams, timelines)
- Rounded corners, soft shadows, interactive hover states and transitions
- Category-specific color coding throughout

## Key Components
- `Navbar` — Shared navigation with 7 items across all pages
- `AppProvider` — React context provider for questions, companies, checklist state
- `StatCard` — Dashboard stat display component

## Notes
- All data is client-side only — refreshing clears user-added data but preserves pre-loaded content
- 510 pre-loaded interview questions across 11 embedded systems categories
- 17 study guide lessons covering technical topics, case studies, cheat sheets, interview strategy, and career advice
- 610+ industry intel items covering 30+ real companies with actual interview questions and industry topics

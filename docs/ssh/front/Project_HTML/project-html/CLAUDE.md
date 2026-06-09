# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

**ROAD A EYE** — AI-powered highway safety monitoring platform. The project is a hybrid full-stack app:
- **Frontend**: Next.js 16 + React 19 + TypeScript (App Router), located at `project-html/`
- **Backend**: Flask (Python), located at the parent directory as `app.py`

## Commands

### Frontend (Next.js)
```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm start        # Run production server
npm run lint     # ESLint
```

### Backend (Flask)
```bash
# Activate virtualenv first (venv/ is in the parent directory)
source ../venv/bin/activate
python ../app.py  # Flask dev server at localhost:5000
```

## Architecture

### Frontend (Next.js App Router)

**Pages** (`app/`):
- `page.tsx` — Landing/hero page
- `login/page.tsx` — Login form (`"use client"`)
- `register/page.tsx` — Registration form (`"use client"`)
- `main/page.tsx` — Main monitoring dashboard (imports all dashboard components)

**Root layout** (`app/layout.tsx`) wraps every page with `<Header>` and `<ChatBot>`.

**Components** (`components/`):
- `Header.tsx` — Global nav with multi-column dropdown menus (`"use client"`)
- `ChatBot.tsx` — Floating AI assistant (`"use client"`)
- `ThemeToggle.tsx` — Switches `data-theme` attribute for dark/light mode
- `dashboard/` — Four widgets used by `main/page.tsx`, exported via barrel `index.ts`:
  - `TopStats.tsx` — 5 summary stat cards (currently hardcoded mock data)
  - `CCTVView.tsx` — CCTV feed placeholder
  - `AlertList.tsx` — Real-time alert list
  - `LogTable.tsx` — Incident log table

**Styling**:
- CSS Modules (`.module.css`) per component + `app/globals.css` with Tailwind utilities
- Theming via CSS custom properties (`--red`, `--bg`, `--text`, etc.) toggled by `data-theme="dark"` on `<html>`

### Backend (Flask — `app.py`)

Session-based auth with five routes: `/` (home), `/login`, `/logout`, `/monitor` (session-protected), `/join`. No real database — sessions only. The Flask backend is currently a lightweight prototype; the Next.js frontend is the primary application.

## Key Notes

- **Next.js 16 has breaking changes** from earlier versions. Always read the relevant docs in `node_modules/next/dist/docs/` before adding features or changing conventions.
- Dashboard components use mock/hardcoded data — future work involves wiring them to real API endpoints and a YOLOv8 detection backend.
- Icons are from `lucide-react`.
- No test suite is currently configured for either frontend or backend.

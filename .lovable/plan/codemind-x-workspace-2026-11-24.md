# CodeMind X workspace

## Goal
Replace the starter screen with a polished, responsive software-intelligence workspace. Keep integrations honest: no fabricated repository data and no claims that GitHub, AI, scans, or agents are connected.

## Build
- Establish a restrained charcoal/navy design system with electric-violet and blue accents, clear contrast, compact controls, and responsive behavior.
- Create a shared, collapsible workspace shell with persistent navigation for all 11 requested areas, a working global page search, repository selector state, and usable profile/help/notification controls.
- Build dedicated pages for Command Center, Repositories, AI Code Chat, Agent Control Center, Dependency Explorer, Security Intelligence, Change Impact, Test Architect, Git Intelligence, Engineering Reports, and Settings. Give each route unique app-specific metadata.
- Give each page a purposeful disconnected/empty state and explain when repository-backed actions are unavailable. Allow local-only input and preferences where useful; do not fabricate or persist scan results.
- Add routing coverage for the requested pages, then verify desktop/mobile navigation and the disconnected first-run experience.

## Technical notes
- Use TanStack file routes and shared React components; keep page-specific content in small focused modules.
- Reuse the existing shadcn controls and Lucide icons; keep all theme values in `src/styles.css` semantic tokens.
- This scope is presentation and navigation only. Do not add Lovable Cloud, GitHub integration, AI calls, scanning, or other backend behavior.
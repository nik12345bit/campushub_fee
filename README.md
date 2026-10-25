# Campus Connect — React + Vite

This is a React/Vite migration of the existing Campus Connect website. It keeps the existing visual design and legacy interactions while each screen is mounted through a React page component.

## Requirements
- Node.js 18+ recommended

## Run locally
```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Pages
- `/` or `/index.html` — Home
- `/events.html` — Events
- `/clubs.html` — Clubs
- `/dashboard.html` — Dashboard
- `/admin.html` — Admin
- `/login.html` — Login
- `/signup.html` — Signup

## Notes
- Existing styling is retained from `src/style.css`. Existing client-side behavior is loaded from `public/legacy/` for compatibility during migration.
- The original server.js is not used by Vite. Deploy the React build using a static host or configure an API server separately.
- This is a first migration pass; future work can replace legacy DOM-based behavior with fully declarative React state and backend APIs.

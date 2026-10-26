# Campus Connect — design-preserving React project

This Vite + React project retains the existing Campus Connect page markup, styles, images, and legacy interaction scripts while adding a React application foundation.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## React features in this project

- React components/JSX; reusable form field, modal, tabs, loading/error and pagination components.
- React Router routes and aliases for the original `.html` URLs, dynamic event/club route parameters, catch-all 404, and protected dashboard/admin route wrappers.
- Context API for UI preferences/toasts, custom hooks for local storage, document title, debounced values, API requests, pagination, and session state.
- Redux Toolkit store for events, clubs, and registrations, including create/update/delete/registration reducers and async event refresh.
- Searchable API request helper with cancellation, loading/error state, and bounded retries.
- Original markup and CSS are retained to protect the current appearance; the original legacy scripts continue to own many existing interactions.

## Optional backend API

Create `.env` with `VITE_API_BASE_URL=http://localhost:3000/api` (use the actual base URL of your API). The app will request `GET {base}/events`. Without this variable, the Redux store uses local persisted sample data. No backend server is bundled with this frontend, so API-backed CRUD requires a compatible server.

## Authentication note

Protected dashboard/admin routes check the existing `campus_frontend_session_v3` session key. This is client-side route gating for the existing prototype, **not secure authorization**; a real production app must enforce permissions on the server.

## Visual preservation

Page markup, original stylesheet, and assets were retained. New routing/state infrastructure is layered around the existing pages rather than replacing their design. Compare each page visually and test legacy forms/interactions after local install, because those still use legacy scripts in this migration stage.


### Club registration windows
Admins can set each club's registration start and end date/time in Admin Dashboard → Club management → Create/Edit club. Blank start means joining can begin immediately; blank end means there is no automatic closing date. Club joining is blocked before the start and after the end time. Existing clubs without dates remain open unless an admin closes them.

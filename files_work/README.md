# Campus — Multi-page HTML version

This version uses separate HTML files instead of keeping every screen inside one `index.html`.

## Files
- `login.html` — login
- `signup.html` — signup
- `index.html` — home
- `events.html` — events
- `clubs.html` — clubs
- `dashboard.html` — personal dashboard
- `admin.html` — event CRUD
- `style.css` — shared design
- `app.js` — shared DOM/localStorage logic

## Run
No Node.js is required. For reliable localStorage across all separate pages, open the folder using **VS Code Live Server** and begin at `login.html`.

Demo student login: `student@campus.edu` / `campus123`
Demo admin login: `admin@campus.edu` / `admin123`

## Roles
- **Students** can browse events/clubs, register/join, cancel/leave, and see their own notifications.
- **Admins** (role `admin`) get an extra "Admin" nav link, can create/edit/delete events, view every registered student and what they've registered for or joined, edit a student's name/email, remove a student's registration or membership on their behalf, and send notifications to one student or broadcast to all. Non-admins are redirected away from `admin.html` if they try the URL directly.

## Notifications
Registering for an event, joining a club, cancelling, leaving, or being edited by an admin all generate a real notification stored per-user in `localStorage`. Clicking a notification with a linked event/club opens its full details.

## OTP (demo mode)
The event registration form gates the enrollment-number field behind an email OTP step. Since this project has no backend/mail server, the OTP is generated in the browser and shown on-screen (clearly labeled as demo mode) instead of being emailed — the verification logic itself (generate, enter, check) works exactly as a real OTP flow would.

## Data
Accounts, session, registrations, joined clubs and admin event changes are stored with the browser Web Storage API (`localStorage`).

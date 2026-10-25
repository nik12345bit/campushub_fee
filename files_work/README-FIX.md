CAMPUS CONNECT — ORIGINAL DESIGN NAVIGATION FIX

This folder preserves the original HTML/CSS/JS files from the uploaded copy of dumbo(1).zip. It intentionally does NOT include campus-enhancements.js, because that script was injected into the enhanced ZIP and may override original behavior/design.

RUN:
1. Extract this ZIP to a new folder.
2. Open this exact folder in VS Code (the folder containing index.html and server.js).
3. In the VS Code terminal, stop any old server with Ctrl+C.
4. Run: npm install
5. Run: npm run dev
6. Open http://localhost:3000/clubs.html

IMPORTANT:
- Do not run a server from the outer ZIP folder or from another copy of the project.
- This package fixes static page routing and restores the original pages/scripts. It does not add backend persistence or real email OTP; those require a separate integration after the existing navigation is confirmed.

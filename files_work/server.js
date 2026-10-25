'use strict';
const express = require('express');
const path = require('path');
const app = express();
const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
// Serve the original static files from this exact project directory.
app.use(express.static(ROOT, { index: false, extensions: ['html'] }));

// Explicit page routes prevent unknown URLs from silently showing index.html.
const pages = ['index.html', 'clubs.html', 'events.html', 'dashboard.html', 'admin.html', 'login.html', 'signup.html'];
for (const page of pages) {
  app.get('/' + page, (req, res) => res.sendFile(path.join(ROOT, page)));
}
app.get('/', (req, res) => res.sendFile(path.join(ROOT, 'index.html')));

// Return JSON for missing API routes; never return an HTML page to an API caller.
app.use('/api', (req, res) => res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` }));
app.use((req, res) => {
  if (req.path.endsWith('.html')) return res.status(404).send('Page not found: ' + req.path);
  res.status(404).send('Not found');
});
app.listen(PORT, () => console.log(`Campus Connect (original design) running at http://localhost:${PORT}`));

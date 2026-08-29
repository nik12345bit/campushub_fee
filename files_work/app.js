"use strict";

/* Campus multi-page frontend
   - Separate HTML pages
   - DOM manipulation in one shared JS file
   - localStorage Web Storage API for saved data
   - Leaflet + OpenStreetMap only on events.html
*/
const STORAGE_KEY = "campus_frontend_db_v3";
const SESSION_KEY = "campus_frontend_session_v3";
const DEMO_USER = {
  id: 1,
  name: "Campus Student",
  email: "student@campus.edu",
  password: "campus123",
  role: "student",
};
const DEMO_ADMIN = {
  id: 2,
  name: "Campus Admin",
  email: "admin@campus.edu",
  password: "admin123",
  role: "admin",
};
const CAMPUS_CENTER = [30.516459, 76.65921];
const SEED_EVENTS = [
  {
    id: 1,
    title: "TechFest Hackathon 2026",
    category: "Technical",
    date: "20 Aug 2026",
    time: "10:00 AM – 6:00 PM (24 hrs)",
    venue: "Innovation Lab, Block A",
    organizer: "Coding Club",
    capacity: 120,
    registered: 87,
    description:
      "A 24-hour coding competition where student teams design and build working prototypes for real campus problems, judged by faculty and industry mentors.",
    requirements: [
      "Team of 2–4 members",
      "Valid college ID required",
      "Own laptop required",
      "Basic knowledge of any programming language",
    ],
    lat: 30.51665,
    lng: 76.65865,
  },
  {
    id: 2,
    title: "Rhythm Nights: Cultural Fest",
    category: "Cultural",
    date: "25 Aug 2026",
    time: "5:00 PM – 10:00 PM",
    venue: "Open Air Amphitheatre",
    organizer: "Cultural Committee",
    capacity: 500,
    registered: 412,
    description:
      "The college's flagship evening of dance, drama and music, featuring performances from every department and a headline student band showcase.",
    requirements: [
      "Open to all students",
      "Performer entries close 3 days prior",
      "Audience entry free with college ID",
    ],
    lat: 30.51605,
    lng: 76.65995,
  },
  {
    id: 3,
    title: "Campus Football Cup",
    category: "Sports",
    date: "02 Sep 2026",
    time: "8:00 AM – 4:00 PM",
    venue: "Main Sports Ground",
    organizer: "Sports Club",
    capacity: 200,
    registered: 150,
    description:
      "Inter-department knockout football tournament running through the day, ending with a final under floodlights.",
    requirements: [
      "Team of 11 + 4 substitutes",
      "Department ID required",
      "Sports kit mandatory",
    ],
    lat: 30.5173,
    lng: 76.6601,
  },
  {
    id: 4,
    title: "AI & ML Workshop",
    category: "Workshop",
    date: "22 Aug 2026",
    time: "2:00 PM – 5:00 PM",
    venue: "Seminar Hall 2",
    organizer: "AI Club",
    capacity: 80,
    registered: 63,
    description:
      "A hands-on session covering the fundamentals of machine learning, ending with participants training a small model of their own.",
    requirements: [
      "Laptop with Python installed",
      "No prior ML experience needed",
    ],
    lat: 30.51585,
    lng: 76.6589,
  },
  {
    id: 5,
    title: "Canvas & Chaos: Art Competition",
    category: "Art",
    date: "28 Aug 2026",
    time: "11:00 AM – 3:00 PM",
    venue: "Art Studio",
    organizer: "Fine Arts Society",
    capacity: 60,
    registered: 22,
    description:
      "An open-theme on-the-spot painting competition. Materials provided; bring your own brushes if you have a preference.",
    requirements: ["Individual entries only", "Theme announced on the day"],
    lat: 30.5162,
    lng: 76.65795,
  },
  {
    id: 6,
    title: "Open Mic & Music Night",
    category: "Music",
    date: "30 Aug 2026",
    time: "7:00 PM – 9:30 PM",
    venue: "Amphitheatre",
    organizer: "Music Club",
    capacity: 150,
    registered: 140,
    description:
      "An evening for singers, instrumentalists and poets to take the stage. Sign up for a 5-minute slot or just come to listen.",
    requirements: ["5-minute slot per performer", "Backing tracks accepted"],
    lat: 30.516,
    lng: 76.65995,
  },
  {
    id: 7,
    title: "Design Thinking Seminar",
    category: "Seminar",
    date: "05 Sep 2026",
    time: "10:00 AM – 12:00 PM",
    venue: "Conference Room",
    organizer: "Entrepreneurship Cell",
    capacity: 100,
    registered: 40,
    description:
      "A guest-led session on applying design thinking to early-stage startup ideas, with a live case study from a campus-founded venture.",
    requirements: ["Open to all years", "Notebook recommended"],
    lat: 30.51565,
    lng: 76.6594,
  },
  {
    id: 8,
    title: "Code Wars: Competitive Programming",
    category: "Technical",
    date: "08 Sep 2026",
    time: "9:00 AM – 1:00 PM",
    venue: "Computer Lab 3",
    organizer: "Coding Club",
    capacity: 100,
    registered: 76,
    description:
      "A timed individual contest across three difficulty tiers, with prizes for the top scorer in each year group.",
    requirements: ["Individual entry", "Laptop provided in the lab"],
    lat: 30.5168,
    lng: 76.65895,
  },
];
const SEED_CLUBS = [
  {
    id: 1,
    name: "Coding Club",
    short: "CC",
    color: "#423E85",
    type: "Technical",
    tagline: "Build. Compete. Ship.",
    president: "Aditi Sharma",
    vicePresident: "Arjun Malhotra",
    facultyMentor: "Dr. Neha Kapoor",
    contactEmail: "codingclub@campus.edu",
    members: 245,
    memberLimit: 300,
    founded: "2022",
    meetingSchedule: "Friday · 4:30 PM",
    meetingVenue: "Innovation Lab, Block A",
    eligibility: "Open to students from every department and year.",
    about:
      "A community for students interested in programming, development and competitive coding — running weekly practice sessions and two flagship events a year.",
    assignedWork: "Competitive coding practice, project teams, peer mentoring and hackathon preparation.",
    activities: ["Weekly coding practice", "Project building circles", "Hackathon mentoring", "Competitive programming contests"],
    joinRequirements: ["Interest in coding or technology", "Valid college ID", "Participate in at least one club activity each month"],
    events: ["TechFest Hackathon 2026", "Code Wars: Competitive Programming"],
    joinOpen: true,
  },
  {
    id: 2,
    name: "Cultural Committee",
    short: "CU",
    color: "#B85400",
    type: "Cultural",
    tagline: "Create the moments campus remembers.",
    president: "Rohan Verma",
    vicePresident: "Simran Kaur",
    facultyMentor: "Prof. Kavita Bansal",
    contactEmail: "culture@campus.edu",
    members: 180,
    memberLimit: 240,
    founded: "2020",
    meetingSchedule: "Wednesday · 4:15 PM",
    meetingVenue: "Student Activity Centre",
    eligibility: "Open to students interested in dance, drama, music, hosting, design or event operations.",
    about:
      "Plans and runs the college's dance, drama and music events, from department-level showcases to the annual cultural fest.",
    assignedWork: "Fest planning, stage coordination, auditions, hosting, decor and backstage operations.",
    activities: ["Dance and drama auditions", "Fest planning", "Stage and backstage management", "Creative production"],
    joinRequirements: ["Valid college ID", "Attend team briefings before assigned events", "Respect rehearsal and production schedules"],
    events: ["Rhythm Nights: Cultural Fest"],
    joinOpen: true,
  },
  {
    id: 3,
    name: "Sports Club",
    short: "SP",
    color: "#167A55",
    type: "Sports",
    tagline: "Train together. Play for campus.",
    president: "Meera Iyer",
    vicePresident: "Harshit Rana",
    facultyMentor: "Mr. Aman Gill",
    contactEmail: "sports@campus.edu",
    members: 310,
    memberLimit: 400,
    founded: "2019",
    meetingSchedule: "Tuesday & Thursday · 4:30 PM",
    meetingVenue: "Main Sports Ground",
    eligibility: "Open to all students; competitive teams may require trials.",
    about:
      "Organises inter-department tournaments across football, cricket, basketball and athletics throughout the year.",
    assignedWork: "Team trials, practice sessions, fixtures, tournament operations and sports volunteering.",
    activities: ["Team trials", "Weekly practice", "Inter-department tournaments", "Sports volunteering"],
    joinRequirements: ["Valid college ID", "Sports shoes/kit for practice", "Trials required for competitive squads"],
    events: ["Campus Football Cup"],
    joinOpen: true,
  },
  {
    id: 4,
    name: "AI Club",
    short: "AI",
    color: "#2A6C9E",
    type: "Academic",
    tagline: "Learn AI by building it.",
    president: "Karan Mehta",
    vicePresident: "Ananya Sood",
    facultyMentor: "Dr. Ritu Sharma",
    contactEmail: "aiclub@campus.edu",
    members: 150,
    memberLimit: 220,
    founded: "2023",
    meetingSchedule: "Monday · 4:30 PM",
    meetingVenue: "AI Lab, Block B",
    eligibility: "Beginners are welcome; curiosity about AI, data or machine learning is enough.",
    about:
      "Focused on applied machine learning — reading groups, workshops and a student research showcase each semester.",
    assignedWork: "ML study groups, mini-projects, paper discussions and workshop support.",
    activities: ["ML reading group", "Hands-on model building", "Research discussions", "Peer workshops"],
    joinRequirements: ["Valid college ID", "Bring a laptop for hands-on sessions when requested", "No prior ML experience required"],
    events: ["AI & ML Workshop"],
    joinOpen: true,
  },
  {
    id: 5,
    name: "Fine Arts Society",
    short: "FA",
    color: "#8A3A78",
    type: "Arts",
    tagline: "Make campus your canvas.",
    president: "Priya Nair",
    vicePresident: "Ishita Arora",
    facultyMentor: "Ms. Shalini Rao",
    contactEmail: "finearts@campus.edu",
    members: 95,
    memberLimit: 160,
    founded: "2021",
    meetingSchedule: "Thursday · 4:15 PM",
    meetingVenue: "Art Studio",
    eligibility: "Open to beginners and experienced artists across all visual-art styles.",
    about:
      "A space for painters, sketch artists and sculptors to exhibit work and run on-campus competitions.",
    assignedWork: "Art jams, exhibitions, campus installations, competition planning and creative workshops.",
    activities: ["Open art jams", "Exhibitions", "Campus installations", "Technique workshops"],
    joinRequirements: ["Valid college ID", "Bring personal tools for specialised techniques", "Portfolio not required"],
    events: ["Canvas & Chaos: Art Competition"],
    joinOpen: true,
  },
  {
    id: 6,
    name: "Music Club",
    short: "MU",
    color: "#C23D2C",
    type: "Cultural",
    tagline: "Find your sound. Share the stage.",
    president: "Yash Kapoor",
    vicePresident: "Rhea Khanna",
    facultyMentor: "Mr. Sameer Sethi",
    contactEmail: "music@campus.edu",
    members: 120,
    memberLimit: 180,
    founded: "2020",
    meetingSchedule: "Saturday · 11:00 AM",
    meetingVenue: "Music Room, Student Centre",
    eligibility: "Singers, instrumentalists, producers and students who want to help with music events are welcome.",
    about:
      "Runs jam sessions, the open mic series and represents the college at inter-college music festivals.",
    assignedWork: "Jam sessions, auditions, live-event sets, open mics and inter-college music preparation.",
    activities: ["Jam sessions", "Open mic practice", "Band auditions", "Live performance production"],
    joinRequirements: ["Valid college ID", "Audition only for performance teams", "General membership is open without audition"],
    events: ["Open Mic & Music Night"],
    joinOpen: true,
  },
];
const PAGE = document.body.dataset.page || "home";
const PAGE_URLS = {
  home: "index.html",
  events: "events.html",
  clubs: "clubs.html",
  dashboard: "dashboard.html",
  admin: "admin.html",
};
let db,
  currentUser = null,
  eventsCache = [],
  registrations = new Set(),
  joinedClubs = new Set(),
  activeCategory = "All",
  campusMap = null,
  mapLayer = null,
  mapMarkers = {};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );

function parseCampusDate(value, endOfDay = false) {
  if (!value) return null;
  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;
  const m = String(value).match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (!m) return null;
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  return new Date(
    Number(m[3]),
    months[m[2]],
    Number(m[1]),
    endOfDay ? 23 : 0,
    endOfDay ? 59 : 0,
    endOfDay ? 59 : 0,
  );
}
function defaultDeadline(event) {
  const d = parseCampusDate(event.date, true);
  if (!d) return "";
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 16);
}
function registrationClosed(event) {
  const d = parseCampusDate(event.registrationDeadline || event.date, true);
  return d ? Date.now() > d.getTime() : false;
}
function deadlineText(event) {
  const d = parseCampusDate(event.registrationDeadline || event.date, true);
  return d
    ? d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not set";
}
function realRegistrationCount(eventId, source = db) {
  return Object.values(source?.registrations || {}).filter((ids) =>
    (ids || []).some((id) => Number(id) === Number(eventId)),
  ).length;
}

function icon(name, size = 18) {
  const i = {
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>',
    users:
      '<circle cx="9" cy="8" r="3.3"/><path d="M2.5 20c0-3.6 2.9-6.2 6.5-6.2S15.5 16.4 15.5 20"/>',
    close: '<path d="M18 6L6 18M6 6l12 12"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
    trash:
      '<path d="M3 6h18"/><path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6"/><path d="M19 6l-1 14.5A1.5 1.5 0 0 1 16.5 22h-9A1.5 1.5 0 0 1 6 20.5L5 6"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i[name] || ""}</svg>`;
}

/* ---------- Web Storage ---------- */
function freshDb() {
  const events = structuredClone(SEED_EVENTS).map((e) => ({
    ...e,
    registered: 0,
    registrationDeadline: defaultDeadline(e),
  }));
  return {
    users: [{ ...DEMO_USER }, { ...DEMO_ADMIN }],
    events,
    clubs: structuredClone(SEED_CLUBS),
    registrations: { [DEMO_USER.email]: [] },
    registrationDetails: { [DEMO_USER.email]: {} },
    memberships: { [DEMO_USER.email]: [] },
    notifications: {},
  };
}
function normalizeDb(x) {
  x.users ||= [{ ...DEMO_USER }];
  x.events ||= structuredClone(SEED_EVENTS);
  x.clubs ||= structuredClone(SEED_CLUBS);
  x.registrations ||= {};
  x.registrationDetails ||= {};
  x.memberships ||= {};
  x.notifications ||= {};
  if (
    (x.registrations[DEMO_USER.email] || []).length === 1 &&
    Number(x.registrations[DEMO_USER.email][0]) === 1 &&
    !Object.keys(x.registrationDetails[DEMO_USER.email] || {}).length
  )
    x.registrations[DEMO_USER.email] = [];
  x.users.forEach((u) => {
    u.role ||= "student";
  });
  if (!x.users.some((u) => u.email === DEMO_USER.email))
    x.users.unshift({ ...DEMO_USER });
  if (!x.users.some((u) => u.email === DEMO_ADMIN.email))
    x.users.push({ ...DEMO_ADMIN });
  x.events.forEach((e) => {
    e.registrationDeadline ||= defaultDeadline(e);
    e.registered = realRegistrationCount(e.id, x);
  });
  x.clubs.forEach((c) => {
    const seed = SEED_CLUBS.find((item) => Number(item.id) === Number(c.id));
    c.type ||= seed?.type || "Student club";
    c.short ||= seed?.short || String(c.name || "CL")
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    c.color ||= seed?.color || "#423E85";
    c.tagline ||= seed?.tagline || "Meet people, learn together and contribute to campus life.";
    c.vicePresident ||= seed?.vicePresident || "Not assigned";
    c.facultyMentor ||= seed?.facultyMentor || "To be announced";
    c.contactEmail ||= seed?.contactEmail || "clubs@campus.edu";
    c.meetingSchedule ||= seed?.meetingSchedule || "Schedule announced by the club";
    c.meetingVenue ||= seed?.meetingVenue || "Student Activity Centre";
    c.eligibility ||= seed?.eligibility || "Open to all enrolled students.";
    c.founded ||= seed?.founded || "2024";
    if (c.memberLimit === undefined || c.memberLimit === null)
      c.memberLimit = seed?.memberLimit || 0;
    c.memberLimit = Math.max(0, Number(c.memberLimit) || 0);
    c.assignedWork ||= seed?.assignedWork || "Organise activities and upcoming events.";
    if (!Array.isArray(c.activities))
      c.activities = String(c.activities || "")
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    if (!c.activities.length)
      c.activities = structuredClone(seed?.activities || [c.assignedWork]);
    if (!Array.isArray(c.joinRequirements))
      c.joinRequirements = String(c.joinRequirements || "")
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    if (!c.joinRequirements.length)
      c.joinRequirements = structuredClone(
        seed?.joinRequirements || ["Valid college ID", "Follow the club code of conduct"],
      );
    if (!Array.isArray(c.events))
      c.events = String(c.events || "")
        .split(/\n/)
        .map((item) => item.trim())
        .filter(Boolean);
    if (!c.events.length && seed?.events) c.events = structuredClone(seed.events);
    if (c.joinOpen === undefined) c.joinOpen = seed?.joinOpen !== false;
  });
  return x;
}
function loadDb() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (s) {
      const x = normalizeDb(s);
      x.clubs.forEach((c) => {
        if (c.joinOpen === undefined) c.joinOpen = true;
      });
      return x;
    }
  } catch {}
  const x = freshDb();
  x.clubs.forEach((c) => (c.joinOpen = true));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(x));
  return x;
}
function saveDb() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}
function saveSession(email = "") {
  email
    ? localStorage.setItem(SESSION_KEY, email)
    : localStorage.removeItem(SESSION_KEY);
}
function sessionEmail() {
  return localStorage.getItem(SESSION_KEY) || "";
}
function userData(key) {
  return db[key]?.[currentUser.email] || [];
}
function isAdmin() {
  return currentUser?.role === "admin";
}

/* ---------- Notifications ---------- */
function addNotification(
  email,
  { title, message, refType = null, refId = null },
) {
  db.notifications[email] ||= [];
  db.notifications[email].unshift({
    id: Date.now() + Math.random(),
    title,
    message,
    refType,
    refId,
    read: false,
    time: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
  saveDb();
}
function myNotifications() {
  return db.notifications?.[currentUser?.email] || [];
}
function unreadCount() {
  return myNotifications().filter((n) => !n.read).length;
}
function updateNotifBadge() {
  const dot = $(".dot-badge");
  if (dot) dot.classList.toggle("hidden", unreadCount() === 0);
}

/* ---------- Authentication ---------- */
function authError(message = "") {
  const box = $("#auth-error");
  if (!box) return;
  box.textContent = message;
  box.classList.toggle("hidden", !message);
}
function loginUser(user) {
  saveSession(user.email);
  location.href = "index.html";
}
function initAuthPage() {
  db = loadDb();
  const existing = db.users.find((u) => u.email === sessionEmail());
  if (existing) {
    location.href = "index.html";
    return;
  }
  const registerForm = $("#register-form");
  if (registerForm && !registerForm.elements.rollNo) {
    const passwordField = registerForm.elements.password.closest(".field");
    passwordField.insertAdjacentHTML(
      "beforebegin",
      `<div class="field"><label>Roll number</label><input name="rollNo" placeholder="e.g. 2410990001" minlength="6" maxlength="20" pattern="[A-Za-z0-9-]+" required></div><div class="field"><label>Branch</label><select name="branch" required><option value="">Select branch</option><option>CSE</option><option>CSE (AI & ML)</option><option>CSE (Cyber Security)</option><option>ECE</option><option>Mechanical</option><option>Civil</option><option>BCA</option><option>MCA</option></select></div><div class="field"><label>Year</label><select name="year" required><option value="">Select year</option><option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option></select></div><div class="field"><label>Semester</label><select name="semester" required><option value="">Select semester</option>${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<option value="${n}">Semester ${n}</option>`).join("")}</select></div>`,
    );
    registerForm.elements.password.minLength = 8;
    registerForm.elements.password.placeholder =
      "8+ chars with a letter and number";
  }
  $$(".show-password-check").forEach((box) =>
    box.addEventListener("change", () =>
      $$(
        'input[name="password"],input[name="confirmPassword"]',
        box.closest("form"),
      ).forEach((i) => (i.type = box.checked ? "text" : "password")),
    ),
  );
  $("#demo-login")?.addEventListener("click", () => {
    const f = $("#login-form");
    f.email.value = DEMO_USER.email;
    f.password.value = DEMO_USER.password;
  });
  $("#demo-admin-login")?.addEventListener("click", () => {
    const f = $("#login-form");
    f.email.value = DEMO_ADMIN.email;
    f.password.value = DEMO_ADMIN.password;
  });
  $("#login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget,
      email = f.email.value.trim().toLowerCase(),
      password = f.password.value;
    const u = db.users.find(
      (x) => x.email === email && x.password === password,
    );
    if (!u) return authError("Incorrect email or password.");
    loginUser(u);
  });
  $("#register-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget,
      name = f.name.value.trim(),
      email = f.email.value.trim().toLowerCase(),
      password = f.password.value,
      rollNo = f.rollNo.value.trim().toUpperCase(),
      year = Number(f.year.value),
      semester = Number(f.semester.value),
      branch = f.branch.value;
    if (name.length < 2) return authError("Enter a valid full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return authError("Enter a valid college email address.");
    if (!/^[A-Z0-9-]{6,20}$/.test(rollNo))
      return authError("Enter a valid roll number.");
    if (db.users.some((u) => u.rollNo === rollNo))
      return authError("An account with this roll number already exists.");
    if (semester !== year * 2 - 1 && semester !== year * 2)
      return authError(
        `Year ${year} can only use semester ${year * 2 - 1} or ${year * 2}.`,
      );
    if (
      password.length < 8 ||
      !/[A-Za-z]/.test(password) ||
      !/\d/.test(password)
    )
      return authError(
        "Password must have at least 8 characters, including a letter and number.",
      );
    if (password !== f.confirmPassword.value)
      return authError("Passwords do not match.");
    if (db.users.some((u) => u.email === email))
      return authError("An account with this email already exists.");
    const u = {
      id: Date.now(),
      name,
      email,
      password,
      rollNo,
      year,
      semester,
      branch,
      role: "student",
    };
    db.users.push(u);
    db.registrations[email] = [];
    db.registrationDetails[email] = {};
    db.memberships[email] = [];
    db.notifications[email] = [];
    saveDb();
    loginUser(u);
  });
}
function requireLogin() {
  db = loadDb();
  currentUser = db.users.find((u) => u.email === sessionEmail()) || null;
  if (!currentUser) {
    location.href = "login.html";
    return false;
  }
  eventsCache = db.events;
  registrations = new Set(userData("registrations"));
  joinedClubs = new Set(userData("memberships"));
  $$(".user-first-name").forEach(
    (x) => (x.textContent = currentUser.name.split(" ")[0] || "Student"),
  );
  $$("[data-admin-only]").forEach((el) =>
    el.classList.toggle("hidden", !isAdmin()),
  );
  if (PAGE === "admin" && !isAdmin()) {
    location.href = "index.html";
    return false;
  }
  updateNotifBadge();
  return true;
}
function logout() {
  saveSession("");
  location.href = "login.html";
}

/* ---------- Cross-page links and actions ---------- */
document.addEventListener("click", (e) => {
  const view = e.target.closest("[data-view]");
  if (view) {
    e.preventDefault();
    location.href = PAGE_URLS[view.dataset.view] || "index.html";
    return;
  }
  if (e.target.closest('[data-action="logout"]')) {
    logout();
    return;
  }
  if (e.target.closest('[data-action="notifications"]')) {
    openNotifications();
    return;
  }
  const ev = e.target.closest('[data-action="open-event"]');
  if (ev) {
    if ($(".events-map-panel.map-expanded")) closeExpandedMap();
    openEvent(Number(ev.dataset.id));
    return;
  }
  const eventCardLink = e.target.closest(".event-card");
  if (eventCardLink && !e.target.closest("button,a,input,select")) {
    openEvent(Number(eventCardLink.dataset.id));
    return;
  }
  const viewMap = e.target.closest('[data-action="view-on-map"]');
  if (viewMap) {
    closeModal();
    focusEventOnMap(Number(viewMap.dataset.id));
    return;
  }
  if (e.target.closest('[data-action="close-map"]')) {
    closeExpandedMap();
    return;
  }
  const venueClick = e.target.closest(".event-venue");
  if (venueClick) {
    const card = venueClick.closest(".event-card");
    if (card?.dataset.id) {
      focusEventOnMap(Number(card.dataset.id));
      return;
    }
  }
  const club = e.target.closest('[data-action="open-club"]');
  if (club) {
    openClub(Number(club.dataset.id));
    return;
  }
  const clubCardLink = e.target.closest(".club-card");
  if (clubCardLink && !e.target.closest("button,a,input,select,textarea")) {
    openClub(Number(clubCardLink.dataset.id));
    return;
  }
  const edit = e.target.closest('[data-action="edit-event"]');
  if (edit) {
    openEditor(Number(edit.dataset.id));
    return;
  }
  const del = e.target.closest('[data-action="delete-event"]');
  if (del) {
    deleteEvent(Number(del.dataset.id));
    return;
  }
  if (e.target.closest('[data-action="create-event"]')) {
    openEditor();
    return;
  }
  if (e.target.closest('[data-action="create-club"]')) {
    openClubEditor();
    return;
  }
  const editClub = e.target.closest('[data-action="edit-club"]');
  if (editClub) {
    openClubEditor(Number(editClub.dataset.id));
    return;
  }
  const delClub = e.target.closest('[data-action="delete-club"]');
  if (delClub) {
    deleteClub(Number(delClub.dataset.id));
    return;
  }
  const cat = e.target.closest("[data-category-link]");
  if (cat) {
    e.preventDefault();
    location.href = `events.html?category=${encodeURIComponent(cat.dataset.categoryLink)}`;
  }
  const notif = e.target.closest('[data-action="open-notification"]');
  if (notif) {
    closeModal();
    const rt = notif.dataset.refType,
      rid = Number(notif.dataset.refId);
    if (rt === "event") openEvent(rid);
    else if (rt === "club") openClub(rid);
    return;
  }
  const cancelReg = e.target.closest('[data-action="cancel-registration"]');
  if (cancelReg) {
    cancelRegistration(Number(cancelReg.dataset.id));
    return;
  }
  const leave = e.target.closest('[data-action="leave-club"]');
  if (leave) {
    leaveClub(Number(leave.dataset.id));
    return;
  }
  const editUser = e.target.closest('[data-action="edit-user"]');
  if (editUser) {
    openUserEditor(Number(editUser.dataset.id));
    return;
  }
  const notifyUser = e.target.closest('[data-action="notify-user"]');
  if (notifyUser) {
    openNotifyComposer(
      notifyUser.dataset.email === "all" ? "all" : notifyUser.dataset.email,
    );
    return;
  }
  const rmReg = e.target.closest('[data-action="admin-remove-registration"]');
  if (rmReg) {
    adminRemoveRegistration(rmReg.dataset.email, Number(rmReg.dataset.id));
    return;
  }
  const rmMember = e.target.closest('[data-action="admin-remove-membership"]');
  if (rmMember) {
    adminRemoveMembership(rmMember.dataset.email, Number(rmMember.dataset.id));
    return;
  }
});

/* ---------- Events ---------- */
function getEvent(id) {
  return eventsCache.find((e) => Number(e.id) === Number(id)) || null;
}
function eventCard(id) {
  return $(`#events-grid .event-card[data-id="${id}"]`);
}
function tag(category) {
  const c = {
      Technical: ["#ECEBFA", "#423E85"],
      Cultural: ["#FFE9D2", "#B85400"],
      Sports: ["#DFF5EA", "#167A55"],
      Workshop: ["#FDE8E6", "#C23D2C"],
      Music: ["#F3E4F0", "#8A3A78"],
      Art: ["#E4F1FB", "#2A6C9E"],
      Seminar: ["#F1EFE6", "#6B6350"],
    },
    [bg, fg] = c[category] || ["#EEE", "#555"];
  return `<span class="tag" style="background:${bg};color:${fg}">${esc(category)}</span>`;
}
function setCategory(category) {
  activeCategory = category;
  $$("[data-category]").forEach((b) =>
    b.classList.toggle("active", b.dataset.category === category),
  );
  filterEvents();
}
function filterEvents() {
  const search = $("#event-search");
  if (!search) return;
  const q = search.value.trim().toLowerCase();
  let shown = 0;
  $$("#events-grid .event-card").forEach((card) => {
    const show =
      (activeCategory === "All" || card.dataset.category === activeCategory) &&
      (!q ||
        card.dataset.title.toLowerCase().includes(q) ||
        card.dataset.organizer.toLowerCase().includes(q) ||
        card.dataset.category.toLowerCase().includes(q) ||
        card.dataset.venue.toLowerCase().includes(q));
    card.classList.toggle("hidden", !show);
    if (show) shown++;
  });
  $("#events-empty")?.classList.toggle("hidden", shown !== 0);
  const count = $(".event-results-count");
  if (count) count.textContent = `${shown} ${shown === 1 ? "event" : "events"}`;
}
function filterClubs() {
  const search = $("#club-search");
  if (!search) return;
  const q = search.value.trim().toLowerCase();
  let shown = 0;
  $$(".clubs-grid .club-card").forEach((card) => {
    const searchable = `${card.dataset.name || ""} ${card.dataset.about || ""} ${card.dataset.president || ""} ${card.dataset.type || ""} ${card.dataset.tagline || ""} ${card.dataset.activities || ""}`.toLowerCase();
    const show = !q || searchable.includes(q);
    card.classList.toggle("hidden", !show);
    if (show) shown++;
  });
  $("#clubs-empty")?.classList.toggle("hidden", shown !== 0);
  const count = $(".clubs-count");
  if (count) count.textContent = `${shown} ${shown === 1 ? "club" : "clubs"}`;
}
function makeEventCard(event) {
  const spots = Math.max(0, event.capacity - event.registered),
    closed = registrationClosed(event),
    pct = Math.min(100, Math.round((event.registered / event.capacity) * 100));
  return `<article class="event-card all-event" data-action="open-event" data-id="${event.id}" data-title="${esc(event.title)}" data-category="${esc(event.category)}" data-date="${esc(event.date)}" data-time="${esc(event.time)}" data-venue="${esc(event.venue)}" data-organizer="${esc(event.organizer)}" data-capacity="${event.capacity}" data-registered="${event.registered}"><div class="event-card-top">${tag(event.category)}<span class="status-open"><span class="status-dot"></span><span class="status-label">${closed ? "Closed" : spots ? "Open" : "Full"}</span></span></div><div><div class="event-title">${esc(event.title)}</div><div class="event-meta" style="margin-top:10px"><div class="event-meta-row">${icon("calendar", 14)} <span class="event-date">${esc(event.date)}</span></div><div class="event-meta-row">${icon("pin", 14)} <span class="event-venue">${esc(event.venue)}</span></div><div class="event-meta-row">${icon("users", 14)} <span class="event-registered">${event.registered}</span> registered</div></div><div class="registration-deadline">Registration closes: ${esc(deadlineText(event))}</div></div><div class="cap-bar"><div class="cap-fill" style="width:${pct}%"></div></div><div class="event-card-foot"><span class="cap-text">${spots} spots left</span><button class="btn btn-ghost btn-sm" data-action="open-event" data-id="${event.id}">View details</button></div></article>`;
}
function applyEventToDom(event) {
  $$(`.event-card[data-id="${event.id}"]`).forEach((card) => {
    Object.entries({
      title: event.title,
      category: event.category,
      date: event.date,
      time: event.time,
      venue: event.venue,
      organizer: event.organizer,
      capacity: event.capacity,
      registered: event.registered,
      description: event.description,
      requirements: JSON.stringify(event.requirements || []),
      lat: event.lat,
      lng: event.lng,
    }).forEach(([k, v]) => (card.dataset[k] = v ?? ""));
    $(".event-title", card) &&
      ($(".event-title", card).textContent = event.title);
    $(".event-date", card) && ($(".event-date", card).textContent = event.date);
    $(".event-venue", card) &&
      ($(".event-venue", card).textContent = event.venue);
    const t = $(".event-card-top .tag", card);
    if (t) t.outerHTML = tag(event.category);
  });
  updateEventCount(event.id, event.registered, event.capacity);
}
function decorateEventStates() {
  $$(".event-card").forEach((card) => {
    const event = getEvent(Number(card.dataset.id)),
      closed = event && registrationClosed(event);
    card.classList.toggle("event-closed", !!closed);
    card.classList.toggle("event-open", !closed);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `View details for ${event?.title || "event"}`,
    );
  });
}
function syncHeroCards() {
  const cards = $$(".pin-card");
  cards.forEach((card, index) => {
    const event = eventsCache[index];
    if (!event) return;
    card.dataset.action = "open-event";
    card.dataset.id = event.id;
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute("aria-label", `View details for ${event.title}`);
    $(".pin-title", card).textContent = event.title;
    const meta = $$(".pin-meta span", card);
    if (meta[0]) meta[0].textContent = `${event.date} · ${event.venue}`;
    if (meta[1])
      meta[1].textContent = `${event.registered}/${event.capacity} registered`;
    card.classList.toggle("event-closed", registrationClosed(event));
  });
}
function syncEvents() {
  const grid = $("#events-grid");
  if (grid) {
    grid.innerHTML = eventsCache.map(makeEventCard).join("");
    decorateEventStates();
    filterEvents();
    renderMap();
  }
  syncHomeFeatured();
  syncHeroCards();
  syncAdminRows();
  updateAdminStats();
  syncAdminUsers();
}
function syncHomeFeatured() {
  const box = $("#featured-events");
  if (!box) return;
  box.innerHTML = eventsCache.slice(0, 3).map(makeEventCard).join("");
  decorateEventStates();
}
function updateEventCount(id, registered, capacity) {
  $$(`.event-card[data-id="${id}"]`).forEach((card) => {
    const spots = Math.max(0, capacity - registered),
      event = getEvent(id);
    card.dataset.registered = registered;
    card.dataset.capacity = capacity;
    $(".event-registered", card) &&
      ($(".event-registered", card).textContent = registered);
    $(".cap-text", card) &&
      ($(".cap-text", card).textContent = `${spots} spots left`);
    $(".status-label", card) &&
      ($(".status-label", card).textContent = registrationClosed(event)
        ? "Closed"
        : spots
          ? "Open"
          : "Full");
    $(".cap-fill", card) &&
      ($(".cap-fill", card).style.width =
        `${Math.min(100, Math.round((registered / capacity) * 100))}%`);
  });
  const row = $(`[data-event-row="${id}"]`);
  if (row && $(".admin-count", row))
    $(".admin-count", row).textContent = `${registered}/${capacity}`;
}

/* ---------- Modal + registration ---------- */
function openModal(content) {
  // Never allow an expanded campus map to sit underneath/through a modal.
  if ($(".events-map-panel.map-expanded")) closeExpandedMap();
  const root = $("#modal-root");
  if (!root) return;
  root.innerHTML = `<div class="overlay" id="active-overlay">${content}</div>`;
  $("#active-overlay").addEventListener("click", (e) => {
    if (
      e.target.id === "active-overlay" ||
      e.target.closest("[data-modal-close]")
    )
      closeModal();
  });
}
function closeModal() {
  const root = $("#modal-root");
  if (root) root.innerHTML = "";
}
function successBox(id) {
  return `<div class="success-box"><span style="color:var(--green-deep)">${icon("check", 20)}</span><div><div style="font-weight:700;font-size:14px;color:var(--green-deep)">You're registered</div><div style="font-size:13px;color:var(--ink-soft);margin-top:2px">Saved in this browser using localStorage.</div></div></div><button class="btn btn-ghost btn-block" style="margin-top:12px" data-action="cancel-registration" data-id="${id}">Cancel registration</button>`;
}
function openEvent(id) {
  // Opening event details should always close the expanded map first.
  if ($(".events-map-panel.map-expanded")) closeExpandedMap();
  const event = getEvent(id);
  if (!event) return;
  const registered = registrations.has(id),
    spots = Math.max(0, event.capacity - event.registered),
    closed = registrationClosed(event),
    hasCoords =
      Number.isFinite(Number(event.lat)) && Number.isFinite(Number(event.lng));
  openModal(
    `<div class="modal" style="position:relative"><button class="modal-close" data-modal-close>${icon("close", 16)}</button><div class="modal-head">${tag(event.category)}<h3>${esc(event.title)}</h3><p>Organised by ${esc(event.organizer)}</p></div><div class="modal-body"><div class="modal-meta-grid"><div>${icon("calendar", 16)}<div><small>Date</small><strong>${esc(event.date)}</strong></div></div><div>${icon("clock", 16)}<div><small>Time</small><strong>${esc(event.time)}</strong></div></div><div>${icon("pin", 16)}<div><small>Venue</small><strong>${esc(event.venue)}</strong></div></div><div>${icon("users", 16)}<div><small>Availability</small><strong>${spots} spots left</strong></div></div></div><div class="registration-deadline"><strong>Registration deadline:</strong> ${esc(deadlineText(event))}</div>${hasCoords ? `<div class="modal-map-actions"><button class="btn btn-ghost btn-sm" data-action="view-on-map" data-id="${event.id}">${icon("pin", 14)} View on campus map</button></div>` : ""}<div class="modal-section-label">About this event</div><p class="modal-desc">${esc(event.description || "Campus event.")}</p><div class="modal-section-label">Requirements</div><ul class="req-list">${(event.requirements || ["Valid college ID"]).map((r) => `<li>${icon("check", 14)}${esc(r)}</li>`).join("")}</ul><div id="event-registration-area">${registered ? successBox(id) : closed ? '<div class="registration-closed">Registration closed</div>' : `<button class="btn btn-marigold btn-block" id="show-register-form" ${spots === 0 ? "disabled" : ""}>${spots === 0 ? "Event full" : "Register now"}</button>`}</div></div></div>`,
  );
  $("#show-register-form")?.addEventListener("click", () =>
    showRegistrationForm(id),
  );
}
function showRegistrationForm(id) {
  const area = $("#event-registration-area");
  if (!area) return;
  area.innerHTML = `<form id="registration-form"><div class="form-grid"><div class="field"><label>Full name</label><input name="name" required value="${esc(currentUser.name)}"></div><div class="field"><label>Email</label><input id="reg-email" name="email" required type="email" value="${esc(currentUser.email)}"></div><div class="field"><label>Enrollment number</label><input id="reg-enrollment" name="enrollment" required disabled placeholder="Verify email to unlock"></div><div class="field"><label>Phone</label><input name="phone" required pattern="[0-9]{10}"></div><div class="field"><label>Department</label><input name="department" required></div><div class="field"><label>Year</label><select name="year"><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select></div></div><div class="otp-box" id="otp-box"><button class="btn btn-ghost btn-sm" type="button" id="send-otp-btn">${icon("check", 14)} Send OTP to verify email</button><p class="otp-hint">We'll verify your email before unlocking the enrollment number field.</p></div><button class="btn btn-marigold btn-block" style="margin-top:16px" type="submit" id="confirm-reg-btn" disabled>Verify email to continue</button></form>`;
  let sentOtp = null;
  $("#send-otp-btn").addEventListener("click", () => {
    const emailVal = $("#reg-email").value.trim();
    if (!emailVal) {
      return;
    }
    sentOtp = String(Math.floor(100000 + Math.random() * 900000));
    $("#otp-box").innerHTML =
      `<p class="otp-hint">Demo mode: no real inbox is used, so your OTP is shown here instead of emailed to <strong>${esc(emailVal)}</strong>.</p><div class="otp-demo-code">${sentOtp}</div><div class="field" style="margin-top:8px"><label>Enter OTP</label><input id="otp-input" maxlength="6" placeholder="6-digit code"></div><button class="btn btn-ghost btn-sm" type="button" id="verify-otp-btn">Verify OTP</button><p class="otp-error hidden" id="otp-error">Incorrect code — try again.</p>`;
    $("#verify-otp-btn").addEventListener("click", () => {
      const val = $("#otp-input").value.trim();
      if (val === sentOtp) {
        $("#reg-enrollment").disabled = false;
        $("#reg-enrollment").placeholder = "";
        $("#confirm-reg-btn").disabled = false;
        $("#confirm-reg-btn").textContent = "Confirm registration";
        $("#otp-box").innerHTML =
          `<p class="otp-hint" style="color:var(--green-deep)">${icon("check", 14)} Email verified — enrollment number unlocked.</p>`;
      } else {
        $("#otp-error").classList.remove("hidden");
      }
    });
  });
  $("#registration-form").addEventListener("submit", (e) => {
    e.preventDefault();
    registerForEvent(
      id,
      Object.fromEntries(new FormData(e.currentTarget).entries()),
    );
    area.innerHTML = successBox(id);
  });
}
function registerForEvent(id, details) {
  if (registrations.has(id)) return;
  const event = getEvent(id);
  if (!event || registrationClosed(event) || event.registered >= event.capacity)
    return;
  registrations.add(id);
  db.registrations[currentUser.email] = [...registrations];
  db.registrationDetails[currentUser.email] ||= {};
  db.registrationDetails[currentUser.email][id] = details;
  event.registered = realRegistrationCount(id);
  addNotification(currentUser.email, {
    title: "Registration successful",
    message: `You're registered for "${event.title}".`,
    refType: "event",
    refId: id,
  });
  saveDb();
  syncEvents();
  updateDashboard();
  updateNotifBadge();
}
function cancelRegistration(id) {
  const event = getEvent(id);
  if (!event || !registrations.has(id)) return;
  if (!confirm(`Cancel your registration for "${event.title}"?`)) return;
  registrations.delete(id);
  db.registrations[currentUser.email] = [...registrations];
  if (db.registrationDetails[currentUser.email])
    delete db.registrationDetails[currentUser.email][id];
  event.registered = Math.max(0, event.registered - 1);
  addNotification(currentUser.email, {
    title: "Registration cancelled",
    message: `You cancelled your registration for "${event.title}".`,
    refType: "event",
    refId: id,
  });
  saveDb();
  syncEvents();
  updateDashboard();
  updateNotifBadge();
  closeModal();
  openEvent(id);
}

/* ---------- Clubs ---------- */
function getClub(id) {
  return db.clubs.find((c) => Number(c.id) === Number(id)) || null;
}
function clubCard(id) {
  return $(`.club-card[data-id="${id}"]`);
}
function makeClubCard(club) {
  const id = Number(club.id),
    joined = joinedClubs.has(id),
    limit = Math.max(0, Number(club.memberLimit) || 0),
    full = limit > 0 && Number(club.members) >= limit,
    closed = club.joinOpen === false,
    state = closed ? "Joining closed" : full ? "Full" : "Joining open",
    meeting = club.meetingSchedule || "Schedule TBA",
    venue = club.meetingVenue || "Venue TBA";
  return `<article class="club-card ${closed || full ? "club-closed" : "club-open"}" data-action="open-club" data-id="${club.id}" data-name="${esc(club.name)}" data-about="${esc(club.about)}" data-president="${esc(club.president)}" data-type="${esc(club.type)}" data-tagline="${esc(club.tagline)}" data-activities="${esc((club.activities || []).join(" "))}" tabindex="0" role="button" aria-label="View details for ${esc(club.name)}"><span class="club-status">${state}</span><div class="club-card-head"><div class="club-icon" style="background:${esc(club.color)}">${esc(club.short)}</div><span class="tag club-type-tag">${esc(club.type)}</span></div><div><div class="club-name">${esc(club.name)}</div><div class="club-tagline">${esc(club.tagline || "Student community")}</div></div><div class="club-meta">${club.members}${limit ? `/${limit}` : ""} members · President: ${esc(club.president)}</div><div class="club-about">${esc(club.about)}</div><div class="club-quick-info"><div class="club-quick-row">${icon("clock", 14)} <span>${esc(meeting)}</span></div><div class="club-quick-row">${icon("pin", 14)} <span>${esc(venue)}</span></div></div><div class="club-card-foot"><span class="tag club-joined-badge ${joined ? "" : "hidden"}">Joined</span><button class="btn btn-ghost btn-sm" data-action="open-club" data-id="${club.id}">View details</button></div></article>`;
}
function syncClubs() {
  const grid = $(".clubs-grid");
  if (grid) {
    grid.innerHTML = db.clubs.map(makeClubCard).join("");
    filterClubs();
  }
  syncAdminClubs();
  syncAdminUsers();
}
function openClub(id) {
  const club = getClub(id);
  if (!club) return;
  const joined = joinedClubs.has(id),
    limit = Math.max(0, Number(club.memberLimit) || 0),
    full = limit > 0 && Number(club.members) >= limit,
    closed = club.joinOpen === false,
    status = closed ? "Joining closed" : full ? "Club full" : "Joining open",
    activities = Array.isArray(club.activities) ? club.activities : [],
    requirements = Array.isArray(club.joinRequirements) ? club.joinRequirements : [],
    eventLinks = (club.events || [])
      .map((name) => {
        const event = eventsCache.find((item) => item.title === name);
        return event
          ? `<button class="list-row club-event-link" data-action="open-event" data-id="${event.id}"><span><span class="list-row-title">${esc(name)}</span><span class="list-row-sub">${esc(event.date)} · ${esc(event.venue)}</span></span>${icon("arrow", 14)}</button>`
          : `<div class="list-row"><span class="list-row-title">${esc(name)}</span></div>`;
      })
      .join("") || '<p class="modal-desc">No upcoming events assigned yet.</p>',
    membershipAction = joined
      ? `<div class="success-box club-member-success"><span style="color:var(--green-deep)">${icon("check", 20)}</span><div><div style="font-weight:700;font-size:14px;color:var(--green-deep)">You're a member</div><div style="font-size:13px;color:var(--ink-soft);margin-top:2px">Club updates and activities will appear in your dashboard.</div></div></div><button class="btn btn-ghost btn-block" style="margin-top:12px" data-action="leave-club" data-id="${id}">Leave club</button>`
      : closed
        ? '<div class="registration-closed">This club is not accepting new members right now.</div>'
        : full
          ? '<div class="registration-closed">This club has reached its current member limit.</div>'
          : `<button class="btn btn-marigold btn-block" id="join-club-button">Join this club</button>`;

  openModal(
    `<div class="modal club-detail-modal" style="position:relative"><button class="modal-close" data-modal-close>${icon("close", 16)}</button><div class="modal-head club-modal-head"><div class="club-icon club-modal-icon" style="background:${esc(club.color)}">${esc(club.short)}</div><div class="club-modal-title"><div class="club-modal-tags"><span class="tag club-type-tag">${esc(club.type)}</span><span class="club-modal-status ${closed || full ? "is-closed" : ""}">${status}</span></div><h3>${esc(club.name)}</h3><p>${esc(club.tagline || "Student community")}</p></div></div><div class="modal-body"><div class="modal-meta-grid club-meta-grid"><div>${icon("clock", 16)}<div><small>Meetings</small><strong>${esc(club.meetingSchedule || "Schedule TBA")}</strong></div></div><div>${icon("pin", 16)}<div><small>Meeting venue</small><strong>${esc(club.meetingVenue || "Venue TBA")}</strong></div></div><div>${icon("users", 16)}<div><small>Members</small><strong>${club.members}${limit ? ` / ${limit}` : ""}${limit ? " capacity" : ""}</strong></div></div><div>${icon("users", 16)}<div><small>Faculty mentor</small><strong>${esc(club.facultyMentor || "To be announced")}</strong></div></div></div><div class="modal-section-label">About this club</div><p class="modal-desc">${esc(club.about)}</p><div class="club-detail-columns"><div><div class="modal-section-label">Leadership</div><div class="club-detail-card"><strong>President</strong><span>${esc(club.president)}</span><strong>Vice president</strong><span>${esc(club.vicePresident || "Not assigned")}</span><strong>Founded</strong><span>${esc(club.founded || "—")}</span></div></div><div><div class="modal-section-label">Who can join</div><div class="club-detail-card"><p>${esc(club.eligibility || "Open to all enrolled students.")}</p></div></div></div><div class="modal-section-label">What you'll do</div><ul class="req-list club-activity-list">${activities.map((item) => `<li>${icon("check", 14)}${esc(item)}</li>`).join("") || `<li>${icon("check", 14)}${esc(club.assignedWork)}</li>`}</ul><div class="modal-section-label">Current focus</div><p class="modal-desc">${esc(club.assignedWork)}</p><div class="modal-section-label">Joining requirements</div><ul class="req-list">${requirements.map((item) => `<li>${icon("check", 14)}${esc(item)}</li>`).join("") || `<li>${icon("check", 14)}Valid college ID</li>`}</ul><div class="modal-section-label">Upcoming events</div>${eventLinks}<div class="club-actions">${membershipAction}</div></div></div>`,
  );
  $("#join-club-button")?.addEventListener("click", () => {
    const currentLimit = Math.max(0, Number(club.memberLimit) || 0),
      isFull = currentLimit > 0 && Number(club.members) >= currentLimit;
    if (club.joinOpen === false || isFull || joinedClubs.has(id)) return;
    joinedClubs.add(id);
    db.memberships[currentUser.email] = [...joinedClubs];
    club.members++;
    addNotification(currentUser.email, {
      title: "Club joined",
      message: `You joined "${club.name}".`,
      refType: "club",
      refId: id,
    });
    saveDb();
    syncClubs();
    updateDashboard();
    updateNotifBadge();
    openClub(id);
  });
}
function leaveClub(id) {
  const club = getClub(id);
  if (!club || !joinedClubs.has(id)) return;
  if (!confirm(`Leave "${club.name}"?`)) return;
  joinedClubs.delete(id);
  db.memberships[currentUser.email] = [...joinedClubs];
  club.members = Math.max(0, club.members - 1);
  addNotification(currentUser.email, {
    title: "Club left",
    message: `You left "${club.name}".`,
    refType: "club",
    refId: id,
  });
  saveDb();
  syncClubs();
  updateDashboard();
  updateNotifBadge();
  closeModal();
  openClub(id);
}

/* ---------- Dashboard ---------- */
function updateDashboard() {
  if ($("#dashboard-name"))
    $("#dashboard-name").textContent = currentUser?.name || "Student";
  if ($("#registration-count"))
    $("#registration-count").textContent = registrations.size;
  if ($("#club-count")) $("#club-count").textContent = joinedClubs.size;
  const regs = $("#my-registrations");
  if (regs)
    regs.innerHTML =
      [...registrations]
        .map((id) => {
          const e = getEvent(id);
          return e
            ? `<div class="list-row"><div><div class="list-row-title">${esc(e.title)}</div><div class="list-row-sub">${esc(e.date)} · ${esc(e.venue)}</div></div><button class="btn btn-ghost btn-sm" data-action="open-event" data-id="${id}">View</button></div>`
            : "";
        })
        .join("") ||
      '<p style="font-size:13.5px;color:var(--muted)">You haven\'t registered for any events yet.</p>';
  const clubs = $("#my-clubs");
  if (clubs)
    clubs.innerHTML =
      [...joinedClubs]
        .map((id) => {
          const c = getClub(id);
          return c
            ? `<div class="list-row"><div style="display:flex;align-items:center;gap:10px"><div class="club-icon" style="width:34px;height:34px;font-size:13px;background:${c.color}">${esc(c.short)}</div><div class="list-row-title">${esc(c.name)}</div></div><span class="list-row-sub">${c.members} members</span></div>`
            : "";
        })
        .join("") ||
      '<p style="font-size:13.5px;color:var(--muted)">You haven\'t joined any clubs yet.</p>';
}

/* ---------- Admin CRUD ---------- */
function ensureAdminControls() {
  const form = $("#event-editor");
  if (!form) return;
  if (!form.elements.registrationDeadline) {
    const time = form.elements.time.closest(".field");
    time.insertAdjacentHTML(
      "afterend",
      '<div class="field"><label>Registration closes</label><input name="registrationDeadline" type="datetime-local" required><small style="display:block;margin-top:6px;color:var(--muted)">Registration automatically closes after this date and time.</small></div>',
    );
  }
  if (!$("#admin-club-rows")) {
    const users = $("#admin-user-rows")?.closest(".admin-table-wrap");
    users?.insertAdjacentHTML(
      "beforebegin",
      `<div class="admin-table-wrap club-management-wrap" style="margin-top:30px"><div class="panel-title" style="margin-bottom:14px"><span>Club management</span><button class="btn btn-marigold btn-sm" data-action="create-club" type="button">Create club</button></div><form class="panel hidden club-editor-panel" id="club-editor" style="margin-bottom:18px"><input name="clubId" type="hidden"><div class="panel-title"><span id="club-editor-title">Create club</span><button class="icon-action" id="close-club-editor" type="button" aria-label="Close club editor">×</button></div><p class="club-editor-help">Add enough information for students to understand what the club does, when it meets and what they need before joining.</p><div class="form-grid club-form-grid"><div class="field"><label>Club name</label><input name="name" required placeholder="e.g. Robotics Club"></div><div class="field"><label>Club type</label><select name="type" required><option>Technical</option><option>Cultural</option><option>Sports</option><option>Academic</option><option>Arts</option><option>Social service</option><option>Entrepreneurship</option><option>Other</option></select></div><div class="field"><label>Short code</label><input name="short" maxlength="3" placeholder="e.g. RC"></div><div class="field"><label>Card colour</label><input name="color" type="color" value="#423E85"></div><div class="field field-span-2"><label>Club tagline</label><input name="tagline" required placeholder="A short line students see on the club card"></div><div class="field"><label>President</label><input name="president" required></div><div class="field"><label>Vice president</label><input name="vicePresident" required></div><div class="field"><label>Faculty mentor / coordinator</label><input name="facultyMentor" required></div><div class="field"><label>Contact email</label><input name="contactEmail" type="email" required placeholder="club@campus.edu"></div><div class="field"><label>Meeting schedule</label><input name="meetingSchedule" required placeholder="Friday · 4:30 PM"></div><div class="field"><label>Meeting venue</label><input name="meetingVenue" required placeholder="Student Activity Centre"></div><div class="field"><label>Founded year</label><input name="founded" inputmode="numeric" maxlength="4" placeholder="2024"></div><div class="field"><label>Member limit</label><input name="memberLimit" type="number" min="0" step="1" value="0"><small>Use 0 for no fixed limit.</small></div><div class="field"><label>Club joining</label><select name="joinOpen"><option value="true">Open</option><option value="false">Closed</option></select></div><div class="field"><label>Who can join?</label><input name="eligibility" required placeholder="e.g. Open to all years"></div><div class="field field-span-2"><label>About the club</label><textarea name="about" rows="4" required placeholder="Purpose, community and what makes the club useful..."></textarea></div><div class="field field-span-2"><label>Current focus / assigned work</label><textarea name="assignedWork" rows="3" required placeholder="What the club is currently working on"></textarea></div><div class="field"><label>Activities <span>(one per line)</span></label><textarea name="activities" rows="5" required placeholder="Weekly practice&#10;Project teams&#10;Competitions"></textarea></div><div class="field"><label>Joining requirements <span>(one per line)</span></label><textarea name="joinRequirements" rows="5" required placeholder="Valid college ID&#10;Attend orientation"></textarea></div><div class="field field-span-2"><label>Upcoming event titles <span>(one per line, optional)</span></label><textarea name="events" rows="3" placeholder="Use the exact event title so students can open it from club details"></textarea></div></div><button class="btn btn-primary" style="margin-top:16px" type="submit">Save club</button></form><table><thead><tr><th>Club</th><th>Type</th><th>Leadership</th><th>Members</th><th>Meeting</th><th>Status</th><th>Actions</th></tr></thead><tbody id="admin-club-rows"></tbody></table></div>`,
    );
    initClubAdmin();
    syncAdminClubs();
  }
}
function openEditor(id = null) {
  const form = $("#event-editor");
  if (!form) return;
  form.reset();
  form.classList.remove("hidden");
  form.eventId.value = id || "";
  $("#editor-title").textContent = id ? "Edit event" : "Create event";
  const event = id ? getEvent(id) : null;
  if (event)
    [
      "title",
      "category",
      "date",
      "time",
      "venue",
      "organizer",
      "capacity",
      "lat",
      "lng",
      "registrationDeadline",
    ].forEach(
      (k) => form.elements[k] && (form.elements[k].value = event[k] ?? ""),
    );
  else {
    form.lat.value = CAMPUS_CENTER[0];
    form.lng.value = CAMPUS_CENTER[1];
  }
  $("#geocode-status").textContent =
    "Uses OpenStreetMap search to fill latitude and longitude.";
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}
function createEvent(data) {
  db.events.unshift({
    id: Date.now(),
    registered: 0,
    description: "A new campus event created from the admin dashboard.",
    requirements: ["Valid college ID"],
    ...data,
  });
  eventsCache = db.events;
  saveDb();
  syncEvents();
}
function updateEvent(id, data) {
  const e = getEvent(id);
  if (!e) return;
  Object.assign(e, data);
  saveDb();
  syncEvents();
}
function deleteEvent(id) {
  const e = getEvent(id);
  if (!e || !confirm(`Delete “${e.title}”?`)) return;
  db.events = db.events.filter((x) => Number(x.id) !== id);
  Object.keys(db.registrations).forEach(
    (email) =>
      (db.registrations[email] = db.registrations[email].filter(
        (x) => Number(x) !== id,
      )),
  );
  Object.values(db.registrationDetails).forEach((x) => {
    if (x) delete x[id];
  });
  eventsCache = db.events;
  registrations.delete(id);
  saveDb();
  syncEvents();
  updateDashboard();
}
function syncAdminRows() {
  const body = $("#admin-event-rows");
  if (!body) return;
  body.innerHTML = eventsCache
    .map(
      (e) =>
        `<tr data-event-row="${e.id}"><td class="admin-title" style="font-weight:600">${esc(e.title)}</td><td>${tag(e.category)}</td><td class="mono admin-date" style="font-size:12.5px">${esc(e.date)}</td><td class="admin-count">${e.registered}/${e.capacity}</td><td><div class="table-actions"><button class="icon-action" data-action="edit-event" data-id="${e.id}">${icon("edit", 14)}</button><button class="icon-action danger" data-action="delete-event" data-id="${e.id}">${icon("trash", 14)}</button></div></td></tr>`,
    )
    .join("");
}
function updateAdminStats() {
  if ($("#admin-event-count"))
    $("#admin-event-count").textContent = eventsCache.length;
  if ($("#admin-registration-count"))
    $("#admin-registration-count").textContent = eventsCache
      .reduce((s, e) => s + Number(e.registered), 0)
      .toLocaleString();
}
function initAdmin() {
  const form = $("#event-editor");
  if (!form) return;
  ensureAdminControls();
  $("#close-event-editor")?.addEventListener("click", () =>
    form.classList.add("hidden"),
  );
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget,
      id = Number(f.eventId.value),
      data = {
        title: f.title.value.trim(),
        category: f.category.value,
        date: f.date.value.trim(),
        time: f.time.value.trim() || "TBA",
        registrationDeadline: f.registrationDeadline.value,
        venue: f.venue.value.trim(),
        organizer: f.organizer.value.trim(),
        capacity: Number(f.capacity.value),
        lat: Number(f.lat.value) || CAMPUS_CENTER[0],
        lng: Number(f.lng.value) || CAMPUS_CENTER[1],
      };
    if (registrationClosed(data)) {
      alert("Choose a registration deadline in the future.");
      return;
    }
    id ? updateEvent(id, data) : createEvent(data);
    f.classList.add("hidden");
  });
  $("#find-venue")?.addEventListener("click", async () => {
    const venue = form.venue.value.trim(),
      status = $("#geocode-status");
    if (!venue) {
      status.textContent = "Enter a venue first.";
      return;
    }
    status.textContent = "Searching OpenStreetMap…";
    try {
      const q = `${venue}, Chitkara University Punjab, India`,
        r = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
        ),
        x = await r.json();
      if (!x.length) {
        status.textContent =
          "Location not found. Enter latitude/longitude manually.";
        return;
      }
      form.lat.value = Number(x[0].lat).toFixed(6);
      form.lng.value = Number(x[0].lon).toFixed(6);
      status.textContent = `Found: ${x[0].display_name}`;
    } catch {
      status.textContent =
        "Map search needs an internet connection. Enter coordinates manually.";
    }
  });
}

function linesToList(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}
function initClubAdmin() {
  const form = $("#club-editor");
  if (!form || form.dataset.ready) return;
  form.dataset.ready = "true";
  $("#close-club-editor")?.addEventListener("click", () =>
    form.classList.add("hidden"),
  );
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget,
      id = Number(f.clubId.value),
      generatedShort = f.name.value
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      data = {
        name: f.name.value.trim(),
        type: f.type.value,
        short: (f.short.value.trim() || generatedShort || "CL").slice(0, 3).toUpperCase(),
        color: f.color.value || "#423E85",
        tagline: f.tagline.value.trim(),
        president: f.president.value.trim(),
        vicePresident: f.vicePresident.value.trim(),
        facultyMentor: f.facultyMentor.value.trim(),
        contactEmail: f.contactEmail.value.trim().toLowerCase(),
        meetingSchedule: f.meetingSchedule.value.trim(),
        meetingVenue: f.meetingVenue.value.trim(),
        founded: f.founded.value.trim(),
        memberLimit: Math.max(0, Number(f.memberLimit.value) || 0),
        eligibility: f.eligibility.value.trim(),
        assignedWork: f.assignedWork.value.trim(),
        about: f.about.value.trim(),
        activities: linesToList(f.activities.value),
        joinRequirements: linesToList(f.joinRequirements.value),
        events: linesToList(f.events.value),
        joinOpen: f.joinOpen.value === "true",
      };
    if (id) {
      const club = getClub(id);
      if (club) Object.assign(club, data);
    } else {
      db.clubs.push({
        id: Date.now(),
        members: 0,
        ...data,
      });
    }
    saveDb();
    syncClubs();
    form.classList.add("hidden");
  });
}
function openClubEditor(id = null) {
  const form = $("#club-editor");
  if (!form) return;
  form.reset();
  form.clubId.value = id || "";
  $("#club-editor-title").textContent = id ? "Edit club" : "Create club";
  const club = id ? getClub(id) : null;
  if (club) {
    [
      "name",
      "type",
      "short",
      "color",
      "tagline",
      "president",
      "vicePresident",
      "facultyMentor",
      "contactEmail",
      "meetingSchedule",
      "meetingVenue",
      "founded",
      "memberLimit",
      "eligibility",
      "assignedWork",
      "about",
    ].forEach((key) => {
      if (form.elements[key]) form.elements[key].value = club[key] ?? "";
    });
    form.elements.activities.value = (club.activities || []).join("\n");
    form.elements.joinRequirements.value = (club.joinRequirements || []).join("\n");
    form.elements.events.value = (club.events || []).join("\n");
  } else {
    form.elements.color.value = "#423E85";
    form.elements.memberLimit.value = "0";
  }
  form.elements.joinOpen.value = String(club?.joinOpen !== false);
  form.classList.remove("hidden");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}
function syncAdminClubs() {
  const body = $("#admin-club-rows");
  if (!body) return;
  body.innerHTML = db.clubs
    .map((club) => {
      const limit = Math.max(0, Number(club.memberLimit) || 0),
        full = limit > 0 && Number(club.members) >= limit,
        status = club.joinOpen === false ? "Closed" : full ? "Full" : "Open";
      return `<tr><td><div class="admin-club-name"><span class="admin-club-dot" style="background:${esc(club.color)}"></span><div><strong>${esc(club.name)}</strong><small>${esc(club.tagline || "")}</small></div></div></td><td>${esc(club.type)}</td><td><strong>${esc(club.president)}</strong><small class="admin-cell-sub">VP: ${esc(club.vicePresident)}</small></td><td>${club.members}${limit ? `/${limit}` : ""}</td><td><strong>${esc(club.meetingSchedule || "TBA")}</strong><small class="admin-cell-sub">${esc(club.meetingVenue || "")}</small></td><td><span class="admin-club-status ${status.toLowerCase()}">${status}</span></td><td><div class="table-actions"><button class="icon-action" data-action="edit-club" data-id="${club.id}" aria-label="Edit ${esc(club.name)}">${icon("edit", 14)}</button><button class="icon-action danger" data-action="delete-club" data-id="${club.id}" aria-label="Delete ${esc(club.name)}">${icon("trash", 14)}</button></div></td></tr>`;
    })
    .join("");
}
function deleteClub(id) {
  const club = getClub(id);
  if (!club || !confirm(`Delete “${club.name}”?`)) return;
  db.clubs = db.clubs.filter((c) => Number(c.id) !== id);
  Object.keys(db.memberships).forEach(
    (email) =>
      (db.memberships[email] = (db.memberships[email] || []).filter(
        (x) => Number(x) !== id,
      )),
  );
  joinedClubs.delete(id);
  saveDb();
  syncClubs();
  updateDashboard();
}

/* ---------- Admin: user management (admin-only, enforced by page redirect in requireLogin) ---------- */
function syncAdminUsers() {
  if (!isAdmin()) return;
  const body = $("#admin-user-rows");
  if (!body) return;
  const students = db.users.filter((u) => u.role !== "admin");
  body.innerHTML =
    students
      .map((u) => {
        const regs = (db.registrations[u.email] || [])
          .map((id) => getEvent(id))
          .filter(Boolean);
        const clubs = (db.memberships[u.email] || [])
          .map((id) => getClub(id))
          .filter(Boolean);
        return `<tr data-user-row="${u.id}"><td class="admin-title" style="font-weight:600">${esc(u.name)}</td><td style="font-size:13px">${esc(u.email)}</td><td>${regs.length ? regs.map((e) => `<span class="pill">${esc(e.title)}<button data-action="admin-remove-registration" data-email="${esc(u.email)}" data-id="${e.id}" aria-label="Remove registration">×</button></span>`).join("") : '<span style="color:var(--muted);font-size:12.5px">None</span>'}</td><td>${clubs.length ? clubs.map((c) => `<span class="pill">${esc(c.name)}<button data-action="admin-remove-membership" data-email="${esc(u.email)}" data-id="${c.id}" aria-label="Remove membership">×</button></span>`).join("") : '<span style="color:var(--muted);font-size:12.5px">None</span>'}</td><td><div class="table-actions"><button class="icon-action" data-action="edit-user" data-id="${u.id}" aria-label="Edit ${esc(u.name)}">${icon("edit", 14)}</button><button class="icon-action" data-action="notify-user" data-email="${esc(u.email)}" aria-label="Notify ${esc(u.name)}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M9.5 19a2.5 2.5 0 0 0 5 0"/></svg></button></div></td></tr>`;
      })
      .join("") ||
    '<tr><td colspan="5" style="color:var(--muted);font-size:13px;padding:16px 0">No registered students yet.</td></tr>';
}
function openUserEditor(id) {
  if (!isAdmin()) return;
  const u = db.users.find((x) => x.id === id);
  if (!u) return;
  openModal(
    `<div class="modal" style="position:relative;max-width:420px"><button class="modal-close" data-modal-close>${icon("close", 16)}</button><div class="modal-head"><h3>Edit student</h3></div><div class="modal-body"><form id="user-edit-form"><div class="field"><label>Full name</label><input name="name" required value="${esc(u.name)}"></div><div class="field" style="margin-top:12px"><label>Email</label><input name="email" required type="email" value="${esc(u.email)}"></div><button class="btn btn-marigold btn-block" style="margin-top:16px" type="submit">Save changes</button></form></div></div>`,
  );
  $("#user-edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget,
      newName = f.name.value.trim(),
      newEmail = f.email.value.trim().toLowerCase();
    if (newEmail !== u.email && db.users.some((x) => x.email === newEmail)) {
      alert("Another account already uses that email.");
      return;
    }
    if (newEmail !== u.email) {
      [
        "registrations",
        "registrationDetails",
        "memberships",
        "notifications",
      ].forEach((k) => {
        if (db[k][u.email] !== undefined) {
          db[k][newEmail] = db[k][u.email];
          delete db[k][u.email];
        }
      });
    }
    u.name = newName;
    u.email = newEmail;
    saveDb();
    closeModal();
    syncAdminUsers();
  });
}
function openNotifyComposer(target) {
  if (!isAdmin()) return;
  const label =
    target === "all"
      ? "all students"
      : db.users.find((u) => u.email === target)?.name || target;
  openModal(
    `<div class="modal" style="position:relative;max-width:420px"><button class="modal-close" data-modal-close>${icon("close", 16)}</button><div class="modal-head"><h3>Notify ${esc(label)}</h3></div><div class="modal-body"><form id="notify-form"><div class="field"><label>Title</label><input name="title" required placeholder="e.g. Venue changed"></div><div class="field" style="margin-top:12px"><label>Message</label><textarea name="message" required rows="3" style="width:100%;padding:10px 12px;border-radius:9px;border:1.5px solid var(--line-dark);font-family:inherit;font-size:14px"></textarea></div><button class="btn btn-marigold btn-block" style="margin-top:16px" type="submit">Send</button></form></div></div>`,
  );
  $("#notify-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget,
      title = f.title.value.trim(),
      message = f.message.value.trim(),
      recipients =
        target === "all"
          ? db.users.filter((u) => u.role !== "admin").map((u) => u.email)
          : [target];
    recipients.forEach((email) => addNotification(email, { title, message }));
    closeModal();
  });
}
function adminRemoveRegistration(email, eventId) {
  if (!isAdmin()) return;
  const event = getEvent(eventId);
  if (!event) return;
  if (!confirm(`Remove this student's registration for "${event.title}"?`))
    return;
  db.registrations[email] = (db.registrations[email] || []).filter(
    (id) => Number(id) !== eventId,
  );
  if (db.registrationDetails[email])
    delete db.registrationDetails[email][eventId];
  event.registered = Math.max(0, event.registered - 1);
  if (email === currentUser.email) registrations.delete(eventId);
  addNotification(email, {
    title: "Registration removed",
    message: `Your registration for "${event.title}" was removed by an admin.`,
    refType: "event",
    refId: eventId,
  });
  saveDb();
  syncEvents();
  updateDashboard();
  syncAdminUsers();
}
function adminRemoveMembership(email, clubId) {
  if (!isAdmin()) return;
  const club = getClub(clubId);
  if (!club) return;
  if (!confirm(`Remove this student from "${club.name}"?`)) return;
  db.memberships[email] = (db.memberships[email] || []).filter(
    (id) => Number(id) !== clubId,
  );
  club.members = Math.max(0, club.members - 1);
  if (email === currentUser.email) joinedClubs.delete(clubId);
  addNotification(email, {
    title: "Club membership removed",
    message: `You were removed from "${club.name}" by an admin.`,
    refType: "club",
    refId: clubId,
  });
  saveDb();
  syncClubs();
  updateDashboard();
  syncAdminUsers();
}

/* ---------- Leaflet map ---------- */
function renderMap() {
  const c = $("#campus-map");
  if (!c || typeof L === "undefined") return;
  if (!campusMap) {
    campusMap = L.map("campus-map", { scrollWheelZoom: false }).setView(
      CAMPUS_CENTER,
      17,
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(campusMap);
    mapLayer = L.layerGroup().addTo(campusMap);
  }
  mapLayer.clearLayers();
  mapMarkers = {};
  const p = [];
  eventsCache.forEach((e) => {
    const lat = Number(e.lat),
      lng = Number(e.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    p.push([lat, lng]);
    const marker = L.marker([lat, lng])
      .addTo(mapLayer)
      .bindPopup(
        `<div class="map-popup-title">${esc(e.title)}</div><div class="map-popup-meta">${esc(e.date)} · ${esc(e.venue)}</div><button class="map-popup-btn" data-action="open-event" data-id="${e.id}">View event</button>`,
      );
    mapMarkers[e.id] = marker;
  });
  if (p.length > 1) campusMap.fitBounds(p, { padding: [35, 35], maxZoom: 18 });
  else if (p.length === 1) campusMap.setView(p[0], 17);
  setTimeout(() => campusMap.invalidateSize(), 50);
  const focusId = new URLSearchParams(location.search).get("focus");
  if (focusId) {
    setTimeout(() => focusEventOnMap(Number(focusId)), 300);
    const url = new URL(location.href);
    url.searchParams.delete("focus");
    history.replaceState({}, "", url);
  }
}

/* Pan the campus map to one event and pop its marker open. If we're not on the events page, jump there first with ?focus=id so the map can pick it up once it loads. */
function focusEventOnMap(id) {
  const event = getEvent(id);
  if (!event) return;
  if (PAGE !== "events") {
    location.href = `events.html?focus=${id}`;
    return;
  }
  closeModal();
  const target = $("#campus-map"),
    panel = target?.closest(".events-map-panel");
  if (panel) {
    panel.classList.add("map-expanded");
    if (!panel.querySelector('[data-action="close-map"]'))
      panel.insertAdjacentHTML(
        "afterbegin",
        `<button class="btn btn-primary map-expanded-close" data-action="close-map">${icon("close", 14)} Close map</button>`,
      );
    document.body.style.overflow = "hidden";
  }
  const doFocus = () => {
    campusMap?.invalidateSize();
    const marker = mapMarkers[id];
    if (!campusMap || !marker) return;
    campusMap.setView(marker.getLatLng(), 18, { animate: true });
    // Keep the map clean when opened from an event/venue.
    // Marker popups still appear normally when the user clicks a marker.
    campusMap.closePopup();
    const el = marker.getElement();
    if (el) {
      el.classList.remove("marker-pulse");
      void el.offsetWidth;
      el.classList.add("marker-pulse");
    }
  };
  setTimeout(doFocus, 250);
}
function closeExpandedMap() {
  const panel = $(".events-map-panel.map-expanded");
  if (!panel) return;
  panel.classList.remove("map-expanded");
  panel.querySelector('[data-action="close-map"]')?.remove();
  document.body.style.overflow = "";
  setTimeout(() => campusMap?.invalidateSize(), 50);
}

function openNotifications() {
  const notes = myNotifications();
  openModal(
    `<div class="modal" style="max-width:340px;margin-left:auto;margin-right:0;align-self:flex-start"><div class="modal-body" style="padding-top:22px"><div class="panel-title">Notifications <button class="icon-action" data-modal-close>${icon("close", 14)}</button></div>${notes.length ? notes.map((n) => `<div class="notif-item ${n.refId ? "notif-clickable" : ""} ${n.read ? "" : "notif-unread"}" ${n.refId ? `data-action="open-notification" data-ref-type="${esc(n.refType)}" data-ref-id="${n.refId}" data-notif-id="${n.id}"` : ""}><span class="notif-dot"></span><div><div class="notif-text"><strong>${esc(n.title)}</strong><br>${esc(n.message)}</div><div class="notif-time">${esc(n.time)}</div></div></div>`).join("") : '<p style="font-size:13.5px;color:var(--muted);padding:10px 0">No notifications yet.</p>'}</div></div>`,
  );
  const o = $("#active-overlay");
  if (o) {
    o.style.justifyContent = "flex-end";
    o.style.padding = "80px 24px";
  }
  myNotifications().forEach((n) => (n.read = true));
  saveDb();
  updateNotifBadge();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $(".events-map-panel.map-expanded") ? closeExpandedMap() : closeModal();
    return;
  }
  if (
    (e.key === "Enter" || e.key === " ") &&
    !e.target.matches("input,select,textarea,button,a")
  ) {
    const eventTarget = e.target.closest('[data-action="open-event"]');
    if (eventTarget) {
      e.preventDefault();
      openEvent(Number(eventTarget.dataset.id));
      return;
    }
    const clubTarget = e.target.closest('[data-action="open-club"]');
    if (clubTarget) {
      e.preventDefault();
      openClub(Number(clubTarget.dataset.id));
    }
  }
});

/* ---------- Start current page ---------- */
function start() {
  if (PAGE === "login" || PAGE === "signup") {
    initAuthPage();
    return;
  }
  if (!requireLogin()) return;
  syncEvents();
  syncClubs();
  updateDashboard();
  initAdmin();
  if (PAGE === "events") {
    $$("[data-category]").forEach((b) =>
      b.addEventListener("click", () => setCategory(b.dataset.category)),
    );
    $("#event-search")?.addEventListener("input", filterEvents);
    document.addEventListener("keydown", (event) => {
      if (event.key === "/" && !/input|textarea/i.test(document.activeElement?.tagName || "")) {
        event.preventDefault();
        $("#event-search")?.focus();
      }
    });
    const wanted = new URLSearchParams(location.search).get("category");
    if (wanted) setCategory(wanted);
    renderMap();
  }
  if (PAGE === "clubs") {
    $("#club-search")?.addEventListener("input", filterClubs);
  }
}
start();

/* =========================================================
   PREMIUM POLISH — additive, progressive-enhancement only.
   Nothing above this line was changed. This block only ADDS
   two visual touches and safely no-ops if anything is missing:
   1) a subtle shadow on the navbar once the page is scrolled
   2) a gentle fade/rise-in for cards & panels as they enter view
   ========================================================= */
(function polishEnhancements() {
  try {
    const nav = document.querySelector(".nav");
    if (nav) {
      const onScroll = () =>
        nav.classList.toggle("nav-scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  } catch (e) {}

  try {
    const targets = document.querySelectorAll(
      ".event-card, .club-card, .panel, .stat-card, .pin-card",
    );
    if (targets.length && "IntersectionObserver" in window) {
      targets.forEach((el) => el.classList.add("reveal-init"));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      targets.forEach((el) => io.observe(el));
    }
  } catch (e) {}
})();

/* =========================================================
   PARTY-TIME AMBIENCE — additive, progressive-enhancement only.
   Nothing above this line was changed. This block only ADDS a
   lightweight, GPU-cheap glitter layer (small absolutely-
   positioned spans with a CSS twinkle animation) behind the
   page content on every page. It safely no-ops if anything is
   missing, and respects prefers-reduced-motion.
   ========================================================= */
(function partyAmbience() {
  try {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    if (document.querySelector(".bg-sparkle-layer")) return;

    const layer = document.createElement("div");
    layer.className = "bg-sparkle-layer";
    layer.setAttribute("aria-hidden", "true");

    const count = window.innerWidth < 640 ? 16 : 28;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "bg-sparkle";
      s.style.left = (Math.random() * 100).toFixed(2) + "%";
      s.style.top = (Math.random() * 100).toFixed(2) + "%";
      const size = (Math.random() * 2.2 + 1.1).toFixed(2);
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.animationDuration = (Math.random() * 3 + 2.5).toFixed(2) + "s";
      s.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
      layer.appendChild(s);
    }
    document.body.appendChild(layer);
  } catch (e) {}
})();

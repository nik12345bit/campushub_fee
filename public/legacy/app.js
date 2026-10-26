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
    president: "Aditi Sharma",
    members: 245,
    about:
      "A community for students interested in programming, development and competitive coding — running weekly practice sessions and two flagship events a year.",
    events: ["TechFest Hackathon 2026", "Code Wars: Competitive Programming"],
  },
  {
    id: 2,
    name: "Cultural Committee",
    short: "CU",
    color: "#B85400",
    president: "Rohan Verma",
    members: 180,
    about:
      "Plans and runs the college's dance, drama and music events, from department-level showcases to the annual cultural fest.",
    events: ["Rhythm Nights: Cultural Fest"],
  },
  {
    id: 3,
    name: "Sports Club",
    short: "SP",
    color: "#167A55",
    president: "Meera Iyer",
    members: 310,
    about:
      "Organises inter-department tournaments across football, cricket, basketball and athletics throughout the year.",
    events: ["Campus Football Cup"],
  },
  {
    id: 4,
    name: "AI Club",
    short: "AI",
    color: "#2A6C9E",
    president: "Karan Mehta",
    members: 150,
    about:
      "Focused on applied machine learning — reading groups, workshops and a student research showcase each semester.",
    events: ["AI & ML Workshop"],
  },
  {
    id: 5,
    name: "Fine Arts Society",
    short: "FA",
    color: "#8A3A78",
    president: "Priya Nair",
    members: 95,
    about:
      "A space for painters, sketch artists and sculptors to exhibit work and run on-campus competitions.",
    events: ["Canvas & Chaos: Art Competition"],
  },
  {
    id: 6,
    name: "Music Club",
    short: "MU",
    color: "#C23D2C",
    president: "Yash Kapoor",
    members: 120,
    about:
      "Runs jam sessions, the open mic series and represents the college at inter-college music festivals.",
    events: ["Open Mic & Music Night"],
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
    c.type ||= "Student club";
    c.vicePresident ||= "Not assigned";
    c.assignedWork ||= "Organise activities and upcoming events.";
    c.events ||= [];
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
  if (club && !e.target.closest("button")) {
    openClub(Number(club.dataset.id));
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
    const searchable = `${card.dataset.name || ""} ${card.dataset.about || ""} ${card.dataset.president || ""}`.toLowerCase();
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
function ensureEnrollmentNumber(user = currentUser) {
  if (!user) return "";
  if (!user.enrollmentNo) {
    // Generate a unique student enrollment ID after email OTP verification.
    const year = new Date().getFullYear();
    const suffix = `${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
    user.enrollmentNo = `CC-${year}-${suffix}`;
    const savedUser = db.users.find((u) => u.email === user.email);
    if (savedUser) savedUser.enrollmentNo = user.enrollmentNo;
    saveDb();
  }
  return user.enrollmentNo;
}
function successBox(id) {
  const details = db.registrationDetails?.[currentUser.email]?.[id] || {};
  const enrollment = details.enrollment || currentUser.enrollmentNo || "Generated after email verification";
  return `<div class="success-box"><span style="color:var(--green-deep)">${icon("check", 20)}</span><div><div style="font-weight:700;font-size:14px;color:var(--green-deep)">You're registered</div><div style="font-size:13px;color:var(--ink-soft);margin-top:2px">Registration saved in this browser.</div><div style="font-size:13px;margin-top:8px"><strong>Enrollment number:</strong> <span>${esc(enrollment)}</span></div></div></div><button class="btn btn-ghost btn-block" style="margin-top:12px" data-action="cancel-registration" data-id="${id}">Cancel registration</button>`;
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
  area.innerHTML = `<form id="registration-form"><div class="form-grid"><div class="field"><label>Full name</label><input name="name" required value="${esc(currentUser.name)}"></div><div class="field"><label>Email</label><input id="reg-email" name="email" required type="email" value="${esc(currentUser.email)}"></div><div class="field"><label>Enrollment number (generated after OTP)</label><input id="reg-enrollment" name="enrollment" required readonly placeholder="Verify email to generate"></div><div class="field"><label>Phone</label><input name="phone" required pattern="[0-9]{10}"></div><div class="field"><label>Department</label><input name="department" required></div><div class="field"><label>Year</label><select name="year"><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select></div></div><div class="otp-box" id="otp-box"><button class="btn btn-ghost btn-sm" type="button" id="send-otp-btn">${icon("check", 14)} Send OTP to verify email</button><p class="otp-hint">Verify your email to automatically generate your enrollment number.</p></div><button class="btn btn-marigold btn-block" style="margin-top:16px" type="submit" id="confirm-reg-btn" disabled>Verify email to continue</button></form>`;
  let sentOtp = null;
  let emailVerified = false;
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
        emailVerified = true;
        const enrollmentNo = ensureEnrollmentNumber(currentUser);
        $("#reg-enrollment").value = enrollmentNo;
        $("#confirm-reg-btn").disabled = false;
        $("#confirm-reg-btn").textContent = "Confirm registration";
        $("#otp-box").innerHTML =
          `<p class="otp-hint" style="color:var(--green-deep)">${icon("check", 14)} Email verified — your enrollment number has been generated.</p><p class="otp-hint"><strong>Your enrollment number: ${esc(enrollmentNo)}</strong></p>`;
      } else {
        $("#otp-error").classList.remove("hidden");
      }
    });
  });
  $("#registration-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!emailVerified) {
      alert("Please verify your email with the OTP first.");
      return;
    }
    const details = Object.fromEntries(new FormData(e.currentTarget).entries());
    details.enrollment = ensureEnrollmentNumber(currentUser);
    registerForEvent(id, details);
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
function syncClubs() {
  db.clubs.forEach((club) => {
    $$(`.club-card[data-id="${club.id}"]`).forEach((card) => {
      card.dataset.members = club.members;
      const registrationStatus = getClubRegistrationStatus(club);
      card.classList.toggle("club-closed", registrationStatus.state !== "open");
      card.classList.toggle("club-open", registrationStatus.state === "open");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `View details for ${club.name}`);
      $(".club-meta", card) &&
        ($(".club-meta", card).textContent =
          `${club.members} members · President: ${club.president}`);
      let status = $(".club-status", card);
      if (!status) {
        card.insertAdjacentHTML(
          "afterbegin",
          '<span class="club-status"></span>',
        );
        status = $(".club-status", card);
      }
      status.textContent = registrationStatus.label;
    });
  });
  $$(".club-joined-badge").forEach((b) => b.classList.add("hidden"));
  joinedClubs.forEach((id) =>
    $$(`.club-card[data-id="${id}"] .club-joined-badge`).forEach((b) =>
      b.classList.remove("hidden"),
    ),
  );
  syncAdminClubs();
}
function getClubRegistrationStatus(club, now = new Date()) {
  if (club.joinOpen === false) return { state: "closed", label: "Joining closed by admin" };
  const start = club.registrationStart ? new Date(club.registrationStart) : null;
  const end = club.registrationDeadline ? new Date(club.registrationDeadline) : null;
  if (start && !Number.isNaN(start.getTime()) && now < start) return { state: "upcoming", label: `Registration opens ${start.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}` };
  if (end && !Number.isNaN(end.getTime()) && now > end) return { state: "closed", label: `Registration closed ${end.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}` };
  return { state: "open", label: end && !Number.isNaN(end.getTime()) ? `Registration closes ${end.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}` : "Registration open" };
}
function openClub(id) {
  const club = getClub(id);
  if (!club) return;
  const joined = joinedClubs.has(id), registrationStatus = getClubRegistrationStatus(club), closed = registrationStatus.state !== "open";
  openModal(
    `<div class="modal" style="position:relative"><button class="modal-close" data-modal-close>${icon("close", 16)}</button><div class="modal-head" style="display:flex;gap:14px;align-items:center"><div class="club-icon" style="background:${club.color}">${esc(club.short)}</div><div><h3 style="font-size:22px">${esc(club.name)}</h3><p style="font-size:13px;color:var(--muted);margin-top:4px">${esc(club.type)} · ${club.members} members · ${esc(registrationStatus.label)}</p></div></div><div class="modal-body"><div class="modal-section-label">Leadership</div><p class="modal-desc"><strong>President:</strong> ${esc(club.president)}<br><strong>Vice president:</strong> ${esc(club.vicePresident)}</p><div class="modal-section-label">About</div><p class="modal-desc">${esc(club.about)}</p><div class="modal-section-label">Assigned work</div><p class="modal-desc">${esc(club.assignedWork)}</p><div class="modal-section-label">Upcoming events</div>${club.events.map((n) => { const event = eventsCache.find((e) => e.title === n); return event ? `<button class="list-row club-event-link" data-action="open-event" data-id="${event.id}"><span class="list-row-title">${esc(n)}</span>${icon("arrow", 14)}</button>` : `<div class="list-row"><span class="list-row-title">${esc(n)}</span></div>`; }).join("") || '<p class="modal-desc">No upcoming events assigned.</p>'}${joined ? `<button class="btn btn-ghost btn-block" style="margin-top:18px" data-action="leave-club" data-id="${id}">Leave club</button>` : closed ? `<div class="registration-closed" style="margin-top:18px">${esc(registrationStatus.label)}</div>` : `<button class="btn btn-marigold btn-block" id="join-club-button" style="margin-top:18px" type="button">Join club</button>`}</div></div>`
  );
  $("#join-club-button")?.addEventListener("click", () => {
    const latestStatus = getClubRegistrationStatus(club);
    if (latestStatus.state !== "open") { alert(latestStatus.label); openClub(id); return; }
    const body = $(".modal .modal-body");
    if (!body) return;
    body.innerHTML = `<div class="modal-section-label">Club membership form</div><p class="modal-desc">Fill in your details and verify your email before joining ${esc(club.name)}.</p><form id="club-join-form" novalidate><div class="field"><label for="club-join-name">Full name</label><input id="club-join-name" name="name" value="${esc(currentUser?.name || "")}" required autocomplete="name"></div><div class="field"><label for="club-join-email">College email</label><input id="club-join-email" name="email" type="email" value="${esc(currentUser?.email || "")}" required autocomplete="email"></div><div class="field"><label for="club-join-phone">Phone number</label><input id="club-join-phone" name="phone" type="tel" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" placeholder="10-digit phone number" required></div><div class="field"><label for="club-join-roll">Roll / student ID</label><input id="club-join-roll" name="rollNo" value="${esc(currentUser?.rollNo || "")}" required></div><div class="form-grid"><div class="field"><label for="club-join-branch">Branch</label><select id="club-join-branch" name="branch" required><option value="">Select branch</option>${["CSE","CSE (AI & ML)","CSE (Cyber Security)","ECE","Mechanical","Civil","BCA","MCA"].map(b=>`<option ${currentUser?.branch===b?"selected":""}>${b}</option>`).join("")}</select></div><div class="field"><label for="club-join-semester">Semester</label><select id="club-join-semester" name="semester" required><option value="">Select semester</option>${[1,2,3,4,5,6,7,8].map(n=>`<option ${Number(currentUser?.semester)===n?"selected":""} value="${n}">Semester ${n}</option>`).join("")}</select></div><div class="field"><label for="club-join-year">Year</label><select id="club-join-year" name="year" required><option value="">Select year</option>${[1,2,3,4].map(n=>`<option ${Number(currentUser?.year)===n?"selected":""} value="${n}">${n}${n===1?"st":n===2?"nd":n===3?"rd":"th"} Year</option>`).join("")}</select></div></div><div class="field" id="club-otp-area"><button class="btn btn-ghost btn-block" type="button" id="club-send-otp">Send email OTP</button><small id="club-otp-hint" style="display:block;margin-top:8px;color:var(--muted)">Verify your email to complete membership.</small></div><div class="field hidden" id="club-otp-field"><label for="club-join-otp">Email OTP</label><input id="club-join-otp" name="otp" inputmode="numeric" maxlength="6" placeholder="Enter 6-digit OTP"><small id="club-demo-otp" style="display:block;margin-top:6px;color:var(--muted)"></small></div><button class="btn btn-marigold btn-block" type="submit" id="club-join-submit" disabled>Verify OTP & join club</button><button class="btn btn-ghost btn-block" type="button" id="club-form-back" style="margin-top:8px">Back to club details</button></form>`;
    let generatedOtp = "";
    const form = $("#club-join-form");
    const sendOtp = $("#club-send-otp");
    sendOtp?.addEventListener("click", () => {
      const email = form.elements.email.value.trim();
      if (!form.elements.name.value.trim() || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[0-9]{10}$/.test(form.elements.phone.value.trim()) || !form.elements.rollNo.value.trim() || !form.elements.branch.value || !form.elements.semester.value || !form.elements.year.value) {
        alert("Please complete all membership details and enter a valid email and 10-digit phone number first."); return;
      }
      generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
      $("#club-otp-field")?.classList.remove("hidden");
      $("#club-demo-otp").textContent = `Demo OTP: ${generatedOtp} (email delivery is not configured)`;
      $("#club-otp-hint").textContent = `OTP generated for ${email}.`;
      sendOtp.disabled = true; sendOtp.textContent = "OTP generated";
      $("#club-join-otp")?.focus();
    });
    $("#club-join-otp")?.addEventListener("input", (e) => {
      $("#club-join-submit").disabled = e.target.value.trim() !== generatedOtp || !generatedOtp;
    });
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!generatedOtp || form.elements.otp.value.trim() !== generatedOtp) { alert("Please enter the correct OTP first."); return; }
      const latestStatus = getClubRegistrationStatus(club);
      if (latestStatus.state !== "open") { alert(latestStatus.label); openClub(id); return; }
      if (joinedClubs.has(id)) { openClub(id); return; }
      const details = { name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), phone: form.elements.phone.value.trim(), rollNo: form.elements.rollNo.value.trim(), branch: form.elements.branch.value, semester: form.elements.semester.value, year: form.elements.year.value, verified: true, enrollmentNo: currentUser?.enrollmentNo || `CC${new Date().getFullYear()}${String(Date.now()).slice(-6)}` };
      db.membershipDetails ||= {};
      db.membershipDetails[currentUser.email] ||= {};
      db.membershipDetails[currentUser.email][id] = details;
      currentUser.enrollmentNo ||= details.enrollmentNo;
      joinedClubs.add(id); db.memberships[currentUser.email] = [...joinedClubs]; club.members++;
      addNotification(currentUser.email, { title: "Club joined", message: `You joined "${club.name}". Enrollment: ${details.enrollmentNo}`, refType: "club", refId: id });
      saveDb(); syncClubs(); updateDashboard(); updateNotifBadge();
      openModal(`<div class="modal" style="position:relative"><button class="modal-close" data-modal-close>${icon("close",16)}</button><div class="modal-section-label">Membership confirmed</div><h3 style="font-size:22px;margin:10px 0">You're in ${esc(club.name)}!</h3><p class="modal-desc">Your details have been saved and your email OTP verified.</p><div class="list-row"><span class="list-row-title">Enrollment number</span><strong>${esc(details.enrollmentNo)}</strong></div><div class="list-row"><span class="list-row-title">Club</span><strong>${esc(club.name)}</strong></div><button class="btn btn-marigold btn-block" data-modal-close style="margin-top:18px">Done</button></div>`);
    });
    $("#club-form-back")?.addEventListener("click", () => openClub(id));
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
            ? `<div class="list-row"><div><div class="list-row-title">${esc(e.title)}</div><div class="list-row-sub">${esc(e.date)} · ${esc(e.venue)}</div><div class="list-row-sub"><strong>Enrollment:</strong> ${esc(db.registrationDetails?.[currentUser.email]?.[id]?.enrollment || currentUser.enrollmentNo || "Not generated")}</div></div><button class="btn btn-ghost btn-sm" data-action="open-event" data-id="${id}">View</button></div>`
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
      `<div class="admin-table-wrap" style="margin-top:30px"><div class="panel-title" style="margin-bottom:14px">Club management <button class="btn btn-marigold btn-sm" data-action="create-club" type="button">Create club</button></div><form class="panel hidden" id="club-editor" style="margin-bottom:18px"><input name="clubId" type="hidden"><div class="panel-title"><span id="club-editor-title">Create club</span><button class="icon-action" id="close-club-editor" type="button">×</button></div><div class="form-grid"><div class="field"><label>Club name</label><input name="name" required></div><div class="field"><label>Club type</label><select name="type" required><option>Technical</option><option>Cultural</option><option>Sports</option><option>Academic</option><option>Arts</option><option>Social service</option></select></div><div class="field"><label>President</label><input name="president" required></div><div class="field"><label>Vice president</label><input name="vicePresident" required></div><div class="field"><label>Assigned work</label><textarea name="assignedWork" rows="3" required></textarea></div><div class="field"><label>About</label><textarea name="about" rows="3" required></textarea></div><div class="field"><label>Registration starts</label><input name="registrationStart" type="datetime-local"><small style="display:block;margin-top:6px;color:var(--muted)">Leave blank to allow joining immediately.</small></div><div class="field"><label>Registration ends</label><input name="registrationDeadline" type="datetime-local"><small style="display:block;margin-top:6px;color:var(--muted)">Leave blank for no automatic closing date.</small></div></div><button class="btn btn-primary" style="margin-top:16px" type="submit">Save club</button></form><table><thead><tr><th>Club</th><th>Type</th><th>President</th><th>Vice president</th><th>Assigned work</th><th>Actions</th></tr></thead><tbody id="admin-club-rows"></tbody></table></div>`,
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

function initClubAdmin() {
  const form = $("#club-editor");
  if (!form || form.dataset.ready) return;
  form.dataset.ready = "true";
  if (!form.elements.joinOpen)
    form.elements.about
      .closest(".field")
      .insertAdjacentHTML(
        "beforebegin",
        '<div class="field"><label>Club joining</label><select name="joinOpen"><option value="true">Open</option><option value="false">Closed</option></select></div>',
      );
  $("#close-club-editor")?.addEventListener("click", () =>
    form.classList.add("hidden"),
  );
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget,
      id = Number(f.clubId.value);
    if (f.registrationStart.value && f.registrationDeadline.value && f.registrationDeadline.value <= f.registrationStart.value) { alert("Registration end must be after the start date."); return; }
    const data = {
        name: f.name.value.trim(),
        type: f.type.value,
        president: f.president.value.trim(),
        vicePresident: f.vicePresident.value.trim(),
        assignedWork: f.assignedWork.value.trim(),
        about: f.about.value.trim(),
        registrationStart: f.registrationStart.value || "",
        registrationDeadline: f.registrationDeadline.value || "",
        joinOpen: f.joinOpen.value === "true",
      };
    if (id) {
      Object.assign(getClub(id), data);
    } else {
      db.clubs.push({
        id: Date.now(),
        short: data.name
          .split(/\s+/)
          .map((x) => x[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        color: "#423E85",
        members: 0,
        events: [],
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
  if (club)
    [
      "name",
      "type",
      "president",
      "vicePresident",
      "assignedWork",
      "about",
      "registrationStart",
      "registrationDeadline",
    ].forEach((k) => (form.elements[k].value = club[k] || ""));
  form.elements.joinOpen.value = String(club?.joinOpen !== false);
  form.classList.remove("hidden");
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}
function syncAdminClubs() {
  const body = $("#admin-club-rows");
  if (!body) return;
  body.innerHTML = db.clubs
    .map(
      (c) =>
        `<tr><td><strong>${esc(c.name)}</strong></td><td>${esc(c.type)}</td><td>${esc(c.president)}</td><td>${esc(c.vicePresident)}</td><td style="max-width:260px">${esc(c.assignedWork)}</td><td><div class="table-actions"><button class="icon-action" data-action="edit-club" data-id="${c.id}" aria-label="Edit club">${icon("edit", 14)}</button><button class="icon-action danger" data-action="delete-club" data-id="${c.id}" aria-label="Delete club">${icon("trash", 14)}</button></div></td></tr>`,
    )
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


/* Minimal persistent light/dark toggle; does not alter the original page layout. */
(function initCampusThemeToggle() {
  const key = "campus_connect_theme";
  const saved = (() => { try { return localStorage.getItem(key); } catch (_) { return null; } })();
  const apply = (theme) => {
    document.documentElement.dataset.campusTheme = theme;
    const btn = document.querySelector("[data-campus-theme-toggle]");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", btn.getAttribute("aria-label"));
    }
  };
  apply(saved === "dark" ? "dark" : "light");
  const nav = document.querySelector(".nav-right");
  if (nav && !nav.querySelector("[data-campus-theme-toggle]")) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "campus-theme-toggle";
    btn.setAttribute("data-campus-theme-toggle", "");
    btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.campusTheme === "dark" ? "light" : "dark";
      try { localStorage.setItem(key, next); } catch (_) {}
      apply(next);
    });
    nav.insertBefore(btn, nav.firstChild);
  }
  apply(saved === "dark" ? "dark" : "light");
})();

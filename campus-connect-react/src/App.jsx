import React, { useEffect } from "react";
import HomePage from "./pages/home.jsx";
import EventsPage from "./pages/events.jsx";
import ClubsPage from "./pages/clubs.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import AdminPage from "./pages/admin.jsx";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";

const routes = {
  "/": [HomePage, "home"],
  "/index.html": [HomePage, "home"],
  "/events": [EventsPage, "events"],
  "/events.html": [EventsPage, "events"],
  "/clubs": [ClubsPage, "clubs"],
  "/clubs.html": [ClubsPage, "clubs"],
  "/dashboard": [DashboardPage, "dashboard"],
  "/dashboard.html": [DashboardPage, "dashboard"],
  "/admin": [AdminPage, "admin"],
  "/admin.html": [AdminPage, "admin"],
  "/login": [LoginPage, "login"],
  "/login.html": [LoginPage, "login"],
  "/signup": [SignupPage, "signup"],
  "/signup.html": [SignupPage, "signup"],
};

function loadLegacyScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-legacy="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.legacy = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default function App() {
  const [Page, pageName] = routes[window.location.pathname] || routes["/"];
  useEffect(() => {
    document.body.dataset.page = pageName;
    document.title = `Campus — ${pageName === "home" ? "Your College, Connected." : pageName[0].toUpperCase() + pageName.slice(1)}`;
    let cancelled = false;
    (async () => {
      try {
        await loadLegacyScript("/legacy/app.js");
        if (!cancelled) await loadLegacyScript("/legacy/support-center.js");
      } catch (error) {
        console.error("Could not load existing Campus Connect interactions", error);
      }
    })();
    return () => { cancelled = true; };
  }, [pageName]);
  return <Page />;
}




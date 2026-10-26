import React, { useEffect, useMemo, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/home.jsx";
import EventsPage from "./pages/events.jsx";
import ClubsPage from "./pages/clubs.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import AdminPage from "./pages/admin.jsx";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";
import NotFound from "./components/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toast } from "./components/ReactUI.jsx";
import { useCampus } from "./context/CampusContext.jsx";
import useDocumentTitle from "./hooks/useDocumentTitle.js";
import { refreshEvents } from "./store/campusSlice.js";

function loadLegacyScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-legacy="${src}"]`)) return resolve();
    const script = document.createElement("script"); script.src = src; script.defer = true; script.dataset.legacy = src;
    script.onload = resolve; script.onerror = reject; document.body.appendChild(script);
  });
}
function RouteEffects() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { toast, dismissToast, theme, setTheme } = useCampus();
  const apiStatus = useSelector(state => state.campus.status);
  const title = useMemo(() => { const part = location.pathname.split("/").filter(Boolean).at(-1) || "home"; return `Campus — ${part.replace(/\.html$/, "").replace(/-/g, " ").replace(/^./, c => c.toUpperCase())}`; }, [location.pathname]);
  useDocumentTitle(title);
  const handleDismissToast = useCallback(() => dismissToast(), [dismissToast]);
  useEffect(() => { document.body.dataset.page = location.pathname.split("/").filter(Boolean).at(-1)?.replace(/\.html$/, "") || "home"; }, [location.pathname]);
  // Use the single existing theme control; do not inject a second toggle.
  useEffect(() => {
    const navRight = document.querySelector(".nav-right");
    if (!navRight) return;
    const handler = (event) => {
      const button = event.target.closest("[data-theme-toggle], .theme-toggle, .campus-theme-toggle");
      if (!button || !navRight.contains(button)) return;
      event.preventDefault();
      setTheme(theme === "dark" ? "light" : "dark");
    };
    navRight.addEventListener("click", handler);
    return () => navRight.removeEventListener("click", handler);
  }, [location.pathname, theme, setTheme]);
  useEffect(() => { dispatch(refreshEvents()); }, [dispatch]);
  useEffect(() => { let cancelled = false; (async () => { try { await loadLegacyScript("/legacy/app.js"); if (!cancelled) await loadLegacyScript("/legacy/support-center.js"); } catch (error) { console.error("Could not load existing Campus Connect interactions", error); window.campusReactNotify?.("Some legacy interactions could not load. Refresh and try again.", "error"); } })(); return () => { cancelled = true; }; }, []);
  return <div className="react-app-feedback" aria-live="polite"><Toast notice={toast} onDismiss={handleDismissToast} />{apiStatus === "failed" && <span className="sr-only" role="status">{`Events API: ${apiStatus}`}</span>}</div>;
}
function AppRoutes() {
 return <><RouteEffects /><Routes>
  <Route path="/" element={<HomePage />} /><Route path="/index.html" element={<Navigate to="/" replace />} />
  <Route path="/events" element={<EventsPage />} /><Route path="/events.html" element={<Navigate to="/events" replace />} /><Route path="/events/:eventId" element={<EventsPage />} />
  <Route path="/clubs" element={<ClubsPage />} /><Route path="/clubs.html" element={<Navigate to="/clubs" replace />} /><Route path="/clubs/:clubId" element={<ClubsPage />} />
  <Route path="/login" element={<LoginPage />} /><Route path="/login.html" element={<Navigate to="/login" replace />} />
  <Route path="/signup" element={<SignupPage />} /><Route path="/signup.html" element={<Navigate to="/signup" replace />} />
  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /><Route path="/dashboard.html" element={<Navigate to="/dashboard" replace />} />
  <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} /><Route path="/admin.html" element={<Navigate to="/admin" replace />} />
  <Route path="*" element={<NotFound />} />
 </Routes></>;
}
export default function App() { return <BrowserRouter><AppRoutes /></BrowserRouter>; }

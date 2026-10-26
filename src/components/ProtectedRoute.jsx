import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function hasCampusSession() {
  try { return Boolean(localStorage.getItem("campus_frontend_session_v3")); } catch { return false; }
}
export default function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();
  if (!hasCampusSession()) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (adminOnly) {
    try {
      const email = localStorage.getItem("campus_frontend_session_v3");
      const db = JSON.parse(localStorage.getItem("campus_frontend_db_v3") || "{}");
      const users = Array.isArray(db.users) ? db.users : Object.values(db.users || {});
      const user = users.find(item => item.email === email);
      if (user && user.role && !["admin", "administrator"].includes(String(user.role).toLowerCase())) return <Navigate to="/dashboard" replace />;
    } catch { return <Navigate to="/dashboard" replace />; }
  }
  return children;
}

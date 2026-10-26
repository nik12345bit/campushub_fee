import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CampusContext = createContext(null);
const STORAGE_KEY = "campus-react-ui-state-v1";

function readSavedState() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { theme: value.theme === "dark" ? "dark" : "light", notices: Array.isArray(value.notices) ? value.notices : [] };
  } catch {
    return { theme: "light", notices: [] };
  }
}

export function CampusProvider({ children }) {
  const [saved, setSaved] = useState(readSavedState);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch { /* storage can be disabled */ }
  }, [saved]);

  // Apply the selected theme to the document so the existing CSS can respond.
  useEffect(() => {
    document.documentElement.dataset.campusTheme = saved.theme;
    document.documentElement.style.colorScheme = saved.theme;
  }, [saved.theme]);

  const addNotice = useCallback((message, type = "info") => {
    const notice = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, message: String(message), type, createdAt: new Date().toISOString() };
    setSaved(current => ({ ...current, notices: [notice, ...current.notices].slice(0, 30) }));
    setToast(notice);
    window.setTimeout(() => setToast(current => current?.id === notice.id ? null : current), 3200);
  }, []);
  const dismissToast = useCallback(() => setToast(null), []);
  const setTheme = useCallback(theme => setSaved(current => ({ ...current, theme: theme === "dark" ? "dark" : "light" })), []);
  const value = useMemo(() => ({ theme: saved.theme, notices: saved.notices, toast, addNotice, dismissToast, setTheme }), [saved, toast, addNotice, dismissToast, setTheme]);

  useEffect(() => {
    // A tiny bridge lets existing legacy interactions surface accessible React toasts.
    window.campusReactNotify = addNotice;
    return () => { delete window.campusReactNotify; };
  }, [addNotice]);

  return <CampusContext.Provider value={value}>{children}</CampusContext.Provider>;
}

export function useCampus() {
  const context = useContext(CampusContext);
  if (!context) throw new Error("useCampus must be used inside CampusProvider");
  return context;
}

import { useCallback, useMemo, useState } from "react";
const SESSION_KEY = "campus_frontend_session_v3";
export default function useCampusAuth() { const [email, setEmail] = useState(() => { try { return localStorage.getItem(SESSION_KEY) || ""; } catch { return ""; } }); const signOut = useCallback(() => { try { localStorage.removeItem(SESSION_KEY); } catch {} setEmail(""); }, []); return useMemo(() => ({ email, isAuthenticated: Boolean(email), signOut }), [email, signOut]); }

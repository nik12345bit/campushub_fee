import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../services/api.js";
export default function useApi(path, options = {}, { enabled = true } = {}) {
 const [data, setData] = useState(null); const [loading, setLoading] = useState(Boolean(enabled)); const [error, setError] = useState(null); const [reloadKey, setReloadKey] = useState(0);
 const retry = useCallback(() => setReloadKey(key => key + 1), []);
 useEffect(() => { if (!enabled) { setLoading(false); return; } const controller = new AbortController(); setLoading(true); setError(null); apiRequest(path, { ...options, signal: controller.signal, retries: options.retries ?? 1 }).then(setData).catch(err => { if (!controller.signal.aborted) setError(err.message || "Something went wrong"); }).finally(() => { if (!controller.signal.aborted) setLoading(false); }); return () => controller.abort(); }, [path, enabled, reloadKey]);
 return { data, loading, error, retry, setData };
}

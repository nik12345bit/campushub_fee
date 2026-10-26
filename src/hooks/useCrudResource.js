import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../services/api.js";

/** Generic REST CRUD hook. Requires a compatible backend and a configured VITE_API_BASE_URL. */
export default function useCrudResource(resourcePath) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async (signal) => {
    setLoading(true); setError(null);
    try { const result = await apiRequest(resourcePath, { signal, retries: 1 }); setItems(Array.isArray(result) ? result : (result?.items || [])); return result; }
    catch (err) { if (!signal?.aborted) setError(err.message || "Unable to load data"); throw err; }
    finally { if (!signal?.aborted) setLoading(false); }
  }, [resourcePath]);

  useEffect(() => { const controller = new AbortController(); refresh(controller.signal).catch(() => {}); return () => controller.abort(); }, [refresh]);

  const mutate = useCallback(async (method, id, payload) => {
    setSaving(true); setError(null);
    try {
      const path = id == null ? resourcePath : `${resourcePath.replace(/\/$/, "")}/${encodeURIComponent(id)}`;
      const result = await apiRequest(path, { method, body: payload, retries: 0 });
      if (method === "POST" && result) setItems(current => [result, ...current]);
      if (method === "PUT" || method === "PATCH") setItems(current => current.map(item => String(item.id) === String(id) ? { ...item, ...(result || payload) } : item));
      if (method === "DELETE") setItems(current => current.filter(item => String(item.id) !== String(id)));
      return result;
    } catch (err) { setError(err.message || "Unable to save data"); throw err; }
    finally { setSaving(false); }
  }, [resourcePath]);

  return { items, setItems, loading, saving, error, refresh, create: payload => mutate("POST", null, payload), update: (id, payload) => mutate("PUT", id, payload), remove: id => mutate("DELETE", id) };
}

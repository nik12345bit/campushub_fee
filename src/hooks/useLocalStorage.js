import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored === null ? (typeof initialValue === "function" ? initialValue() : initialValue) : JSON.parse(stored);
    } catch { return typeof initialValue === "function" ? initialValue() : initialValue; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ } }, [key, value]);
  const remove = useCallback(() => { try { localStorage.removeItem(key); } catch { /* no-op */ } setValue(typeof initialValue === "function" ? initialValue() : initialValue); }, [key, initialValue]);
  return [value, setValue, remove];
}

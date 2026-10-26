import React, { useEffect, useRef, useState } from "react";

/** Reusable controlled field for React forms. */
export function FormField({ label, name, value, onChange, type = "text", error, required = false, ...props }) {
  const id = props.id || `field-${name}`;
  return <div className="field"><label htmlFor={id}>{label}{required ? " *" : ""}</label><input id={id} name={name} type={type} value={value ?? ""} onChange={onChange} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />{error && <small id={`${id}-error`} role="alert">{error}</small>}</div>;
}

/** Reusable modal with Escape handling and focus restoration. */
export function Modal({ open, title, onClose, children, className = "" }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKeyDown = event => { if (event.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); previous?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="modal-overlay" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose?.(); }}><section className={`modal ${className}`} role="dialog" aria-modal="true" aria-label={title}><button ref={closeRef} className="modal-close" type="button" onClick={onClose} aria-label="Close dialog">×</button><div className="modal-head"><h2>{title}</h2></div><div className="modal-body">{children}</div></section></div>;
}

/** Accessible reusable tabs; the selected tab is React state. */
export function Tabs({ items, initial = 0, onChange }) {
  const [active, setActive] = useState(initial);
  const select = index => { setActive(index); onChange?.(items[index], index); };
  return <div className="react-tabs"><div role="tablist" aria-label="Sections" className="chip-row">{items.map((item, index) => <button type="button" role="tab" aria-selected={active === index} className={`chip ${active === index ? "active" : ""}`} key={item.label} onClick={() => select(index)}>{item.label}</button>)}</div><div role="tabpanel" className="react-tab-panel">{items[active]?.content}</div></div>;
}

export function LoadingState({ label = "Loading…" }) { return <div className="empty-state" role="status" aria-live="polite">{label}</div>; }
export function EmptyState({ title = "Nothing here yet", message = "Try again later." }) { return <div className="empty-state"><h3>{title}</h3><p>{message}</p></div>; }
export function Toast({ notice, onDismiss }) {
  if (!notice) return null;
  return <div className={`react-toast react-toast-${notice.type || "info"}`} role="status" aria-live="polite"><span>{notice.message}</span><button type="button" onClick={onDismiss} aria-label="Dismiss notification">×</button></div>;
}

import React from "react";

export default function NotFound() {
  return <main className="section"><div className="wrap"><div className="panel" style={{ maxWidth: 640, margin: "70px auto", textAlign: "center", padding: 36 }}><p className="eyebrow">Page not found</p><h1 className="section-title" style={{ marginTop: 8 }}>That page isn't on campus.</h1><p style={{ margin: "14px 0 24px", color: "var(--ink-soft)" }}>The address may be incorrect or the page may have moved.</p><a className="btn btn-primary" href="/">Return home</a></div></div></main>;
}

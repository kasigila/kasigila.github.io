"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#education", label: "Education" },
  { href: "#work", label: "Work" },
  { href: "#leadership", label: "Leadership" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav({
  mode,
  onToggle,
}: {
  mode: "creative" | "recruiter";
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  const recruiter = mode === "recruiter";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="navbar">
      <a className="nav-logo" href="#top" onClick={() => setOpen(false)}>
        KMK
      </a>
      {open ? (
        <button
          className="nav-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div className="nav-actions">
        {recruiter ? null : (
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        )}
        {recruiter ? null : (
          <ul className={`nav-links${open ? " open" : ""}`}>
            <li className="nav-drawer-close">
              <button type="button" onClick={() => setOpen(false)}>
                Close
              </button>
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <button
          className="nav-mode-btn"
          type="button"
          aria-pressed={recruiter}
          onClick={() => {
            setOpen(false);
            onToggle();
          }}
        >
          {recruiter ? "Creative Mode" : "Recruiter Mode"}
        </button>
      </div>
    </header>
  );
}

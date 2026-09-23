"use client";

import { useEffect, useRef } from "react";

export function SiteEffects() {
  const bar = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (bar.current) bar.current.style.width = `${pct}%`;
    };

    const onMove = (event: MouseEvent) => {
      if (!glow.current) return;
      glow.current.style.opacity = "1";
      glow.current.style.left = `${event.clientX}px`;
      glow.current.style.top = `${event.clientY}px`;
    };

    const onLeave = () => {
      if (glow.current) glow.current.style.opacity = "0";
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={bar} aria-hidden />
      <div className="cursor-glow" ref={glow} aria-hidden />
      <div className="particles" aria-hidden>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </>
  );
}

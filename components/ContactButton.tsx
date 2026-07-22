"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ContactButton() {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return <>
    <button className="contact-trigger" type="button" onClick={() => setOpen(true)} aria-expanded={open}>
      Contact <span aria-hidden="true">↗</span>
    </button>
    {open && createPortal(
      <div className="contact-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <section className="contact-panel" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <button ref={closeButton} className="contact-close" type="button" onClick={() => setOpen(false)} aria-label="Close contact details">×</button>
          <p>Contact</p>
          <h2 id="contact-title">Tristan<br/><em>Massicotte</em></h2>
          <div className="contact-list">
            <a href="mailto:tristanmassicotte@me.com"><span>Email</span><strong>tristanmassicotte@me.com</strong><i aria-hidden="true">↗</i></a>
            <a href="tel:+15819809117"><span>Phone</span><strong>+1 581 980 9117</strong><i aria-hidden="true">↗</i></a>
            <a href="https://www.linkedin.com/in/tristan-massicotte/" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>View profile</strong><i aria-hidden="true">↗</i></a>
          </div>
        </section>
      </div>,
      document.body,
    )}
  </>;
}

import React, { useState } from 'react';
import './DealUpsellPopup.css';

export default function DealUpsellPopup() {
  const [dismissed, setDismissed] = useState(false);
  const [activated, setActivated] = useState(false);

  return (
    <div className="dup-root">
      {/* ── Background: frozen core platform screenshot ── */}
      <img
        src="/core-dashboard.png"
        alt="Northspyre core platform"
        className="dup-bg"
      />

      {/* ── Overlay + Modal ── */}
      {!dismissed && !activated && (
        <div className="dup-overlay">
          <div className="dup-modal">

            {/* Close */}
            <button className="dup-close" onClick={() => setDismissed(true)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Badge */}
            <div className="dup-badge">NEW</div>

            {/* Logo area */}
            <div className="dup-logo-row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#0fb3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="dup-logo-text">Northspyre <span className="dup-logo-deal">Deal</span></span>
            </div>

            {/* Headline */}
            <h2 className="dup-headline">
              Model your next deal<br />before it breaks ground
            </h2>

            {/* Sub-copy */}
            <p className="dup-sub">
              Northspyre Deal is now available to your organization. Run pro formas, track your acquisition pipeline, and analyze returns — without leaving Northspyre.
            </p>

            {/* Feature list */}
            <ul className="dup-features">
              <li>
                <span className="dup-check">✓</span>
                Pro forma models for multifamily, mixed-use, and more
              </li>
              <li>
                <span className="dup-check">✓</span>
                Acquisition pipeline across your full portfolio
              </li>
              <li>
                <span className="dup-check">✓</span>
                IRR, equity multiple, and returns at a glance
              </li>
            </ul>

            {/* CTA */}
            <button className="dup-cta" onClick={() => setActivated(true)}>
              Try Deal Free
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 8 }}>
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Secondary */}
            <button className="dup-dismiss" onClick={() => setDismissed(true)}>
              Remind me later
            </button>

          </div>
        </div>
      )}

      {/* ── Activated state ── */}
      {activated && (
        <div className="dup-overlay">
          <div className="dup-modal dup-modal-success">
            <div className="dup-success-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="#0fb3ff" strokeWidth="2"/>
                <path d="M9 16l5 5 9-9" stroke="#0fb3ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="dup-headline" style={{ marginTop: 16 }}>You're on your way</h2>
            <p className="dup-sub">Check your email — we've sent a link to activate your Northspyre Deal account.</p>
            <button className="dup-cta" onClick={() => setActivated(false)}>Back to Northspyre</button>
          </div>
        </div>
      )}

      {/* ── Dismissed state: show subtle banner ── */}
      {dismissed && (
        <div className="dup-banner">
          <span>Want to model deals in Northspyre?</span>
          <button className="dup-banner-cta" onClick={() => setDismissed(false)}>
            Learn about Deal
          </button>
          <button className="dup-banner-close" onClick={() => {}}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

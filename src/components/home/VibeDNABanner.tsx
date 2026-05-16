'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibeProfile } from '@/hooks/useVibeProfile';
import { VIBE_TYPES } from '@/data/quiz';

const DISMISSED_KEY = 'dj_dismissed_welcome';

export default function VibeDNABanner() {
  const { profile, hydrated } = useVibeProfile();
  const [dismissed, setDismissed] = useState(false);
  const [dismissHydrated, setDismissHydrated] = useState(false);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(DISMISSED_KEY) === 'true');
    } catch {}
    setDismissHydrated(true);
  }, []);

  const handleExploreFirst = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED_KEY, 'true');
    } catch {}
  };

  // Skeleton while hydrating
  if (!hydrated || !dismissHydrated) {
    return (
      <div className="section-px" style={{ marginBottom: 20 }} aria-hidden="true">
        <div
          style={{
            height: 52,
            borderRadius: 'var(--dj-radius-lg)',
            background: 'var(--dj-card)',
            opacity: 0.4,
          }}
        />
      </div>
    );
  }

  // ── Profile exists: DNA Active banner ──────────────────────────────────────
  if (profile) {

  return (
    <div className="section-px" style={{ marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '11px 14px',
          borderRadius: 'var(--dj-radius-lg)',
          background: `linear-gradient(135deg, ${vibe.gradientFrom}10 0%, ${vibe.gradientTo}08 100%)`,
          border: `1px solid ${vibe.gradientFrom}28`,
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Left: emoji + vibe label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>{vibe.emoji}</span>
          <div>
            <p
              className="font-display"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--dj-text)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              {vibe.label}
            </p>
            <p style={{ fontSize: 11, color: 'var(--dj-text-secondary)' }}>
              Recs matched to your DNA
            </p>
          </div>
        </div>

        {/* Right: active pill + retake */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 10px',
              borderRadius: 'var(--dj-radius-full)',
              background: `${vibe.color}18`,
              border: `1px solid ${vibe.color}35`,
              fontSize: 11,
              fontWeight: 700,
              color: vibe.color,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: vibe.color,
                flexShrink: 0,
              }}
            />
            Active
          </span>
          <Link
            href="/onboarding"
            aria-label="Retake the Vibe DNA quiz"
            style={{
              fontSize: 11,
              color: 'var(--dj-muted)',
              textDecoration: 'none',
            }}
          >
            Retake
          </Link>
        </div>
      </div>
    </div>
  );
}

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
    const vibe = VIBE_TYPES[profile.vibeTypeId];
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
              style={{ fontSize: 11, color: 'var(--dj-muted)', textDecoration: 'none' }}
            >
              Retake
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── No profile + dismissed: compact reminder pill ──────────────────────────
  if (dismissed) {
    return (
      <div className="section-px" style={{ marginBottom: 20 }}>
        <Link
          href="/onboarding"
          aria-label="Take the Vibe DNA quiz"
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '11px 16px',
              borderRadius: 'var(--dj-radius-lg)',
              border: '1px dashed rgba(155,93,229,0.3)',
              background: 'rgba(155,93,229,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🧬</span>
              <span
                className="font-display"
                style={{ fontSize: 13, fontWeight: 600, color: 'var(--dj-text)' }}
              >
                Build Your Vibe DNA
              </span>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                background: 'var(--dj-gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Start →
            </span>
          </div>
        </Link>
      </div>
    );
  }

  // ── No profile + not dismissed: full premium welcome card ──────────────────
  return (
    <AnimatePresence>
      <motion.div
        className="section-px"
        style={{ marginBottom: 24 }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12, scale: 0.97 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '22px 20px 20px',
            borderRadius: 'var(--dj-radius-xl)',
            background:
              'linear-gradient(145deg, rgba(155,93,229,0.1) 0%, rgba(247,37,133,0.06) 60%, rgba(0,0,0,0) 100%)',
            border: '1px solid rgba(155,93,229,0.22)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Background glow orb */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(155,93,229,0.18) 0%, transparent 70%)',
              filter: 'blur(24px)',
              pointerEvents: 'none',
            }}
          />

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', damping: 16, stiffness: 300 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 'var(--dj-radius-md)',
              background:
                'linear-gradient(135deg, rgba(155,93,229,0.28), rgba(247,37,133,0.18))',
              border: '1px solid rgba(155,93,229,0.3)',
              fontSize: 24,
              marginBottom: 14,
              position: 'relative',
              zIndex: 1,
            }}
          >
            🧬
          </motion.div>

          {/* Headline */}
          <h2
            className="font-display"
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: 'var(--dj-text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 10,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Disco Jump learns your vibe.
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: 13,
              color: 'var(--dj-text-secondary)',
              lineHeight: 1.65,
              marginBottom: 20,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Answer 5 quick questions — your taste in food, atmosphere, and nights out. We&apos;ll
            match you with places that actually fit how you move through the world.
          </p>

          {/* Primary CTA */}
          <Link
            href="/onboarding"
            aria-label="Start the Vibe DNA quiz"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '14px',
              borderRadius: 'var(--dj-radius-lg)',
              background: 'var(--dj-gradient-primary)',
              color: 'white',
              fontSize: 15,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(155,93,229,0.32)',
              marginBottom: 12,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Start Vibe Quiz ✦
          </Link>

          {/* Secondary CTA */}
          <button
            onClick={handleExploreFirst}
            aria-label="Skip onboarding and explore first"
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              background: 'none',
              border: 'none',
              color: 'var(--dj-muted)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.01em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Explore First →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

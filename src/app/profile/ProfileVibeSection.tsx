'use client';

import Link from 'next/link';
import { useVibeProfile } from '@/hooks/useVibeProfile';
import { VIBE_TYPES } from '@/data/quiz';

export default function ProfileVibeSection() {
  const { profile, hydrated, clearProfile } = useVibeProfile();

  // Loading skeleton
  if (!hydrated) {
    return (
      <div className="section-px" style={{ marginBottom: 28 }}>
        <div
          className="glass-card"
          style={{
            height: 120,
            borderRadius: 'var(--dj-radius-lg)',
            opacity: 0.35,
          }}
        />
      </div>
    );
  }

  // ── CTA: quiz not taken ──────────────────────────────────────────────────────
  if (!profile) {
    return (
      <div className="section-px" style={{ marginBottom: 28 }}>
        <div
          id="vibe-quiz-cta"
          className="glass-card"
          style={{
            padding: '20px',
            background: 'rgba(155,93,229,0.05)',
            borderColor: 'rgba(155,93,229,0.18)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow orb */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 140,
              height: 140,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(155,93,229,0.2) 0%, transparent 70%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />

          {/* Header row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              marginBottom: 14,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--dj-radius-md)',
                background:
                  'linear-gradient(135deg, rgba(155,93,229,0.25), rgba(247,37,133,0.18))',
                border: '1px solid rgba(155,93,229,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              🧬
            </div>
            <div>
              <p
                className="font-display"
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--dj-text)',
                  marginBottom: 3,
                }}
              >
                Discover Your Vibe DNA
              </p>
              <p style={{ fontSize: 12, color: 'var(--dj-text-secondary)', lineHeight: 1.4 }}>
                5 questions · unlocks personalized recommendations
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: 13,
              color: 'var(--dj-text-secondary)',
              lineHeight: 1.6,
              marginBottom: 16,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Tell us how you move through the world and we&apos;ll match you with
            places that actually fit your vibe.
          </p>

          <Link
            href="/onboarding"
            aria-label="Take the Vibe DNA quiz"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '13px',
              borderRadius: 'var(--dj-radius-lg)',
              background: 'var(--dj-gradient-primary)',
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(155,93,229,0.3)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Take the Quiz ✦
          </Link>
        </div>
      </div>
    );
  }

  // ── Completed: show vibe type ────────────────────────────────────────────────
  const vibe = VIBE_TYPES[profile.vibeTypeId];

  return (
    <div className="section-px" style={{ marginBottom: 28 }}>
      <div
        id="vibe-summary-card"
        className="glass-card"
        style={{
          padding: '18px 18px 16px',
          background: `${vibe.gradientFrom}08`,
          borderColor: `${vibe.gradientFrom}28`,
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <span
            className="font-display"
            style={{ fontSize: 14, fontWeight: 700, color: 'var(--dj-text)' }}
          >
            ✨ Your Vibe DNA
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              href="/vibe"
              aria-label="View your full Vibe DNA"
              style={{
                fontSize: 12,
                fontWeight: 600,
                background: 'var(--dj-gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textDecoration: 'none',
              }}
            >
              Full DNA →
            </Link>
          </div>
        </div>

        {/* Vibe type display */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 14px',
            borderRadius: 'var(--dj-radius-md)',
            background: `${vibe.gradientFrom}10`,
            border: `1px solid ${vibe.gradientFrom}28`,
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>{vibe.emoji}</span>
          <div style={{ minWidth: 0 }}>
            <p
              className="font-display"
              style={{
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: `linear-gradient(135deg, ${vibe.gradientFrom}, ${vibe.gradientTo})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 2,
              }}
            >
              {vibe.label}
            </p>
            <p
              style={{
                fontSize: 12,
                color: 'var(--dj-text-secondary)',
                fontStyle: 'italic',
                lineHeight: 1.3,
              }}
            >
              &ldquo;{vibe.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Traits */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {vibe.traits.map((trait) => (
            <span
              key={trait}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '5px 11px',
                borderRadius: 'var(--dj-radius-full)',
                background: `${vibe.color}18`,
                border: `1px solid ${vibe.color}35`,
                fontSize: 11,
                fontWeight: 600,
                color: vibe.color,
              }}
            >
              ✦ {trait}
            </span>
          ))}
        </div>

        {/* Retake link */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 11, color: 'var(--dj-muted)' }}>
            Completed{' '}
            {new Date(profile.completedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <button
            onClick={clearProfile}
            aria-label="Retake the Vibe DNA quiz"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--dj-muted)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

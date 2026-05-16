import type { Metadata } from 'next';
import AppShell from '@/components/layout/AppShell';
import DNAStat from '@/components/ui/DNAStat';
import SectionHeader from '@/components/ui/SectionHeader';
import { vibeDNATraits } from '@/data/vibeDNA';

export const metadata: Metadata = {
  title: 'Vibe DNA — Disco Jump',
  description: 'Explore your personal Vibe DNA — the personality profile that powers your Disco Jump recommendations.',
};

export default function VibeDNAPage() {
  const topTrait = vibeDNATraits.reduce((a, b) => (a.percentage > b.percentage ? a : b));

  return (
    <AppShell activeTab="vibe">
      <div style={{ paddingTop: 56 }}>
        {/* Header card */}
        <div
          className="section-px"
          style={{ marginBottom: 32 }}
        >
          {/* Avatar + identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div
              id="vibe-avatar"
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--dj-gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                fontWeight: 800,
                color: 'white',
                fontFamily: 'var(--font-display)',
                boxShadow: 'var(--dj-shadow-glow-purple)',
                flexShrink: 0,
              }}
            >
              Y
            </div>
            <div>
              <h1
                className="font-display"
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: 'var(--dj-text)',
                  letterSpacing: '-0.03em',
                  marginBottom: 4,
                }}
              >
                Your Vibe DNA
              </h1>
              <p style={{ fontSize: 13, color: 'var(--dj-text-secondary)' }}>
                6 traits · Last updated today
              </p>
            </div>
          </div>

          {/* DNA summary card */}
          <div
            className="glass-card"
            style={{
              padding: '16px 18px',
              borderColor: 'rgba(155,93,229,0.2)',
              background: 'rgba(155,93,229,0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>{topTrait.icon}</span>
              <span
                className="font-display"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--dj-purple-light)',
                }}
              >
                Dominant Trait: {topTrait.trait}
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--dj-text-secondary)', lineHeight: 1.5 }}>
              {topTrait.description}
            </p>
          </div>
        </div>

        {/* DNA Stats row */}
        <SectionHeader
          title="Your Trait Breakdown"
          subtitle="Based on your activity and preferences"
          id="dna-traits-header"
        />
        <div
          style={{
            paddingLeft: 24,
            paddingRight: 8,
            overflowX: 'auto',
            display: 'flex',
            gap: 16,
            marginBottom: 36,
            paddingBottom: 4,
            scrollbarWidth: 'none',
          }}
        >
          {vibeDNATraits.map((trait, i) => (
            <DNAStat key={trait.id} trait={trait} animationDelay={i * 100} />
          ))}
        </div>

        {/* Trait detail list */}
        <SectionHeader title="Trait Details" id="dna-trait-details" />
        <div
          className="section-px"
          style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}
        >
          {vibeDNATraits.map((trait) => (
            <div
              key={trait.id}
              id={`trait-detail-${trait.id}`}
              className="glass-card"
              style={{ padding: '14px 16px' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{trait.icon}</span>
                  <span
                    className="font-display"
                    style={{ fontSize: 15, fontWeight: 700, color: 'var(--dj-text)' }}
                  >
                    {trait.trait}
                  </span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: trait.color }}>
                  {trait.percentage}%
                </span>
              </div>
              {/* Bar */}
              <div
                style={{
                  height: 5,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.07)',
                  overflow: 'hidden',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${trait.percentage}%`,
                    borderRadius: 3,
                    background: trait.color,
                    boxShadow: `0 0 8px ${trait.color}80`,
                  }}
                />
              </div>
              <p style={{ fontSize: 12, color: 'var(--dj-text-secondary)', lineHeight: 1.5 }}>
                {trait.description}
              </p>
            </div>
          ))}
        </div>

        {/* Retake CTA */}
        <div className="section-px" style={{ marginBottom: 16 }}>
          <button
            id="retake-quiz-btn"
            aria-label="Retake your Vibe DNA quiz"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 'var(--dj-radius-xl)',
              border: '1.5px solid var(--dj-border)',
              background: 'var(--dj-card)',
              color: 'var(--dj-text)',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span>🔄</span>
            Retake Vibe Quiz
          </button>
        </div>
      </div>
    </AppShell>
  );
}

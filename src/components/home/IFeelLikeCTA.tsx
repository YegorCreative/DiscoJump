'use client';

interface IFeelLikeCTAProps {
  onOpen?: () => void;
}

export default function IFeelLikeCTA({ onOpen }: IFeelLikeCTAProps) {
  return (
    <div
      id="i-feel-like-cta"
      className="section-px"
      style={{ marginTop: 28, marginBottom: 28 }}
    >
      <button
        id="cta-i-feel-like"
        aria-label="I Feel Like... - Start vibe matching"
        className="btn-gradient"
        onClick={onOpen}
        style={{
          width: '100%',
          padding: '18px 24px',
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 'var(--dj-radius-xl)',
          boxShadow: '0 8px 40px rgba(155,93,229,0.35), 0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div
            className="font-display"
            style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            I Feel Like…
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 400,
              opacity: 0.8,
              marginTop: 3,
              letterSpacing: '0.01em',
            }}
          >
            Tell us your vibe right now
          </div>
        </div>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 22,
          }}
        >
          ✦
        </div>
      </button>

      <p
        style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--dj-muted)',
          marginTop: 10,
          letterSpacing: '0.02em',
        }}
      >
        Powered by your Vibe DNA • Updates in real-time
      </p>
    </div>
  );
}

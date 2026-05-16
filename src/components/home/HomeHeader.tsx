'use client';

export default function HomeHeader() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <header
      id="home-header"
      className="section-px"
      style={{ paddingTop: 56, paddingBottom: 8 }}
    >
      {/* Greeting */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--dj-text-secondary)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        {greeting} ✦
      </p>

      {/* App wordmark */}
      <div style={{ marginBottom: 10 }}>
        <h1
          className="font-display text-gradient-primary"
          style={{
            fontSize: 38,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          Disco Jump
        </h1>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: 15,
          color: 'var(--dj-text-secondary)',
          fontWeight: 400,
          letterSpacing: '0.01em',
        }}
      >
        Match your vibe anywhere.
      </p>

      {/* Location chip */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginTop: 14,
          padding: '7px 14px',
          borderRadius: 'var(--dj-radius-full)',
          background: 'var(--dj-card)',
          border: '1px solid var(--dj-border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span style={{ fontSize: 14 }}>📍</span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--dj-text)',
          }}
        >
          New York City
        </span>
        <span style={{ fontSize: 10, color: 'var(--dj-muted)' }}>▼</span>
      </div>
    </header>
  );
}

import Link from 'next/link';

export default function PlaceNotFound() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--dj-surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
        textAlign: 'center',
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: 56,
          marginBottom: 20,
          filter: 'grayscale(0.2)',
        }}
      >
        🔍
      </div>

      {/* Heading */}
      <h1
        className="font-display"
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: 'var(--dj-text)',
          letterSpacing: '-0.03em',
          marginBottom: 10,
        }}
      >
        Place not found
      </h1>

      {/* Sub-text */}
      <p
        style={{
          fontSize: 15,
          color: 'var(--dj-text-secondary)',
          lineHeight: 1.5,
          marginBottom: 28,
          maxWidth: 280,
        }}
      >
        This spot might have moved, or it just hasn't been added to your Vibe DNA yet.
      </p>

      {/* CTA */}
      <Link
        href="/discover"
        id="not-found-discover-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 28px',
          borderRadius: 'var(--dj-radius-full)',
          background: 'var(--dj-gradient-primary)',
          color: 'white',
          textDecoration: 'none',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          boxShadow: '0 6px 28px rgba(155,93,229,0.3)',
        }}
      >
        Discover places →
      </Link>

      <Link
        href="/"
        style={{
          marginTop: 16,
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--dj-muted)',
          textDecoration: 'none',
        }}
      >
        ← Back to home
      </Link>
    </div>
  );
}

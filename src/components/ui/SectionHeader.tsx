'use client';

import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  id?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  id,
}: SectionHeaderProps) {
  return (
    <div
      id={id}
      className="section-px"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
    >
      <div>
        <h2
          className="font-display"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--dj-text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 13,
              color: 'var(--dj-text-secondary)',
              marginTop: 2,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          style={{
            fontSize: 13,
            fontWeight: 600,
            background: 'var(--dj-gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          {ctaLabel} →
        </Link>
      )}
    </div>
  );
}

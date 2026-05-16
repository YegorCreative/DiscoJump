'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Place } from '@/types';
import SaveButton from './SaveButton';

interface VibeCardProps {
  place: Place;
  size?: 'large' | 'medium';
}

export default function VibeCard({ place, size = 'large' }: VibeCardProps) {
  const isLarge = size === 'large';

  return (
    <Link
      href={`/place/${place.id}`}
      aria-label={`View details for ${place.name}`}
      style={{ textDecoration: 'none', flexShrink: 0, display: 'block' }}
    >
    <article
      id={`vibe-card-${place.id}`}
      style={{
        position: 'relative',
        width: isLarge ? 280 : 220,
        height: isLarge ? 340 : 260,
        borderRadius: 'var(--dj-radius-xl)',
        overflow: 'hidden',
        flexShrink: 0,
        cursor: 'pointer',
        border: '1px solid var(--dj-border)',
        boxShadow: 'var(--dj-shadow-lg)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(155,93,229,0.25)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--dj-shadow-lg)';
      }}
    >
      {/* Background image */}
      <Image
        src={place.imageUrl}
        alt={place.name}
        fill
        sizes={isLarge ? '280px' : '220px'}
        style={{ objectFit: 'cover' }}
      />

      {/* Full gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(9,9,9,0.95) 0%, rgba(9,9,9,0.3) 50%, transparent 100%)',
        }}
      />

      {/* Top row badges */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          right: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Hidden gem badge */}
        {place.isHiddenGem && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--dj-cyan)',
              background: 'rgba(0,245,255,0.15)',
              border: '1px solid rgba(0,245,255,0.3)',
              borderRadius: 'var(--dj-radius-full)',
              padding: '4px 10px',
              backdropFilter: 'blur(8px)',
            }}
          >
            💎 Hidden Gem
          </span>
        )}
        {!place.isHiddenGem && <div />}

        {/* Vibe match */}
        <div className="vibe-badge">✦ {place.vibeMatch}%</div>
      </div>

      {/* Bottom content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: isLarge ? '20px 16px 18px' : '16px 14px 14px',
        }}
      >
        {/* Category chip */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            marginBottom: 8,
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--dj-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {place.categoryEmoji} {place.category}
        </div>

        {/* Title */}
        <h3
          className="font-display"
          style={{
            fontSize: isLarge ? 22 : 17,
            fontWeight: 800,
            color: 'var(--dj-text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          {place.name}
        </h3>

        {/* Location + distance row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--dj-text-secondary)' }}>
            📍 {place.location}
          </span>
          <span style={{ fontSize: 12, color: 'var(--dj-muted)' }}>
            {place.distance}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {place.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--dj-text-secondary)',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '3px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Save button — bottom-right corner */}
      <SaveButton placeId={place.id} size="sm" stopPropagation={true} />
    </article>
    </Link>
  );
}

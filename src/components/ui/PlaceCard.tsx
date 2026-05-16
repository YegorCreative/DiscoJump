'use client';

import Image from 'next/image';
import { Place } from '@/types';

interface PlaceCardProps {
  place: Place;
}

const priceSymbols = (level: number) =>
  ['$', '$', '$', '$'].map((s, i) => (
    <span key={i} style={{ opacity: i < level ? 1 : 0.2, color: 'var(--dj-orange)' }}>
      {s}
    </span>
  ));

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article
      id={`place-card-${place.id}`}
      className="glass-card"
      style={{
        width: 200,
        flexShrink: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: 'var(--dj-radius-lg)',
        position: 'relative',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 130, overflow: 'hidden' }}>
        <Image
          src={place.imageUrl}
          alt={place.name}
          fill
          sizes="200px"
          style={{ objectFit: 'cover' }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(9,9,9,0.8) 0%, transparent 60%)',
          }}
        />
        {/* Vibe match badge */}
        <div
          className="vibe-badge"
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          ✦ {place.vibeMatch}%
        </div>
        {/* Category emoji */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 10,
            fontSize: 18,
          }}
        >
          {place.categoryEmoji}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '10px 12px 12px' }}>
        <h3
          className="font-display"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--dj-text)',
            letterSpacing: '-0.01em',
            marginBottom: 4,
            lineHeight: 1.2,
          }}
        >
          {place.name}
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--dj-text-secondary)' }}>
            📍 {place.distance}
          </span>
          <span style={{ fontSize: 11 }}>{priceSymbols(place.priceLevel)}</span>
        </div>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {place.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: 'var(--dj-text-secondary)',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 4,
                padding: '2px 6px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

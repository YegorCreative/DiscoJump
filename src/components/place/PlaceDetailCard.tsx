'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Place } from '@/types';
import SaveButton from '@/components/ui/SaveButton';

interface PlaceDetailCardProps {
  place: Place;
}

const PRICE_LABELS = ['', 'Budget-friendly', 'Mid-range', 'Upscale', 'Luxury'];

// Derive "Why it matches" from tags + category
function getWhyItMatches(place: Place): string[] {
  const reasons: string[] = [];
  if (['Nightclub', 'Beach Club', 'Rooftop Bar'].includes(place.category)) {
    reasons.push('Feeds your Night Owl trait — you peak after midnight');
  }
  if (place.isHiddenGem) {
    reasons.push('Your Hidden Gem Hunter instinct will love this under-the-radar spot');
  }
  if (['Art + Bar', 'Jazz Bar', 'Bookshop Bar'].includes(place.category)) {
    reasons.push('Matches your Culture Seeker DNA — art + atmosphere in one');
  }
  if (place.tags.includes('Cocktails') || place.tags.includes('Wine')) {
    reasons.push('Your Vibe Curator score rewards places with intentional drink programs');
  }
  if (place.priceLevel >= 3) {
    reasons.push('Scores high on your Luxury energy preference');
  }
  if (place.tags.includes('Late Night') || place.tags.includes('Electronic')) {
    reasons.push('Electric energy aligns with your top mood DNA this week');
  }
  // Always have at least 2
  if (reasons.length < 2) {
    reasons.push(`${place.vibeMatch}% overall vibe compatibility — rare for a first visit`);
  }
  return reasons.slice(0, 3);
}

// Derive "Best for" from tags + category
function getBestFor(place: Place): string[] {
  const map: Record<string, string[]> = {
    Nightclub: ['Late night dancing', 'Group nights out', 'Electric vibes'],
    'Rooftop Bar': ['Date nights', 'Sunset cocktails', 'Special occasions'],
    'Jazz Bar': ['Intimate dates', 'Solo exploration', 'Winding down'],
    Restaurant: ['Foodie dates', 'Group dinners', 'Weekend indulging'],
    Coffee: ['Remote work', 'Slow mornings', 'First dates'],
    'Art + Bar': ['Creative nights', 'First dates', 'Artsy conversations'],
    'Bookshop Bar': ['Quiet evenings', 'Romantic nights', 'Solo visits'],
    'Beach Club': ['Daytime parties', 'Summer vibes', 'Group getaways'],
  };
  return map[place.category] ?? ['Exploring', 'Memorable evenings', 'New experiences'];
}

export default function PlaceDetailCard({ place }: PlaceDetailCardProps) {
  const whyItMatches = getWhyItMatches(place);
  const bestFor = getBestFor(place);
  const priceLabel = PRICE_LABELS[place.priceLevel];

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        margin: '-32px 16px 0',
        position: 'relative',
        zIndex: 10,
        paddingBottom: 32,
      }}
    >
      {/* ── Main glass card ── */}
      <div
        className="glass-card"
        style={{
          padding: '22px 20px 24px',
          borderColor: 'rgba(155,93,229,0.18)',
        }}
      >
        {/* Title row */}
        <div style={{ marginBottom: 14 }}>
          <h1
            className="font-display"
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: 'var(--dj-text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 6,
            }}
          >
            {place.name}
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 13, color: 'var(--dj-text-secondary)' }}>
              📍 {place.location}
            </span>
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'var(--dj-muted)',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 13, color: 'var(--dj-text-secondary)' }}>
              {place.distance} away
            </span>
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'var(--dj-muted)',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 13, color: 'var(--dj-orange)', fontWeight: 600 }}>
              {priceLabel}
            </span>
          </div>
        </div>

        {/* Vibe Match Score */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 16px',
            borderRadius: 'var(--dj-radius-lg)',
            background: 'linear-gradient(135deg, rgba(155,93,229,0.18) 0%, rgba(247,37,133,0.10) 100%)',
            border: '1px solid rgba(155,93,229,0.3)',
            marginBottom: 16,
            boxShadow: '0 0 24px rgba(155,93,229,0.15)',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'var(--dj-gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(155,93,229,0.5)',
              flexShrink: 0,
            }}
          >
            <span
              className="font-display"
              style={{ fontSize: 13, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}
            >
              {place.vibeMatch}%
            </span>
          </div>
          <div>
            <p
              className="font-display"
              style={{ fontSize: 15, fontWeight: 700, color: 'var(--dj-text)', marginBottom: 2 }}
            >
              Vibe Match Score
            </p>
            <p style={{ fontSize: 12, color: 'var(--dj-text-secondary)', lineHeight: 1.4 }}>
              Exceptionally aligned with your Vibe DNA
            </p>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 20, flexShrink: 0 }}>✦</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 16 }}>
          {place.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--dj-text-secondary)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '5px 10px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: 'var(--dj-text-secondary)',
            lineHeight: 1.6,
            marginBottom: 0,
          }}
        >
          {place.description}
        </p>
      </div>

      {/* ── Why it matches your vibe ── */}
      <div
        className="glass-card"
        style={{ padding: '18px 20px', marginTop: 12 }}
      >
        <h2
          className="font-display"
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--dj-text)',
            marginBottom: 14,
            letterSpacing: '-0.01em',
          }}
        >
          ✦ Why it matches your vibe
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {whyItMatches.map((reason, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'var(--dj-gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 800,
                  color: 'white',
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {i + 1}
              </div>
              <p style={{ fontSize: 13, color: 'var(--dj-text-secondary)', lineHeight: 1.5 }}>
                {reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Best for ── */}
      <div
        className="glass-card"
        style={{ padding: '18px 20px', marginTop: 12 }}
      >
        <h2
          className="font-display"
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--dj-text)',
            marginBottom: 12,
            letterSpacing: '-0.01em',
          }}
        >
          🎯 Best for
        </h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {bestFor.map((item) => (
            <div
              key={item}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '7px 13px',
                borderRadius: 'var(--dj-radius-full)',
                background: 'rgba(255,107,53,0.12)',
                border: '1px solid rgba(255,107,53,0.28)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--dj-orange)',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
        {/* Save */}
        <SaveButton placeId={place.id} size="lg" />

        {/* Row: Open in Map + Share */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            id="place-map-btn"
            aria-label={`Open ${place.name} in maps`}
            onClick={() =>
              window.open(
                `https://maps.google.com/?q=${encodeURIComponent(
                  `${place.name} ${place.location}`
                )}`,
                '_blank',
                'noopener,noreferrer'
              )
            }
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: 'var(--dj-radius-lg)',
              border: '1.5px solid var(--dj-border)',
              background: 'var(--dj-card)',
              color: 'var(--dj-text)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            🗺️ Open in Map
          </button>
          <button
            id="place-share-action-btn"
            aria-label={`Share ${place.name}`}
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: 'var(--dj-radius-lg)',
              border: '1.5px solid var(--dj-border)',
              background: 'var(--dj-card)',
              color: 'var(--dj-text)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            ↗️ Share
          </button>
        </div>
      </div>

      {/* Back to Discover link */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Link
          href="/discover"
          style={{
            fontSize: 13,
            fontWeight: 600,
            background: 'var(--dj-gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
          }}
        >
          ← Explore more places
        </Link>
      </div>
    </motion.div>
  );
}

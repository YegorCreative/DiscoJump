'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';
import { places } from '@/data/places';
import { Place } from '@/types';

// ─── Premium empty state ───────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 32px 80px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Glow orb */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(155,93,229,0.18) 0%, rgba(247,37,133,0.08) 50%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(20px)',
        }}
      />

      {/* Bookmark icon orb */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background:
            'linear-gradient(135deg, rgba(155,93,229,0.22) 0%, rgba(247,37,133,0.14) 100%)',
          border: '1.5px solid rgba(155,93,229,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          marginBottom: 24,
          boxShadow:
            '0 0 32px rgba(155,93,229,0.2), 0 8px 24px rgba(0,0,0,0.4)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        🔖
      </div>

      <h2
        className="font-display"
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: 'var(--dj-text)',
          letterSpacing: '-0.03em',
          marginBottom: 10,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Your vibe collection is empty.
      </h2>
      <p
        style={{
          fontSize: 14,
          color: 'var(--dj-text-secondary)',
          lineHeight: 1.6,
          maxWidth: 260,
          marginBottom: 32,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Save places you love and they&apos;ll appear here, ready for your next
        night out.
      </p>

      <Link
        href="/discover"
        aria-label="Explore places to save"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 28px',
          borderRadius: 'var(--dj-radius-xl)',
          background: 'var(--dj-gradient-primary)',
          color: 'white',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          boxShadow: '0 6px 28px rgba(155,93,229,0.35)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        ✦ Explore Places
      </Link>
    </div>
  );
}

// ─── Individual saved place row ────────────────────────────────────────────────
interface SavedPlaceRowProps {
  place: Place;
  onToggle: (id: string) => void;
}

function SavedPlaceRow({ place, onToggle }: SavedPlaceRowProps) {
  const handleUnsave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(place.id);
  };

  return (
    <article
      id={`saved-place-${place.id}`}
      className="glass-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 14px',
        borderRadius: 'var(--dj-radius-lg)',
        overflow: 'hidden',
      }}
    >
      {/* Thumbnail */}
      <Link
        href={`/place/${place.id}`}
        aria-label={`View details for ${place.name}`}
        style={{ textDecoration: 'none', flexShrink: 0 }}
        tabIndex={-1}
      >
        <div
          style={{
            position: 'relative',
            width: 72,
            height: 72,
            borderRadius: 'var(--dj-radius-md)',
            overflow: 'hidden',
          }}
        >
          <Image
            src={place.imageUrl}
            alt={place.name}
            fill
            sizes="72px"
            style={{ objectFit: 'cover' }}
          />
          {/* Vibe badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              left: 4,
              fontSize: 9,
              fontWeight: 700,
              background: 'var(--dj-gradient-primary)',
              borderRadius: 4,
              padding: '2px 5px',
              color: 'white',
              letterSpacing: '-0.01em',
            }}
          >
            ✦{place.vibeMatch}%
          </div>
        </div>
      </Link>

      {/* Info */}
      <Link
        href={`/place/${place.id}`}
        aria-label={`View ${place.name}`}
        style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}
      >
        <h3
          className="font-display"
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--dj-text)',
            letterSpacing: '-0.02em',
            marginBottom: 3,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {place.categoryEmoji} {place.name}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: 'var(--dj-text-secondary)',
            marginBottom: 6,
          }}
        >
          📍 {place.location} · {place.distance}
        </p>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {place.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: 'var(--dj-text-secondary)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 4,
                padding: '2px 6px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>

      {/* Unsave button — inline flex item, no absolute positioning */}
      <button
        onClick={handleUnsave}
        aria-label={`Remove ${place.name} from saved`}
        aria-pressed={true}
        style={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(155,93,229,0.5)',
          background:
            'linear-gradient(135deg, rgba(155,93,229,0.45), rgba(247,37,133,0.35))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: '0 0 14px rgba(155,93,229,0.4)',
          transition: 'all 0.2s ease',
        }}
      >
        🔖
      </button>
    </article>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function SavedContent() {
  const { savedIds, hydrated, toggleSaved } = useSavedPlaces();
  const savedPlaces = hydrated ? places.filter((p) => savedIds.has(p.id)) : [];

  return (
    <div style={{ paddingTop: 56, paddingBottom: 32 }}>
      {/* Header */}
      <div className="section-px" style={{ marginBottom: 24 }}>
        <h1
          className="font-display"
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: 'var(--dj-text)',
            letterSpacing: '-0.04em',
            marginBottom: 6,
          }}
        >
          Saved
        </h1>
        <p style={{ fontSize: 14, color: 'var(--dj-text-secondary)' }}>
          {!hydrated
            ? '\u00a0'
            : savedPlaces.length === 0
            ? 'No places saved yet'
            : `${savedPlaces.length} ${
                savedPlaces.length === 1 ? 'place' : 'places'
              } saved`}
        </p>
      </div>

      {/* Loading placeholder — avoids layout shift */}
      {!hydrated && (
        <div
          className="section-px"
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="glass-card"
              style={{
                height: 96,
                borderRadius: 'var(--dj-radius-lg)',
                opacity: 0.4,
              }}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {hydrated && savedPlaces.length === 0 && <EmptyState />}

      {/* Saved places list */}
      {hydrated && savedPlaces.length > 0 && (
        <div
          className="section-px"
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {savedPlaces.map((place) => (
            <SavedPlaceRow key={place.id} place={place} onToggle={toggleSaved} />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import Image from 'next/image';
import { Place } from '@/types';
import SelectedMoodTags from './SelectedMoodTags';

interface MoodResultPreviewProps {
  feeling: string | null;
  energy: string | null;
  distance: string | null;
  places: Place[];
  onExplore: () => void;
  onSave: () => void;
  feelingLabel: string;
  feelingEmoji: string;
  energyLabel: string;
  energyEmoji: string;
  distanceLabel: string;
  distanceEmoji: string;
}

export default function MoodResultPreview({
  places,
  onExplore,
  onSave,
  feelingLabel,
  feelingEmoji,
  energyLabel,
  energyEmoji,
  distanceLabel,
  distanceEmoji,
}: MoodResultPreviewProps) {
  const tags = [
    { label: feelingLabel, emoji: feelingEmoji },
    { label: energyLabel, emoji: energyEmoji },
    { label: distanceLabel, emoji: distanceEmoji },
  ];

  return (
    <div style={{ padding: '8px 24px 40px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--dj-purple-light)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Vibe matched ✦
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: 'var(--dj-text)',
            letterSpacing: '-0.03em',
            marginBottom: 14,
          }}
        >
          Your vibe tonight
        </h2>
        <SelectedMoodTags tags={tags} />
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: 'var(--dj-border)',
          marginBottom: 20,
          marginTop: 4,
        }}
      />

      {/* Place results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {places.map((place, i) => (
          <article
            key={place.id}
            id={`result-place-${place.id}`}
            style={{
              display: 'flex',
              gap: 12,
              padding: '12px',
              borderRadius: 'var(--dj-radius-lg)',
              background: 'var(--dj-card)',
              border: '1px solid var(--dj-border)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            {/* Image */}
            <div
              style={{
                position: 'relative',
                width: 70,
                height: 70,
                borderRadius: 12,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <Image
                src={place.imageUrl}
                alt={place.name}
                fill
                sizes="70px"
                style={{ objectFit: 'cover' }}
              />
              {/* Rank badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 4,
                  left: 4,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'var(--dj-gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  fontWeight: 800,
                  color: 'white',
                }}
              >
                {i + 1}
              </div>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--dj-text)',
                    letterSpacing: '-0.01em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {place.name}
                </h3>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--dj-purple-light)',
                    background: 'rgba(155,93,229,0.15)',
                    border: '1px solid rgba(155,93,229,0.3)',
                    borderRadius: 'var(--dj-radius-full)',
                    padding: '2px 7px',
                    marginLeft: 6,
                    flexShrink: 0,
                  }}
                >
                  ✦ {place.vibeMatch}%
                </span>
              </div>

              <p
                style={{
                  fontSize: 12,
                  color: 'var(--dj-text-secondary)',
                  marginBottom: 6,
                }}
              >
                {place.categoryEmoji} {place.category} · {place.distance}
              </p>

              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {place.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: 'var(--dj-muted)',
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
        ))}
      </div>

      {/* CTA buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          id="explore-vibe-btn"
          aria-label="Explore this vibe"
          onClick={onExplore}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 'var(--dj-radius-xl)',
            border: 'none',
            background: 'var(--dj-gradient-primary)',
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            cursor: 'pointer',
            letterSpacing: '-0.01em',
            boxShadow: '0 6px 32px rgba(155,93,229,0.35)',
            transition: 'opacity 0.2s ease, transform 0.15s ease',
          }}
        >
          Explore this vibe →
        </button>
        <button
          id="save-mood-btn"
          aria-label="Save this mood"
          onClick={onSave}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--dj-radius-xl)',
            border: '1.5px solid var(--dj-border)',
            background: 'var(--dj-card)',
            color: 'var(--dj-text-secondary)',
            fontSize: 15,
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
        >
          🔖 Save this mood
        </button>
      </div>
    </div>
  );
}

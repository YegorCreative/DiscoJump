import type { Metadata } from 'next';
import Image from 'next/image';
import AppShell from '@/components/layout/AppShell';
import { savedCollections } from '@/data/saved';

export const metadata: Metadata = {
  title: 'Saved — Disco Jump',
  description: 'Your saved place collections on Disco Jump.',
};

export default function SavedPage() {
  return (
    <AppShell activeTab="saved">
      <div style={{ paddingTop: 56 }}>
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
            {savedCollections.reduce((sum, c) => sum + c.count, 0)} places across{' '}
            {savedCollections.length} collections
          </p>
        </div>

        {/* New collection CTA */}
        <div className="section-px" style={{ marginBottom: 24 }}>
          <button
            id="new-collection-btn"
            aria-label="Create a new collection"
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 'var(--dj-radius-lg)',
              border: '1.5px dashed var(--dj-border)',
              background: 'transparent',
              color: 'var(--dj-text-secondary)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1.5px solid var(--dj-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              +
            </span>
            Create new collection
          </button>
        </div>

        {/* Collections grid */}
        <div
          className="section-px"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
            marginBottom: 32,
          }}
        >
          {savedCollections.map((col) => (
            <article
              key={col.id}
              id={`collection-${col.id}`}
              className="glass-card"
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: 'var(--dj-radius-lg)',
              }}
            >
              {/* Cover image */}
              <div style={{ position: 'relative', height: 110 }}>
                <Image
                  src={col.coverImageUrl}
                  alt={col.title}
                  fill
                  sizes="200px"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(9,9,9,0.85) 0%, transparent 60%)',
                  }}
                />
                {/* Emoji */}
                <span
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    fontSize: 20,
                  }}
                >
                  {col.emoji}
                </span>
                {/* Count badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    background: 'rgba(0,0,0,0.6)',
                    color: 'var(--dj-text)',
                    borderRadius: 'var(--dj-radius-full)',
                    padding: '3px 8px',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {col.count}
                </span>
              </div>
              {/* Info */}
              <div style={{ padding: '10px 12px 12px' }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--dj-text)',
                    letterSpacing: '-0.01em',
                    marginBottom: 3,
                    lineHeight: 1.2,
                  }}
                >
                  {col.title}
                </h2>
                <p style={{ fontSize: 11, color: 'var(--dj-muted)' }}>
                  Updated {col.lastUpdated}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

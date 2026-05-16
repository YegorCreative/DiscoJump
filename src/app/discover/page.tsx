import type { Metadata } from 'next';
import AppShell from '@/components/layout/AppShell';
import SectionHeader from '@/components/ui/SectionHeader';
import PlaceCard from '@/components/ui/PlaceCard';
import { places } from '@/data/places';
import { moods } from '@/data/moods';
import MoodChip from '@/components/ui/MoodChip';

export const metadata: Metadata = {
  title: 'Discover — Disco Jump',
  description: 'Explore restaurants, nightlife, adventures, cafés, and hidden gems near you.',
};

const categories = ['All', '🎧 Nightlife', '🍜 Food', '☕ Cafés', '🎨 Art', '🌊 Outdoors'];

export default function DiscoverPage() {
  return (
    <AppShell activeTab="discover">
      {/* Header */}
      <div style={{ paddingTop: 56, paddingBottom: 0 }}>
        <div className="section-px" style={{ marginBottom: 20 }}>
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
            Discover
          </h1>
          <p style={{ fontSize: 14, color: 'var(--dj-text-secondary)' }}>
            Explore places that match your vibe
          </p>
        </div>

        {/* Search bar */}
        <div className="section-px" style={{ marginBottom: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '13px 16px',
              borderRadius: 'var(--dj-radius-lg)',
              background: 'var(--dj-card)',
              border: '1px solid var(--dj-border)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span style={{ fontSize: 18 }}>🔍</span>
            <span style={{ fontSize: 15, color: 'var(--dj-muted)' }}>
              Search places, vibes, cities…
            </span>
          </div>
        </div>

        {/* Category filter chips */}
        <div
          style={{
            paddingLeft: 24,
            paddingRight: 8,
            overflowX: 'auto',
            display: 'flex',
            gap: 10,
            marginBottom: 28,
            paddingBottom: 4,
            scrollbarWidth: 'none',
          }}
        >
          {categories.map((cat, i) => (
            <button
              key={cat}
              id={`category-filter-${i}`}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--dj-radius-full)',
                border: i === 0 ? '1.5px solid var(--dj-purple)' : '1.5px solid var(--dj-border)',
                background: i === 0 ? 'rgba(155,93,229,0.15)' : 'var(--dj-card)',
                color: i === 0 ? 'var(--dj-purple-light)' : 'var(--dj-text-secondary)',
                fontSize: 13,
                fontWeight: i === 0 ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* All places grid */}
        <SectionHeader title="All Places" id="discover-all-places" />
        <div
          className="section-px"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
            marginBottom: 32,
          }}
        >
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>

        {/* Mood section */}
        <SectionHeader
          title="Browse by Mood"
          subtitle="What are you feeling?"
          id="discover-moods"
        />
        <div
          style={{
            paddingLeft: 24,
            paddingRight: 8,
            overflowX: 'auto',
            display: 'flex',
            gap: 10,
            marginBottom: 32,
            paddingBottom: 4,
            scrollbarWidth: 'none',
          }}
        >
          {moods.map((mood) => (
            <MoodChip key={mood.id} mood={mood} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AppShell from '@/components/layout/AppShell';
import SectionHeader from '@/components/ui/SectionHeader';
import PlaceCard from '@/components/ui/PlaceCard';
import MoodChip from '@/components/ui/MoodChip';
import { places } from '@/data/places';
import { moods } from '@/data/moods';
import { useVibeProfile } from '@/hooks/useVibeProfile';
import { VIBE_TYPES } from '@/data/quiz';
import { buildDNAScoreMap } from '@/lib/placeScoring';

// ─── Filter chip definitions ───────────────────────────────────────────────────
type FilterId = 'for-you' | 'food' | 'nightlife' | 'cozy' | 'adventure' | 'hidden-gems';

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: 'for-you', label: '✦ For You' },
  { id: 'food', label: '🍜 Food' },
  { id: 'nightlife', label: '🎧 Nightlife' },
  { id: 'cozy', label: '🕯️ Cozy' },
  { id: 'adventure', label: '🌊 Adventure' },
  { id: 'hidden-gems', label: '💎 Hidden Gems' },
];

export default function DiscoverClient() {
  const { profile, hydrated } = useVibeProfile();
  const [activeFilter, setActiveFilter] = useState<FilterId>('for-you');

  // Pre-compute DNA scores once when profile is available
  const dnaScores = useMemo(() => {
    if (!profile) return new Map<string, number>();
    return buildDNAScoreMap(places, profile.vibeTypeId);
  }, [profile]);

  const showDNABadge = activeFilter === 'for-you' && !!profile;

  const filteredPlaces = useMemo(() => {
    switch (activeFilter) {
      case 'for-you':
        return [...places].sort((a, b) => {
          const scoreA = dnaScores.get(a.id) ?? a.vibeMatch;
          const scoreB = dnaScores.get(b.id) ?? b.vibeMatch;
          return scoreB - scoreA;
        });
      case 'food':
        return places.filter((p) =>
          ['restaurant', 'coffee'].includes(p.category.toLowerCase())
        );
      case 'nightlife':
        return places.filter((p) =>
          ['nightclub', 'rooftop bar', 'beach club'].includes(p.category.toLowerCase())
        );
      case 'cozy': {
        const cozyCats = ['bookshop bar', 'coffee', 'jazz bar'];
        const cozyTags = ['lo-fi', 'dimly lit', 'wine', 'books', 'vinyl'];
        return places.filter((p) => {
          const cat = p.category.toLowerCase();
          const tags = p.tags.map((t) => t.toLowerCase());
          return cozyCats.includes(cat) || tags.some((t) => cozyTags.includes(t));
        });
      }
      case 'adventure': {
        const adventureCats = ['beach club', 'rooftop bar'];
        const adventureTags = ['beach', 'day party', 'rooftop', 'views', 'sunset'];
        return places.filter((p) => {
          const cat = p.category.toLowerCase();
          const tags = p.tags.map((t) => t.toLowerCase());
          return adventureCats.includes(cat) || tags.some((t) => adventureTags.includes(t));
        });
      }
      case 'hidden-gems':
        return places.filter((p) => p.isHiddenGem);
      default:
        return places;
    }
  }, [activeFilter, dnaScores]);

  const vibe = profile ? VIBE_TYPES[profile.vibeTypeId] : null;

  // Section title for the grid
  const sectionTitle =
    activeFilter === 'for-you' && profile
      ? `${vibe!.emoji} Matched to Your DNA`
      : activeFilter === 'for-you'
        ? 'Top Places'
        : FILTERS.find((f) => f.id === activeFilter)?.label.replace(/^\S+\s/, '') ?? 'Places';

  const sectionSubtitle =
    activeFilter === 'for-you' && profile
      ? `Ranked for ${vibe!.label}`
      : activeFilter === 'for-you'
        ? 'Highest vibe match'
        : `${filteredPlaces.length} places`;

  return (
    <AppShell activeTab="discover">
      <div style={{ paddingTop: 56, paddingBottom: 0 }}>
        {/* ── Page header ── */}
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
            {profile
              ? `Personalized for ${vibe!.label}`
              : 'Explore places that match your vibe'}
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="section-px" style={{ marginBottom: 20 }}>
          <div
            role="button"
            tabIndex={0}
            aria-label="Search places, vibes, cities"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '13px 16px',
              borderRadius: 'var(--dj-radius-lg)',
              background: 'var(--dj-card)',
              border: '1px solid var(--dj-border)',
              backdropFilter: 'blur(12px)',
              cursor: 'text',
            }}
          >
            <span style={{ fontSize: 18 }}>🔍</span>
            <span style={{ fontSize: 15, color: 'var(--dj-muted)' }}>
              Search places, vibes, cities…
            </span>
          </div>
        </div>

        {/* ── Filter chips ── */}
        <div
          style={{
            paddingLeft: 24,
            paddingRight: 8,
            overflowX: 'auto',
            display: 'flex',
            gap: 10,
            marginBottom: 20,
            paddingBottom: 4,
            scrollbarWidth: 'none',
          }}
          role="tablist"
          aria-label="Filter places"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            const isForYou = filter.id === 'for-you';
            // "For You" chip glows in the user's vibe color when profile exists
            const accentColor = isForYou && vibe ? vibe.gradientFrom : '#9B5DE5';

            return (
              <button
                key={filter.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--dj-radius-full)',
                  border: isActive
                    ? `1.5px solid ${accentColor}`
                    : '1.5px solid var(--dj-border)',
                  background: isActive ? `${accentColor}22` : 'var(--dj-card)',
                  color: isActive ? (isForYou && vibe ? vibe.color : 'var(--dj-purple-light)') : 'var(--dj-text-secondary)',
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? `0 0 14px ${accentColor}28` : 'none',
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* ── DNA context strip (For You + profile exists) ── */}
        {activeFilter === 'for-you' && profile && hydrated && (
          <div className="section-px" style={{ marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 'var(--dj-radius-md)',
                background: `${vibe!.gradientFrom}0d`,
                border: `1px solid ${vibe!.gradientFrom}20`,
              }}
            >
              <span style={{ fontSize: 14 }}>🧬</span>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--dj-text-secondary)',
                  lineHeight: 1.4,
                }}
              >
                Ranked by{' '}
                <strong style={{ color: vibe!.color, fontWeight: 700 }}>
                  {vibe!.label}
                </strong>{' '}
                DNA — places are sorted by how well they fit your profile
              </p>
            </div>
          </div>
        )}

        {/* ── No-profile prompt for For You ── */}
        {activeFilter === 'for-you' && !profile && hydrated && (
          <motion.div
            className="section-px"
            style={{ marginBottom: 16 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 'var(--dj-radius-lg)',
                background: 'rgba(155,93,229,0.06)',
                border: '1px dashed rgba(155,93,229,0.28)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>🧬</span>
                <p style={{ fontSize: 13, color: 'var(--dj-text-secondary)', lineHeight: 1.4 }}>
                  Build your Vibe DNA to unlock smarter matches.
                </p>
              </div>
              <Link
                href="/onboarding"
                aria-label="Take the Vibe DNA quiz"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  background: 'var(--dj-gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Start Quiz →
              </Link>
            </div>
          </motion.div>
        )}

        {/* ── Places grid ── */}
        <SectionHeader
          title={sectionTitle}
          subtitle={sectionSubtitle}
          id="discover-all-places"
        />

        {filteredPlaces.length === 0 ? (
          <div
            className="section-px"
            style={{ paddingBottom: 32, textAlign: 'center', color: 'var(--dj-muted)', fontSize: 14 }}
          >
            No places found for this filter.
          </div>
        ) : (
          <div
            className="section-px"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
              marginBottom: 32,
            }}
          >
            {filteredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                dnaScore={showDNABadge ? dnaScores.get(place.id) : undefined}
              />
            ))}
          </div>
        )}

        {/* ── Mood section ── */}
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

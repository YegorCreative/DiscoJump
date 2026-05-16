'use client';

import { useMemo } from 'react';
import { places } from '@/data/places';
import PlaceCard from '@/components/ui/PlaceCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { useVibeProfile } from '@/hooks/useVibeProfile';
import { VIBE_TYPES } from '@/data/quiz';
import { buildDNAScoreMap } from '@/lib/placeScoring';

export default function RecommendedPlaces() {
  const { profile } = useVibeProfile();

  const dnaScores = useMemo(() => {
    if (!profile) return new Map<string, number>();
    return buildDNAScoreMap(places, profile.vibeTypeId);
  }, [profile]);

  // When profile exists: sort all places by DNA score, else sort by static vibeMatch
  // Show top 5, exclude hidden gems from this section
  const sorted = useMemo(() => {
    const pool = places.filter((p) => !p.isHiddenGem);
    if (profile) {
      return [...pool]
        .sort((a, b) => (dnaScores.get(b.id) ?? 0) - (dnaScores.get(a.id) ?? 0))
        .slice(0, 5);
    }
    return [...pool].sort((a, b) => b.vibeMatch - a.vibeMatch).slice(0, 5);
  }, [profile, dnaScores]);

  const vibe = profile ? VIBE_TYPES[profile.vibeTypeId] : null;
  const subtitle = vibe ? `Matched to your ${vibe.label} DNA` : 'Based on your Vibe DNA';

  return (
    <section id="recommended-places" aria-label="Recommended places" style={{ marginBottom: 36 }}>
      <SectionHeader
        title="For You Tonight"
        subtitle={subtitle}
        ctaLabel="See all"
        ctaHref="/discover"
        id="recommended-header"
      />
      <div
        style={{
          paddingLeft: 24,
          paddingRight: 8,
          overflowX: 'auto',
          display: 'flex',
          gap: 14,
          paddingBottom: 4,
          scrollbarWidth: 'none',
        }}
      >
        {sorted.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            dnaScore={profile ? dnaScores.get(place.id) : undefined}
          />
        ))}
      </div>
    </section>
  );
}

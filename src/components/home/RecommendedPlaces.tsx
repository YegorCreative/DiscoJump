'use client';

import { recommendedPlaces } from '@/data/places';
import PlaceCard from '@/components/ui/PlaceCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function RecommendedPlaces() {
  return (
    <section id="recommended-places" aria-label="Recommended places" style={{ marginBottom: 36 }}>
      <SectionHeader
        title="For You Tonight"
        subtitle="Based on your Vibe DNA"
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
        {recommendedPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}

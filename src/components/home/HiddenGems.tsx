'use client';

import { hiddenGems } from '@/data/places';
import VibeCard from '@/components/ui/VibeCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function HiddenGems() {
  return (
    <section id="hidden-gems" aria-label="Hidden gem spots" style={{ marginBottom: 36 }}>
      <SectionHeader
        title="Hidden Gems"
        subtitle="Places only locals know about"
        ctaLabel="Explore"
        ctaHref="/discover"
        id="hidden-gems-header"
      />
      <div
        style={{
          paddingLeft: 24,
          paddingRight: 8,
          overflowX: 'auto',
          display: 'flex',
          gap: 16,
          paddingBottom: 4,
          scrollbarWidth: 'none',
        }}
      >
        {hiddenGems.map((place) => (
          <VibeCard key={place.id} place={place} size="medium" />
        ))}
      </div>
    </section>
  );
}

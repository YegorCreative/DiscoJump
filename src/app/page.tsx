import AppShell from '@/components/layout/AppShell';
import HomeHeader from '@/components/home/HomeHeader';
import IFeelLikeCTA from '@/components/home/IFeelLikeCTA';
import MoodChipRow from '@/components/home/MoodChipRow';
import RecommendedPlaces from '@/components/home/RecommendedPlaces';
import HiddenGems from '@/components/home/HiddenGems';
import SectionHeader from '@/components/ui/SectionHeader';
import VibeCard from '@/components/ui/VibeCard';
import { places } from '@/data/places';

export default function HomePage() {
  // Top 2 highest vibe-match places for the featured section
  const featured = [...places].sort((a, b) => b.vibeMatch - a.vibeMatch).slice(0, 2);

  return (
    <AppShell activeTab="home">
      {/* Greeting + logo + location */}
      <HomeHeader />

      {/* Primary CTA */}
      <IFeelLikeCTA />

      {/* Mood chips */}
      <MoodChipRow />

      {/* Recommended places */}
      <RecommendedPlaces />

      {/* Hidden gems */}
      <HiddenGems />

      {/* Top vibe matches */}
      <section
        id="top-vibe-matches"
        aria-label="Top vibe matches"
        style={{ marginBottom: 16 }}
      >
        <SectionHeader
          title="Top Vibe Matches"
          subtitle="Highest compatibility for you"
          ctaLabel="All matches"
          ctaHref="/discover"
          id="top-matches-header"
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
          {featured.map((place) => (
            <VibeCard key={place.id} place={place} size="large" />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

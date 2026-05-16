import { Metadata } from 'next';
import { places } from '@/data/places';
import AppShell from '@/components/layout/AppShell';
import PlaceDetailHero from '@/components/place/PlaceDetailHero';
import PlaceDetailCard from '@/components/place/PlaceDetailCard';
import PlaceNotFound from '@/components/place/PlaceNotFound';

// ─── Async params shape (Next.js 16 App Router) ───────────────────────────────
interface PageProps {
  params: Promise<{ id: string }>;
}

// ─── Static params for known places ──────────────────────────────────────────
export async function generateStaticParams() {
  return places.map((p) => ({ id: p.id }));
}

// ─── Per-page metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const place = places.find((p) => p.id === id);

  if (!place) {
    return { title: 'Place not found — Disco Jump' };
  }

  return {
    title: `${place.name} — Disco Jump`,
    description: place.description,
    openGraph: {
      title: `${place.name} — Disco Jump`,
      description: `${place.vibeMatch}% vibe match · ${place.category} · ${place.location}`,
      images: [{ url: place.imageUrl, width: 600, height: 400 }],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PlaceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const place = places.find((p) => p.id === id);

  // Polished not-found state (outside AppShell so it's full-screen)
  if (!place) {
    return <PlaceNotFound />;
  }

  return (
    // activeTab "discover" since place detail is a sub-view of Discover
    <AppShell activeTab="discover">
      {/* No horizontal padding — hero is full-bleed */}
      <div style={{ marginLeft: -0, marginRight: -0 }}>
        <PlaceDetailHero place={place} />
        <PlaceDetailCard place={place} />
      </div>
    </AppShell>
  );
}

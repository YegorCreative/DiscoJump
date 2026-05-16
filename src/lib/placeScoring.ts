import type { Place } from '@/types';
import type { VibeTypeId } from '@/data/quiz';

// ─── Keyword maps: tags and categories that resonate with each vibe type ──────
const VIBE_KEYWORDS: Record<VibeTypeId, { tags: string[]; categories: string[] }> = {
  'night-crawler': {
    tags: ['electronic', 'dark', 'underground', 'late night'],
    categories: ['nightclub'],
  },
  'elevated-one': {
    tags: ['rooftop', 'cocktails', 'views', 'aesthetic', 'premium', 'sunset'],
    categories: ['rooftop bar', 'beach club'],
  },
  'culture-seeker': {
    tags: ['jazz', 'art', 'vinyl', 'wine', 'books', 'rotating exhibits', 'date night'],
    categories: ['art + bar', 'jazz bar', 'bookshop bar'],
  },
  'social-spark': {
    tags: ['day party', 'cocktails', 'views', 'date night', 'sunset'],
    categories: ['beach club', 'rooftop bar'],
  },
  'cozy-soul': {
    tags: ['lo-fi', 'dimly lit', 'wine', 'books', 'work-friendly', 'vinyl'],
    categories: ['bookshop bar', 'coffee', 'jazz bar'],
  },
  'urban-explorer': {
    tags: ['late night', 'aesthetic', 'ramen', 'street food'],
    categories: ['restaurant'],
  },
};

/**
 * Score a place 0–100 against a user's vibe type.
 * - Category match: +35
 * - Each matching tag (max 3): +15
 * - Hidden gem bonus for relevant types: +10
 * - Base: 25
 */
export function scorePlaceForProfile(place: Place, vibeTypeId: VibeTypeId): number {
  const keywords = VIBE_KEYWORDS[vibeTypeId];
  const lowerTags = place.tags.map((t) => t.toLowerCase());
  const lowerCategory = place.category.toLowerCase();

  let score = 25;

  if (keywords.categories.includes(lowerCategory)) {
    score += 35;
  }

  let tagMatches = 0;
  for (const keyword of keywords.tags) {
    if (lowerTags.some((t) => t.includes(keyword))) {
      tagMatches++;
      if (tagMatches >= 3) break;
    }
  }
  score += tagMatches * 15;

  if (
    place.isHiddenGem &&
    (vibeTypeId === 'urban-explorer' || vibeTypeId === 'cozy-soul')
  ) {
    score += 10;
  }

  return Math.min(score, 100);
}

/**
 * Build a Map<placeId, dnaScore> for all places in a single pass.
 */
export function buildDNAScoreMap(
  places: Place[],
  vibeTypeId: VibeTypeId
): Map<string, number> {
  return new Map(places.map((p) => [p.id, scorePlaceForProfile(p, vibeTypeId)]));
}

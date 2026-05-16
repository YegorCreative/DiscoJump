// ─────────────────────────────────────────────
// Disco Jump — Shared TypeScript Interfaces
// ─────────────────────────────────────────────

export interface Mood {
  id: string;
  emoji: string;
  label: string;
  active?: boolean;
  color: string; // accent color for active state
}

export interface Place {
  id: string;
  name: string;
  category: string;
  categoryEmoji: string;
  location: string;
  vibeMatch: number; // 0–100
  tags: string[];
  imageUrl: string;
  isHiddenGem: boolean;
  distance: string;
  priceLevel: 1 | 2 | 3 | 4; // $ to $$$$
  description: string;
}

export interface VibeDNATrait {
  id: string;
  trait: string;
  description: string;
  percentage: number; // 0–100
  color: string;
  icon: string;
}

export interface SavedCollection {
  id: string;
  title: string;
  count: number;
  coverImageUrl: string;
  lastUpdated: string;
  emoji: string;
}

export type NavTab = 'home' | 'discover' | 'vibe' | 'saved' | 'profile';

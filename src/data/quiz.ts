// ─────────────────────────────────────────────────────────────────────────────
// Disco Jump — Vibe DNA Quiz Data
// ─────────────────────────────────────────────────────────────────────────────

export type VibeTypeId =
  | 'night-crawler'
  | 'elevated-one'
  | 'culture-seeker'
  | 'social-spark'
  | 'cozy-soul'
  | 'urban-explorer';

export interface VibeType {
  id: VibeTypeId;
  label: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  traits: string[];
}

export const VIBE_TYPES: Record<VibeTypeId, VibeType> = {
  'night-crawler': {
    id: 'night-crawler',
    label: 'The Night Crawler',
    emoji: '🌙',
    tagline: 'You come alive after dark.',
    description:
      'Underground venues, electric energy, and 3am memories. You peak when the city quiets and the bass drops. Disco Jump was practically built for you.',
    color: '#9B5DE5',
    gradientFrom: '#9B5DE5',
    gradientTo: '#F72585',
    traits: ['Night Owl', 'Underground Seeker', 'Energy Chaser'],
  },
  'elevated-one': {
    id: 'elevated-one',
    label: 'The Elevated One',
    emoji: '✨',
    tagline: 'You refuse to settle for ordinary.',
    description:
      'Rooftops, fine dining, and curated experiences. You have impeccable taste and know exactly how a night should feel. Premium is your baseline.',
    color: '#F72585',
    gradientFrom: '#F72585',
    gradientTo: '#FF6B35',
    traits: ['Luxury Taste', 'Vibe Curator', 'Experience Architect'],
  },
  'culture-seeker': {
    id: 'culture-seeker',
    label: 'The Culture Seeker',
    emoji: '🎨',
    tagline: 'Art, music, ideas — you collect moments.',
    description:
      'Gallery openings, jazz bars, film screenings. You find beauty in the obscure and meaning in the creative. Your nights are a form of education.',
    color: '#FF6B35',
    gradientFrom: '#FF6B35',
    gradientTo: '#FFE14D',
    traits: ['Culture Seeker', 'Aesthetic Eye', 'Deep Thinker'],
  },
  'social-spark': {
    id: 'social-spark',
    label: 'The Social Spark',
    emoji: '⚡',
    tagline: 'Every room lights up when you walk in.',
    description:
      "You're the one who makes the plan and gets everyone out. High energy, social gravity, and a talent for turning any night into a story worth telling.",
    color: '#FFE14D',
    gradientFrom: '#FFE14D',
    gradientTo: '#F72585',
    traits: ['Social Butterfly', 'Energy Radiator', 'Scene Maker'],
  },
  'cozy-soul': {
    id: 'cozy-soul',
    label: 'The Cozy Soul',
    emoji: '🕯️',
    tagline: 'Warmth over hype, always.',
    description:
      'Candlelit corners, familiar faces, and places with actual character. You favor depth over volume, and the best nights feel like coming home.',
    color: '#00F5FF',
    gradientFrom: '#00F5FF',
    gradientTo: '#9B5DE5',
    traits: ['Intimacy Seeker', 'Quality Over Quantity', 'Hidden Gem Hunter'],
  },
  'urban-explorer': {
    id: 'urban-explorer',
    label: 'The Urban Explorer',
    emoji: '💎',
    tagline: "You find spots before they're on Google Maps.",
    description:
      "Street food alleys, unmarked bars, rooftops nobody talks about. You have a radar for what's real and a deep distrust of anything overhyped.",
    color: '#9B5DE5',
    gradientFrom: '#9B5DE5',
    gradientTo: '#00F5FF',
    traits: ['Hidden Gem Hunter', 'Urban Nomad', 'Anti-Tourist'],
  },
};

// ─── Quiz option scoring ───────────────────────────────────────────────────────
export type VibeScores = Partial<Record<VibeTypeId, number>>;

export interface QuizOption {
  id: string;
  emoji: string;
  label: string;
  description: string;
  vibeScores: VibeScores;
}

// ─── Quiz step ─────────────────────────────────────────────────────────────────
export interface QuizStep {
  id: string;
  step: number;
  question: string;
  subtitle: string;
  multiple: boolean;
  max?: number;
  options: QuizOption[];
}

export const QUIZ_STEPS: QuizStep[] = [
  // ── Step 1: Food vibe ──────────────────────────────────────────────────────
  {
    id: 'food',
    step: 1,
    question: 'Your favorite food vibe?',
    subtitle: 'How you eat reveals a lot about how you live.',
    multiple: false,
    options: [
      {
        id: 'late-night',
        emoji: '🌙',
        label: 'Late-Night Eats',
        description: '2am ramen, after-party food runs',
        vibeScores: { 'night-crawler': 3, 'social-spark': 1, 'urban-explorer': 2 },
      },
      {
        id: 'fine-dining',
        emoji: '✨',
        label: 'Fine Dining',
        description: 'Tasting menus, curated pairings',
        vibeScores: { 'elevated-one': 3, 'culture-seeker': 1 },
      },
      {
        id: 'comfort-food',
        emoji: '🍜',
        label: 'Comfort & Soul',
        description: 'Cozy spots, familiar flavors',
        vibeScores: { 'cozy-soul': 3, 'social-spark': 1 },
      },
      {
        id: 'street-food',
        emoji: '🌮',
        label: 'Street Food Crawl',
        description: 'Local vendors, spontaneous bites',
        vibeScores: { 'urban-explorer': 3, 'social-spark': 2, 'culture-seeker': 1 },
      },
      {
        id: 'global-fusion',
        emoji: '🌍',
        label: 'Global Fusion',
        description: 'One plate, every continent',
        vibeScores: { 'culture-seeker': 3, 'urban-explorer': 2 },
      },
    ],
  },

  // ── Step 2: Ideal night out ────────────────────────────────────────────────
  {
    id: 'night',
    step: 2,
    question: 'Your ideal night out?',
    subtitle: 'Where does your energy feel most at home?',
    multiple: false,
    options: [
      {
        id: 'underground-club',
        emoji: '🎧',
        label: 'Underground Club',
        description: 'Dark rooms, pounding bass',
        vibeScores: { 'night-crawler': 3, 'urban-explorer': 2 },
      },
      {
        id: 'rooftop',
        emoji: '🥂',
        label: 'Rooftop Cocktails',
        description: 'City views, golden hour lighting',
        vibeScores: { 'elevated-one': 3, 'social-spark': 2 },
      },
      {
        id: 'jazz-bar',
        emoji: '🎷',
        label: 'Intimate Jazz Bar',
        description: 'Low light, live music, whiskey',
        vibeScores: { 'cozy-soul': 3, 'culture-seeker': 2 },
      },
      {
        id: 'art-gallery',
        emoji: '🎨',
        label: 'Art Gallery Opening',
        description: 'Culture, wine, real conversation',
        vibeScores: { 'culture-seeker': 3, 'elevated-one': 1 },
      },
      {
        id: 'house-party',
        emoji: '🏠',
        label: 'House Party',
        description: "Friend's place, no dress code",
        vibeScores: { 'social-spark': 3, 'cozy-soul': 1, 'night-crawler': 1 },
      },
    ],
  },

  // ── Step 3: Travel personality ─────────────────────────────────────────────
  {
    id: 'travel',
    step: 3,
    question: 'Your travel personality?',
    subtitle: 'How you explore new cities is how you explore new nights.',
    multiple: false,
    options: [
      {
        id: 'spontaneous',
        emoji: '🗺️',
        label: 'Spontaneous Wanderer',
        description: 'No plans, figure it out',
        vibeScores: { 'night-crawler': 2, 'urban-explorer': 2, 'social-spark': 2 },
      },
      {
        id: 'luxury',
        emoji: '✈️',
        label: 'Luxury Traveler',
        description: 'Five-star everything',
        vibeScores: { 'elevated-one': 3, 'culture-seeker': 1 },
      },
      {
        id: 'culture',
        emoji: '🏛️',
        label: 'Culture Deep-Diver',
        description: 'Museums, local ceremonies, history',
        vibeScores: { 'culture-seeker': 3, 'cozy-soul': 1 },
      },
      {
        id: 'explorer',
        emoji: '💎',
        label: 'Off-Grid Explorer',
        description: 'Hidden trails, secret spots',
        vibeScores: { 'urban-explorer': 3, 'night-crawler': 1, 'cozy-soul': 1 },
      },
      {
        id: 'city-hopper',
        emoji: '🌆',
        label: 'Urban City-Hopper',
        description: 'New city every weekend',
        vibeScores: { 'social-spark': 2, 'urban-explorer': 2, 'elevated-one': 1 },
      },
    ],
  },

  // ── Step 4: Atmosphere ─────────────────────────────────────────────────────
  {
    id: 'atmosphere',
    step: 4,
    question: 'Your perfect atmosphere?',
    subtitle: 'The energy of a room changes everything.',
    multiple: false,
    options: [
      {
        id: 'dark-moody',
        emoji: '🌑',
        label: 'Dark & Moody',
        description: 'Low light, intimate corners',
        vibeScores: { 'night-crawler': 3, 'cozy-soul': 2 },
      },
      {
        id: 'bright-electric',
        emoji: '⚡',
        label: 'Bright & Electric',
        description: 'Neon, movement, electric energy',
        vibeScores: { 'social-spark': 3, 'night-crawler': 1 },
      },
      {
        id: 'intimate-cozy',
        emoji: '🕯️',
        label: 'Intimate & Cozy',
        description: 'Candlelit, warm, personal',
        vibeScores: { 'cozy-soul': 3, 'culture-seeker': 1 },
      },
      {
        id: 'loud-social',
        emoji: '🔊',
        label: 'Loud & Social',
        description: 'Crowd, noise, adrenaline',
        vibeScores: { 'social-spark': 3, 'elevated-one': 1 },
      },
      {
        id: 'minimal-aesthetic',
        emoji: '◾',
        label: 'Minimal & Aesthetic',
        description: 'Clean lines, thoughtful design',
        vibeScores: { 'elevated-one': 3, 'culture-seeker': 2 },
      },
    ],
  },

  // ── Step 5: Deal breakers (multi-select) ──────────────────────────────────
  {
    id: 'dealBreakers',
    step: 5,
    question: 'What kills the vibe?',
    subtitle: 'Pick up to 3 things that instantly ruin a night.',
    multiple: true,
    max: 3,
    options: [
      {
        id: 'tourist-trap',
        emoji: '🚫',
        label: 'Tourist Traps',
        description: 'Overhyped, overpriced, soulless',
        vibeScores: { 'urban-explorer': 1, 'cozy-soul': 1 },
      },
      {
        id: 'long-queue',
        emoji: '⏱️',
        label: 'Long Queues',
        description: "Life's too short to wait outside",
        vibeScores: { 'elevated-one': 1, 'night-crawler': 1 },
      },
      {
        id: 'bad-music',
        emoji: '🎵',
        label: 'Bad Music',
        description: 'Wrong soundtrack ruins everything',
        vibeScores: { 'night-crawler': 1, 'culture-seeker': 1 },
      },
      {
        id: 'overpriced',
        emoji: '💸',
        label: 'Overpriced Drinks',
        description: 'Premium should earn its price',
        vibeScores: { 'urban-explorer': 1, 'social-spark': 1 },
      },
      {
        id: 'no-atmosphere',
        emoji: '😐',
        label: 'No Atmosphere',
        description: 'Generic, cold, uninspired',
        vibeScores: { 'elevated-one': 1, 'cozy-soul': 1 },
      },
      {
        id: 'bad-lighting',
        emoji: '📸',
        label: 'Bad Lighting',
        description: "If the lighting's off, so is the vibe",
        vibeScores: { 'elevated-one': 1, 'culture-seeker': 1 },
      },
    ],
  },
];

// ─── Answers type ──────────────────────────────────────────────────────────────
export interface QuizAnswers {
  food: string;
  night: string;
  travel: string;
  atmosphere: string;
  dealBreakers: string[];
}

// ─── Compute vibe type from answers ───────────────────────────────────────────
export function computeVibeType(answers: QuizAnswers): VibeTypeId {
  const scores: Record<VibeTypeId, number> = {
    'night-crawler': 0,
    'elevated-one': 0,
    'culture-seeker': 0,
    'social-spark': 0,
    'cozy-soul': 0,
    'urban-explorer': 0,
  };

  // Score single-select steps
  const singleSteps: Array<{ stepId: string; answerId: string }> = [
    { stepId: 'food', answerId: answers.food },
    { stepId: 'night', answerId: answers.night },
    { stepId: 'travel', answerId: answers.travel },
    { stepId: 'atmosphere', answerId: answers.atmosphere },
  ];

  for (const { stepId, answerId } of singleSteps) {
    const step = QUIZ_STEPS.find((s) => s.id === stepId);
    if (!step) continue;
    const option = step.options.find((o) => o.id === answerId);
    if (!option) continue;
    for (const [vibeId, pts] of Object.entries(option.vibeScores) as Array<
      [VibeTypeId, number | undefined]
    >) {
      if (pts !== undefined) scores[vibeId] += pts;
    }
  }

  // Score multi-select (deal breakers)
  const dbStep = QUIZ_STEPS.find((s) => s.id === 'dealBreakers');
  if (dbStep) {
    for (const answerId of answers.dealBreakers) {
      const option = dbStep.options.find((o) => o.id === answerId);
      if (!option) continue;
      for (const [vibeId, pts] of Object.entries(option.vibeScores) as Array<
        [VibeTypeId, number | undefined]
      >) {
        if (pts !== undefined) scores[vibeId] += pts;
      }
    }
  }

  // Return the highest-scoring type
  return Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0] as VibeTypeId;
}

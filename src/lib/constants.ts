import type { RelationshipType, OccasionType, PersonalityTag, ItemCategory } from '@/types';

// ─── Relationship Options ─────────────────────────────────────────
export const RELATIONSHIPS: { value: RelationshipType; label: string; icon: string }[] = [
  { value: 'partner', label: 'Partner', icon: '💕' },
  { value: 'parent', label: 'Parent', icon: '🏠' },
  { value: 'friend', label: 'Friend', icon: '🤝' },
  { value: 'colleague', label: 'Colleague', icon: '💼' },
  { value: 'child', label: 'Child', icon: '🧒' },
  { value: 'sibling', label: 'Sibling', icon: '👫' },
  { value: 'other', label: 'Other', icon: '🎁' },
];

// ─── Occasion Options ──────────────────────────────────────────────
export const OCCASIONS: { value: OccasionType; label: string; icon: string }[] = [
  { value: 'birthday', label: 'Birthday', icon: '🎂' },
  { value: 'anniversary', label: 'Anniversary', icon: '💍' },
  { value: 'holiday', label: 'Holiday', icon: '🎄' },
  { value: 'just-because', label: 'Just Because', icon: '💫' },
  { value: 'graduation', label: 'Graduation', icon: '🎓' },
  { value: 'wedding', label: 'Wedding', icon: '💒' },
  { value: 'other', label: 'Other', icon: '✨' },
];

// ─── Personality Tags ──────────────────────────────────────────────
export const PERSONALITY_TAGS: { value: PersonalityTag; label: string; icon: string }[] = [
  { value: 'outdoorsy', label: 'Outdoorsy', icon: '🏔️' },
  { value: 'bookworm', label: 'Bookworm', icon: '📚' },
  { value: 'foodie', label: 'Foodie', icon: '🍳' },
  { value: 'tech-lover', label: 'Tech Lover', icon: '💻' },
  { value: 'artist', label: 'Artist', icon: '🎨' },
  { value: 'homebody', label: 'Homebody', icon: '🏡' },
  { value: 'wellness', label: 'Wellness', icon: '🧘' },
  { value: 'gamer', label: 'Gamer', icon: '🎮' },
  { value: 'traveller', label: 'Traveller', icon: '✈️' },
  { value: 'music-lover', label: 'Music Lover', icon: '🎵' },
];

export const MAX_PERSONALITY_TAGS = 4;

// ─── Budget ────────────────────────────────────────────────────────
export const BUDGET_MIN = 100;
export const BUDGET_MAX = 50000;
export const BUDGET_DEFAULT = 2000;

// ─── Category exclusions for specific relationships (hard blocks) ──
export const RELATIONSHIP_CATEGORY_EXCLUSIONS: Partial<Record<RelationshipType, ItemCategory[]>> = {
  colleague: ['intimate-apparel', 'jewellery-personal', 'personal-care'],
  child: ['intimate-apparel', 'jewellery-personal', 'jewellery', 'kitchen', 'personal-care'],
  other: ['intimate-apparel', 'jewellery-personal'],
};

// ─── Category-Relationship Affinity Matrix ─────────────────────────
// Values: 1.0 = neutral, >1.0 = boost, <1.0 = penalize
// This makes recommendations feel appropriate for every relationship.
export const CATEGORY_AFFINITY: Record<RelationshipType, Partial<Record<ItemCategory, number>>> = {
  child: {
    games: 1.5,
    art: 1.5,
    outdoor: 1.4,
    books: 1.3,
    experience: 1.4,
    stationery: 1.3,
    'food-drink': 1.2,
    tech: 1.1,
    music: 1.3,
    'home-decor': 0.7,
    wellness: 0.6,
    fashion: 0.7,
    gardening: 0.8,
  },
  partner: {
    jewellery: 1.5,
    'jewellery-personal': 1.4,
    experience: 1.4,
    fashion: 1.3,
    'food-drink': 1.3,
    wellness: 1.3,
    'intimate-apparel': 1.2,
    'home-decor': 1.1,
    music: 1.2,
    art: 1.1,
    stationery: 0.7,
    games: 0.8,
    outdoor: 1.0,
  },
  parent: {
    'home-decor': 1.4,
    kitchen: 1.4,
    wellness: 1.3,
    gardening: 1.4,
    'food-drink': 1.3,
    books: 1.2,
    'personal-care': 1.2,
    experience: 1.1,
    tech: 1.0,
    fashion: 1.0,
    games: 0.7,
    music: 1.0,
    art: 1.1,
  },
  friend: {
    experience: 1.4,
    'food-drink': 1.3,
    games: 1.3,
    tech: 1.2,
    books: 1.2,
    music: 1.3,
    art: 1.2,
    outdoor: 1.2,
    fashion: 1.1,
    'home-decor': 1.0,
    wellness: 1.0,
    stationery: 1.0,
  },
  colleague: {
    stationery: 1.5,
    tech: 1.3,
    'food-drink': 1.4,
    books: 1.3,
    'home-decor': 1.1,
    experience: 1.1,
    jewellery: 0.6,
    fashion: 0.7,
    wellness: 0.8,
    games: 0.8,
    outdoor: 0.8,
    music: 0.9,
    art: 1.0,
  },
  sibling: {
    tech: 1.3,
    games: 1.3,
    fashion: 1.2,
    experience: 1.3,
    'food-drink': 1.2,
    music: 1.3,
    art: 1.2,
    outdoor: 1.2,
    books: 1.1,
    'home-decor': 0.9,
    wellness: 1.0,
    stationery: 0.9,
  },
  other: {
    'food-drink': 1.3,
    books: 1.2,
    'home-decor': 1.2,
    stationery: 1.2,
    experience: 1.1,
    tech: 1.0,
    fashion: 1.0,
    wellness: 1.0,
    jewellery: 0.8,
    games: 0.9,
    outdoor: 1.0,
    music: 1.0,
    art: 1.0,
  },
};

// ─── Category display labels ───────────────────────────────────────
export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  tech: 'Tech & Gadgets',
  kitchen: 'Kitchen & Dining',
  wellness: 'Wellness & Self-care',
  books: 'Books & Reading',
  'home-decor': 'Home Décor',
  fashion: 'Fashion & Accessories',
  outdoor: 'Outdoor & Adventure',
  stationery: 'Stationery & Writing',
  'food-drink': 'Food & Drink',
  experience: 'Experiences',
  jewellery: 'Jewellery',
  'jewellery-personal': 'Personal Jewellery',
  'intimate-apparel': 'Intimate Apparel',
  'personal-care': 'Personal Care',
  games: 'Games & Puzzles',
  music: 'Music',
  art: 'Art & Craft',
  gardening: 'Gardening & Plants',
};

// ─── Recommender System Weights ────────────────────────────────────
// Swapped: rb is now dominant (60%) so appropriateness drives results.
// cb (40%) refines based on personality tag matching.
export const RS_WEIGHTS = {
  cold_start: { cb: 0.40, cf: 0.00, rb: 0.60 },
  early: { cb: 0.35, cf: 0.15, rb: 0.50 },
  mature: { cb: 0.30, cf: 0.30, rb: 0.40 },
  scale: { cb: 0.25, cf: 0.40, rb: 0.35 },
};

export const RS_RESULT_COUNT = 8;
export const CF_GLOBAL_THRESHOLD = 500;

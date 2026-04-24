import type { RelationshipType, OccasionType, PersonalityTag, ItemCategory } from '@/types';

// ─── Template Libraries ────────────────────────────────────────────

const CB_TEMPLATES = [
  'Perfect because your {relationship} is a {top_personality_tag} at heart — this fits right into their world.',
  'Chosen for its {item_category} appeal, which matches your {relationship}\'s love of {personality_tag_display}.',
  'A {top_personality_tag} will absolutely treasure this — it speaks their language.',
  'Handpicked for someone who lives and breathes {personality_tag_display} — this one just feels right.',
  'Because every {top_personality_tag} deserves something that matches their vibe — and this nails it.',
  'Your {relationship} loves all things {personality_tag_display}, and this was practically made for them.',
  'A thoughtful pick that perfectly channels their inner {top_personality_tag}.',
  'This screams {personality_tag_display} energy — your {relationship} will know you truly get them.',
];

const CF_TEMPLATES = [
  'People who gifted similar items for a {occasion} also loved this — and so did their recipients.',
  'A crowd favourite among {occasion} gifts for {relationship}s with similar tastes.',
  'Consistently picked by people who know their {relationship} well — this one has a track record.',
  'Trending among gift-givers looking for the perfect {occasion} surprise.',
  'Highly rated by people shopping for their {relationship} on a similar {occasion}.',
  'One of the most-saved gifts for this exact combination — tried, tested, and loved.',
];

const RB_TEMPLATES = [
  'Perfectly suited for a {occasion} gift — hits every note for a {relationship}.',
  'The ideal {occasion} gesture — thoughtful, appropriate, and memorable.',
  'Made for this exact moment: a {occasion} for someone who means a lot.',
  'A classic {occasion} choice that balances thoughtfulness with style for your {relationship}.',
  'Right in the sweet spot for a {relationship}\'s {occasion} — appropriate, elegant, and personal.',
  'Exactly the kind of gift that makes a {occasion} feel truly special.',
  'A {occasion} pick that says "I thought about this" — because you did.',
  'Curated for the occasion: a {occasion} gift your {relationship} will remember.',
];

// ─── Display Label Helpers ──────────────────────────────────────────

const relationshipLabels: Record<RelationshipType, string> = {
  partner: 'partner',
  parent: 'parent',
  friend: 'friend',
  colleague: 'colleague',
  child: 'child',
  sibling: 'sibling',
  other: 'loved one',
};

const occasionLabels: Record<OccasionType, string> = {
  birthday: 'birthday',
  anniversary: 'anniversary',
  holiday: 'holiday',
  'just-because': 'just-because',
  graduation: 'graduation',
  wedding: 'wedding',
  other: 'special occasion',
};

const personalityLabels: Record<PersonalityTag, string> = {
  outdoorsy: 'the outdoors',
  bookworm: 'Bookworm',
  foodie: 'Foodie',
  'tech-lover': 'Tech Lover',
  artist: 'Artist',
  homebody: 'Homebody',
  wellness: 'Wellness',
  gamer: 'Gamer',
  traveller: 'Traveller',
  'music-lover': 'Music Lover',
};

const categoryLabels: Record<string, string> = {
  tech: 'tech',
  kitchen: 'culinary',
  wellness: 'wellness',
  books: 'literary',
  'home-decor': 'home décor',
  fashion: 'fashion',
  outdoor: 'outdoor',
  stationery: 'stationery',
  'food-drink': 'gourmet',
  experience: 'experiential',
  jewellery: 'jewellery',
  'jewellery-personal': 'personal jewellery',
  'intimate-apparel': 'intimate',
  'personal-care': 'self-care',
  games: 'gaming',
  music: 'music',
  art: 'artisan',
  gardening: 'green',
};

interface RationaleInput {
  dominantSignal: 'cb' | 'cf' | 'rb';
  relationship: RelationshipType;
  occasion: OccasionType;
  topPersonalityTag: PersonalityTag;
  allPersonalityTags: PersonalityTag[];
  itemCategory: ItemCategory;
  randomSeed?: number; // For deterministic template selection in tests
}

/**
 * Generate a "Perfect because…" rationale string.
 */
export function generateRationale(input: RationaleInput): string {
  const { dominantSignal, randomSeed } = input;

  let templates: string[];
  switch (dominantSignal) {
    case 'cb':
      templates = CB_TEMPLATES;
      break;
    case 'cf':
      templates = CF_TEMPLATES;
      break;
    case 'rb':
    default:
      templates = RB_TEMPLATES;
      break;
  }

  // Select template (randomised or seeded)
  const idx = randomSeed !== undefined
    ? randomSeed % templates.length
    : Math.floor(Math.random() * templates.length);
  let template = templates[idx];

  // Substitute variables
  template = template.replace(/\{relationship\}/g, relationshipLabels[input.relationship]);
  template = template.replace(/\{occasion\}/g, occasionLabels[input.occasion]);
  template = template.replace(/\{top_personality_tag\}/g, personalityLabels[input.topPersonalityTag]);
  template = template.replace(/\{personality_tag_display\}/g, personalityLabels[input.topPersonalityTag]);
  template = template.replace(/\{item_category\}/g, categoryLabels[input.itemCategory] || input.itemCategory);

  return template;
}

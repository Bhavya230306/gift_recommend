// ─── Item Catalogue ───────────────────────────────────────────────
export interface GiftItem {
  id: string;
  name: string;
  price_inr: number;
  category: ItemCategory;
  occasion_tags: OccasionType[];
  relationship_tags: RelationshipType[];
  personality_tags: PersonalityTag[];
  image_url: string;
  shop_url: string;
  avg_rating: number;
  interaction_count: number;
}

// ─── Enums ────────────────────────────────────────────────────────
export type RelationshipType =
  | 'partner'
  | 'parent'
  | 'friend'
  | 'colleague'
  | 'child'
  | 'sibling'
  | 'other';

export type OccasionType =
  | 'birthday'
  | 'anniversary'
  | 'holiday'
  | 'just-because'
  | 'graduation'
  | 'wedding'
  | 'other';

export type PersonalityTag =
  | 'outdoorsy'
  | 'bookworm'
  | 'foodie'
  | 'tech-lover'
  | 'artist'
  | 'homebody'
  | 'wellness'
  | 'gamer'
  | 'traveller'
  | 'music-lover';

export type ItemCategory =
  | 'tech'
  | 'kitchen'
  | 'wellness'
  | 'books'
  | 'home-decor'
  | 'fashion'
  | 'outdoor'
  | 'stationery'
  | 'food-drink'
  | 'experience'
  | 'jewellery'
  | 'jewellery-personal'
  | 'intimate-apparel'
  | 'personal-care'
  | 'games'
  | 'music'
  | 'art'
  | 'gardening';

// ─── Questionnaire ────────────────────────────────────────────────
export interface QuizPayload {
  relationship: RelationshipType;
  occasion: OccasionType;
  personality_tags: PersonalityTag[];
  budget_max_inr: number;
  notes: string;
}

// ─── API Response ─────────────────────────────────────────────────
export interface RecommendResponse {
  session_id: string;
  weights_used: { cb: number; cf: number; rb: number };
  phase: 'cold_start' | 'early' | 'mature' | 'scale';
  results: ScoredGiftItem[];
  total_pool_size: number;
}

export interface ScoredGiftItem {
  id: string;
  name: string;
  price_inr: number;
  category: ItemCategory;
  image_url: string;
  shop_url: string;
  rationale: string;
  score: number;
  dominant_signal: 'cb' | 'cf' | 'rb';
}

// ─── Wishlist ─────────────────────────────────────────────────────
export interface WishlistItem extends ScoredGiftItem {
  saved_at: number; // Unix timestamp
}

import type { GiftItem, QuizPayload, ScoredGiftItem, RecommendResponse } from '@/types';
import { ruleBasedFilter } from './ruleBasedFilter';
import { contentBasedScore } from './contentBasedScorer';
import { collaborativeFilterScore, getCurrentPhase } from './collaborativeFilter';
import { generateRationale } from './rationaleGenerator';
import { RS_WEIGHTS, RS_RESULT_COUNT } from '@/lib/constants';
import { v4 as uuidv4 } from 'uuid';

// Global interaction count — in MVP this is always 0 (cold start)
const GLOBAL_INTERACTIONS = 0;

/**
 * Main Recommender System Engine
 *
 * Pipeline:
 * 1. Rule-Based Filter → hard constraints + affinity scoring
 * 2. Content-Based Scorer → personality match (weighted overlap)
 * 3. Collaborative Filter → community signal (0 at MVP)
 * 4. Weighted Score Aggregation
 * 5. Sort + Paginate top N
 * 6. Rationale Generation
 */
export function runRecommendationEngine(
  catalogue: GiftItem[],
  payload: QuizPayload,
  page: number = 0
): RecommendResponse {
  const sessionId = uuidv4();

  // 1. Determine phase and weights
  const phase = getCurrentPhase(GLOBAL_INTERACTIONS);
  const weights = RS_WEIGHTS[phase];

  // 2. Rule-Based Filter
  const rbResults = ruleBasedFilter(catalogue, payload);

  if (rbResults.length === 0) {
    return {
      session_id: sessionId,
      weights_used: weights,
      phase,
      results: [],
      total_pool_size: 0,
    };
  }

  // 3. Score each surviving item
  const scored = rbResults.map(({ item, rbScore }) => {
    // Content-Based Score
    const cbScore = contentBasedScore(
      item,
      payload.personality_tags,
      payload.notes
    );

    // Collaborative Filter Score
    const profileKey = `${payload.relationship}_${payload.occasion}_${payload.personality_tags.sort().join(',')}`;
    const cfScore = collaborativeFilterScore(item.id, profileKey);

    // Weighted Final Score
    const finalScore =
      weights.cb * cbScore +
      weights.cf * cfScore +
      weights.rb * rbScore;

    // Determine dominant signal
    const scores = { cb: cbScore, cf: cfScore, rb: rbScore };
    const dominant = (Object.keys(scores) as Array<'cb' | 'cf' | 'rb'>).reduce(
      (a, b) => (scores[a] * weights[a] > scores[b] * weights[b] ? a : b)
    );

    return {
      item,
      cbScore,
      cfScore,
      rbScore,
      finalScore,
      dominant,
    };
  });

  // 4. Sort by final score descending
  scored.sort((a, b) => b.finalScore - a.finalScore);

  // 4b. Category Diversification Penalty
  // Penalize items if their category has already appeared frequently among higher-ranked items
  const categoryCounts: Record<string, number> = {};
  for (let i = 0; i < scored.length; i++) {
    const cat = scored[i].item.category;
    const count = categoryCounts[cat] || 0;
    // apply a penalty for every previous occurrence of this category
    scored[i].finalScore -= (count * 0.15); 
    categoryCounts[cat] = count + 1;
  }
  
  // Re-sort after penalties
  scored.sort((a, b) => b.finalScore - a.finalScore);

  // 5. Paginate — take the correct slice based on page number
  const startIdx = page * RS_RESULT_COUNT;
  const totalPool = scored.length;

  let topN;
  if (startIdx >= scored.length) {
    // If page exceeds the pool, wrap around and shuffle
    const shuffled = [...scored];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    topN = shuffled.slice(0, RS_RESULT_COUNT);
  } else {
    topN = scored.slice(startIdx, startIdx + RS_RESULT_COUNT);
  }

  // 6. Generate rationale and build response
  const results: ScoredGiftItem[] = topN.map((entry, idx) => {
    const topTag = payload.personality_tags[0] || 'homebody';

    const rationale = generateRationale({
      dominantSignal: entry.dominant,
      relationship: payload.relationship,
      occasion: payload.occasion,
      topPersonalityTag: topTag,
      allPersonalityTags: payload.personality_tags,
      itemCategory: entry.item.category,
      randomSeed: idx, // Use index for variety within a single result set
    });

    return {
      id: entry.item.id,
      name: entry.item.name,
      price_inr: entry.item.price_inr,
      category: entry.item.category,
      image_url: entry.item.image_url,
      shop_url: entry.item.shop_url,
      rationale,
      score: Math.round(entry.finalScore * 1000) / 1000,
      dominant_signal: entry.dominant,
    };
  });

  return {
    session_id: sessionId,
    weights_used: weights,
    phase,
    results,
    total_pool_size: totalPool,
  };
}

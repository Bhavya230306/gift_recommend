import type { GiftItem, PersonalityTag } from '@/types';
import { tokenize } from '@/lib/utils';

/**
 * Content-Based Scorer — Weighted overlap on personality tags
 * with optional free-text notes boost.
 *
 * Uses weighted overlap instead of pure Jaccard to avoid bias
 * toward items with fewer personality tags.
 *
 * Formula:
 *   score = 0.7 * (matchCount / userTagCount)   ← "how well does this item cover the user's interests?"
 *         + 0.3 * (matchCount / itemTagCount)   ← "how focused is this item on what the user wants?"
 */
export function contentBasedScore(
  item: GiftItem,
  userTags: PersonalityTag[],
  notes: string
): number {
  if (userTags.length === 0) return 0;

  const userSet = new Set(userTags);
  const itemSet = new Set(item.personality_tags);

  const matchCount = [...userSet].filter((tag) => itemSet.has(tag)).length;

  if (matchCount === 0 && (!notes || notes.trim().length === 0)) return 0;

  // Weighted overlap: rewards absolute coverage, not just ratio
  const userCoverage = matchCount / userSet.size;  // What % of user interests are covered?
  const itemRelevance = itemSet.size > 0 ? matchCount / itemSet.size : 0; // What % of item tags are relevant?

  let cbScore = 0.7 * userCoverage + 0.3 * itemRelevance;

  // Free-text notes boost
  if (notes && notes.trim().length > 0) {
    const noteTokens = tokenize(notes);
    const itemTokens = [
      ...item.personality_tags,
      ...tokenize(item.name),
      ...tokenize(item.category),
    ];

    const hasMatch = noteTokens.some((token) =>
      itemTokens.some((itemToken) => itemToken.includes(token) || token.includes(itemToken))
    );

    if (hasMatch) {
      cbScore = Math.min(1.0, cbScore + 0.1);
    }
  }

  return cbScore;
}

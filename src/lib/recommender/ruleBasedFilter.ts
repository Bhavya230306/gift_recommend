import type { GiftItem, QuizPayload } from '@/types';
import { RELATIONSHIP_CATEGORY_EXCLUSIONS, CATEGORY_AFFINITY } from '@/lib/constants';

interface RBResult {
  item: GiftItem;
  rbScore: number;
}

/**
 * Rule-Based Filter — Hard constraints + affinity scoring.
 * Items that fail any hard rule are excluded entirely.
 * Surviving items get an RB score based on:
 *   - 0.4 base (occasion + relationship match)
 *   - 0.3 personality tag overlap bonus
 *   - 0.3 category-relationship affinity bonus
 */
export function ruleBasedFilter(items: GiftItem[], payload: QuizPayload): RBResult[] {
  const { relationship, occasion, budget_max_inr, personality_tags } = payload;
  const excludedCategories = RELATIONSHIP_CATEGORY_EXCLUSIONS[relationship] || [];
  const affinityMap = CATEGORY_AFFINITY[relationship] || {};

  return items
    .filter((item) => {
      // Hard constraint 1: price within budget
      if (item.price_inr > budget_max_inr) return false;

      // Hard constraint 2: category exclusion by relationship
      if (excludedCategories.includes(item.category)) return false;

      return true;
    })
    .map((item) => {
      // --- Component 1: Base match & Soft Constraints (Max 0.4) ---
      let baseScore = 0.0;
      // Natural fit boosts
      if (item.occasion_tags.includes(occasion)) baseScore += 0.2;
      if (item.relationship_tags.includes(relationship)) baseScore += 0.2;

      // --- Component 2: Personality tag overlap bonus (Max 0.3) ---
      // How many of the user's personality tags does this item match?
      const userTags = new Set(personality_tags);
      const matchingTags = item.personality_tags.filter((t) =>
        userTags.has(t as typeof personality_tags[number])
      ).length;
      const personalityBonus = personality_tags.length > 0
        ? 0.3 * (matchingTags / personality_tags.length)
        : 0;

      // --- Component 3: Category affinity bonus (Max 0.3) ---
      // How appropriate is this item's category for the relationship?
      const affinity = affinityMap[item.category] ?? 1.0;
      // Normalize affinity: 0.6 → 0.0, 1.0 → 0.5, 1.5 → 1.0
      const normalizedAffinity = Math.max(0, Math.min(1, (affinity - 0.6) / 0.9));
      const affinityBonus = 0.3 * normalizedAffinity;

      // --- Component 4: Budget utilization bonus (Max 0.15, with Penalty) ---
      // Favor items that make reasonable use of the available budget
      const budgetUtil = item.price_inr / budget_max_inr;
      let budgetBonus = 0.15 * budgetUtil;
      
      // Penalty for recommending items that are extremely cheap compared to the max_budget
      if (budgetUtil < 0.15 && budget_max_inr > 3000) {
        budgetBonus -= 0.5; // Significant penalty if it uses less than 15% of a large budget
      }

      const rbScore = Math.max(0, baseScore + personalityBonus + affinityBonus + budgetBonus);

      return { item, rbScore };
    });
}

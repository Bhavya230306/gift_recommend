/**
 * Collaborative Filter — MVP Stub
 *
 * At cold-start (< 500 global interactions), CF weight = 0%.
 * This module is scaffolded for future implementation.
 * It would read from a co-occurrence matrix and return a CF score.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function collaborativeFilterScore(_itemId: string, _profileKey: string): number {
  // MVP: Always return 0.0 — cold start, no interaction data
  return 0.0;
}

/**
 * Get the current RS phase based on global interaction count.
 */
export function getCurrentPhase(globalInteractions: number): 'cold_start' | 'early' | 'mature' | 'scale' {
  if (globalInteractions < 500) return 'cold_start';
  if (globalInteractions < 5000) return 'early';
  if (globalInteractions < 50000) return 'mature';
  return 'scale';
}

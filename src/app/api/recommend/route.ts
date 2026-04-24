import { NextResponse } from 'next/server';
import { runRecommendationEngine } from '@/lib/recommender/engine';
import type { GiftItem, QuizPayload, RelationshipType, OccasionType, PersonalityTag } from '@/types';
import itemsData from '@/data/items.json';

const VALID_RELATIONSHIPS: RelationshipType[] = ['partner', 'parent', 'friend', 'colleague', 'child', 'sibling', 'other'];
const VALID_OCCASIONS: OccasionType[] = ['birthday', 'anniversary', 'holiday', 'just-because', 'graduation', 'wedding', 'other'];
const VALID_PERSONALITIES: PersonalityTag[] = ['outdoorsy', 'bookworm', 'foodie', 'tech-lover', 'artist', 'homebody', 'wellness', 'gamer', 'traveller', 'music-lover'];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate payload
    const errors: string[] = [];

    if (!body.relationship || !VALID_RELATIONSHIPS.includes(body.relationship)) {
      errors.push('relationship');
    }
    if (!body.occasion || !VALID_OCCASIONS.includes(body.occasion)) {
      errors.push('occasion');
    }
    if (
      !body.personality_tags ||
      !Array.isArray(body.personality_tags) ||
      body.personality_tags.length < 1 ||
      body.personality_tags.length > 4 ||
      !body.personality_tags.every((t: string) => VALID_PERSONALITIES.includes(t as PersonalityTag))
    ) {
      errors.push('personality_tags');
    }
    if (
      body.budget_max_inr === undefined ||
      typeof body.budget_max_inr !== 'number' ||
      body.budget_max_inr < 100 ||
      body.budget_max_inr > 999999
    ) {
      errors.push('budget_max_inr');
    }
    if (body.notes && typeof body.notes === 'string' && body.notes.length > 200) {
      errors.push('notes');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'validation_failed', fields: errors },
        { status: 400 }
      );
    }

    const payload: QuizPayload = {
      relationship: body.relationship,
      occasion: body.occasion,
      personality_tags: body.personality_tags,
      budget_max_inr: body.budget_max_inr,
      notes: body.notes || '',
    };

    // Page parameter for shuffle / pagination
    const page = typeof body.page === 'number' && body.page >= 0 ? body.page : 0;

    // Run recommender engine
    const catalogue = itemsData as GiftItem[];
    const response = runRecommendationEngine(catalogue, payload, page);

    if (response.results.length === 0) {
      return NextResponse.json(
        {
          error: 'no_results',
          message: 'No items match your budget and occasion. Try adjusting your budget.',
        },
        { status: 422 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('RS failure:', error);
    return NextResponse.json(
      { error: 'rs_failure', message: 'Recommendation engine encountered an error.' },
      { status: 500 }
    );
  }
}

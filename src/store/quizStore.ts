'use client';

import { create } from 'zustand';
import type { RelationshipType, OccasionType, PersonalityTag, ScoredGiftItem } from '@/types';

interface QuizState {
  // Form state
  step: number;
  relationship: RelationshipType | null;
  occasion: OccasionType | null;
  personalityTags: PersonalityTag[];
  budgetMax: number;
  notes: string;

  // Results
  results: ScoredGiftItem[] | null;
  sessionId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setRelationship: (r: RelationshipType) => void;
  setOccasion: (o: OccasionType) => void;
  togglePersonalityTag: (tag: PersonalityTag) => void;
  setBudgetMax: (budget: number) => void;
  setNotes: (notes: string) => void;
  setResults: (results: ScoredGiftItem[], sessionId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  relationship: null as RelationshipType | null,
  occasion: null as OccasionType | null,
  personalityTags: [] as PersonalityTag[],
  budgetMax: 2000,
  notes: '',
  results: null as ScoredGiftItem[] | null,
  sessionId: null as string | null,
  isLoading: false,
  error: null as string | null,
};

export const useQuizStore = create<QuizState>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  setRelationship: (relationship) => set({ relationship }),
  setOccasion: (occasion) => set({ occasion }),

  togglePersonalityTag: (tag) =>
    set((state) => {
      const current = state.personalityTags;
      if (current.includes(tag)) {
        return { personalityTags: current.filter((t) => t !== tag) };
      }
      if (current.length >= 4) return state; // Max 4 tags
      return { personalityTags: [...current, tag] };
    }),

  setBudgetMax: (budgetMax) => set({ budgetMax }),
  setNotes: (notes) => set({ notes: notes.slice(0, 200) }),

  setResults: (results, sessionId) => set({ results, sessionId, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  reset: () => set(initialState),
}));

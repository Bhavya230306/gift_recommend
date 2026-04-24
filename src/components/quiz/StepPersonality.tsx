'use client';

import { useQuizStore } from '@/store/quizStore';
import { PERSONALITY_TAGS, MAX_PERSONALITY_TAGS } from '@/lib/constants';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function StepPersonality() {
  const personalityTags = useQuizStore((s) => s.personalityTags);
  const togglePersonalityTag = useQuizStore((s) => s.togglePersonalityTag);
  const nextStep = useQuizStore((s) => s.nextStep);
  const prevStep = useQuizStore((s) => s.prevStep);
  const atLimit = personalityTags.length >= MAX_PERSONALITY_TAGS;

  return (
    <div className="glass-card-static p-8 sm:p-10">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--color-text-primary)', fontWeight: 600, textAlign: 'center' }}>
        Describe their vibe
      </h2>
      <p className="text-center mt-2 mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-muted)' }}>
        Select up to {MAX_PERSONALITY_TAGS} personality traits that describe them best.
      </p>
      <p className="text-center mb-8" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: atLimit ? 'var(--color-text-accent)' : 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
        {personalityTags.length}/{MAX_PERSONALITY_TAGS} SELECTED
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {PERSONALITY_TAGS.map((tag) => {
          const isSelected = personalityTags.includes(tag.value);
          const isDisabled = atLimit && !isSelected;
          return (
            <button
              key={tag.value}
              onClick={() => togglePersonalityTag(tag.value)}
              className={`tag ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              disabled={isDisabled}
              role="checkbox"
              aria-checked={isSelected}
              aria-label={tag.label}
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <button className="btn-secondary" onClick={prevStep}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button className="btn-primary" disabled={personalityTags.length === 0} onClick={nextStep}>
          Next Step <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

'use client';

import { useQuizStore } from '@/store/quizStore';
import { RELATIONSHIPS } from '@/lib/constants';
import type { RelationshipType } from '@/types';
import { ArrowRight } from 'lucide-react';

export default function StepRelationship() {
  const relationship = useQuizStore((s) => s.relationship);
  const setRelationship = useQuizStore((s) => s.setRelationship);
  const nextStep = useQuizStore((s) => s.nextStep);

  return (
    <div className="glass-card-static p-8 sm:p-10">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--color-text-primary)', fontWeight: 600, textAlign: 'center' }}>
        Who is this gift for?
      </h2>
      <p className="text-center mt-2 mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-muted)' }}>
        Select your relationship with the recipient.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {RELATIONSHIPS.map((r) => (
          <button
            key={r.value}
            onClick={() => setRelationship(r.value)}
            className="p-4 rounded-2xl text-center transition-all duration-200 cursor-pointer"
            style={{
              background: relationship === r.value ? 'rgba(123,47,255,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${relationship === r.value ? 'rgba(123,47,255,0.6)' : 'rgba(255,255,255,0.08)'}`,
              color: relationship === r.value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)',
            }}
            aria-pressed={relationship === r.value}
          >
            <div className="text-2xl mb-1">{r.icon}</div>
            <div className="text-sm font-medium">{r.label}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button className="btn-primary" disabled={!relationship} onClick={nextStep}>
          Next Step <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

'use client';

import { useQuizStore } from '@/store/quizStore';
import { OCCASIONS } from '@/lib/constants';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function StepOccasion() {
  const occasion = useQuizStore((s) => s.occasion);
  const setOccasion = useQuizStore((s) => s.setOccasion);
  const nextStep = useQuizStore((s) => s.nextStep);
  const prevStep = useQuizStore((s) => s.prevStep);

  return (
    <div className="glass-card-static p-8 sm:p-10">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--color-text-primary)', fontWeight: 600, textAlign: 'center' }}>
        What&apos;s the occasion?
      </h2>
      <p className="text-center mt-2 mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-muted)' }}>
        This helps us customize the vibe of our picks.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {OCCASIONS.map((o) => (
          <button
            key={o.value}
            onClick={() => setOccasion(o.value)}
            className="p-4 rounded-2xl text-center transition-all duration-200 cursor-pointer"
            style={{
              background: occasion === o.value ? 'rgba(123,47,255,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${occasion === o.value ? 'rgba(123,47,255,0.6)' : 'rgba(255,255,255,0.08)'}`,
              color: occasion === o.value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)',
            }}
            aria-pressed={occasion === o.value}
          >
            <div className="text-2xl mb-1">{o.icon}</div>
            <div className="text-sm font-medium">{o.label}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button className="btn-secondary" onClick={prevStep}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button className="btn-primary" disabled={!occasion} onClick={nextStep}>
          Next Step <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

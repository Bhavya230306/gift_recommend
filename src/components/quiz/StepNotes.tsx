'use client';

import { useQuizStore } from '@/store/quizStore';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';

interface StepNotesProps {
  onSubmit: () => void;
}

export default function StepNotes({ onSubmit }: StepNotesProps) {
  const notes = useQuizStore((s) => s.notes);
  const setNotes = useQuizStore((s) => s.setNotes);
  const prevStep = useQuizStore((s) => s.prevStep);
  const isLoading = useQuizStore((s) => s.isLoading);
  const error = useQuizStore((s) => s.error);

  return (
    <div className="glass-card-static p-8 sm:p-10">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--color-text-primary)', fontWeight: 600, textAlign: 'center' }}>
        Anything else we should know?
      </h2>
      <p className="text-center mt-2 mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-muted)' }}>
        Optional — share any details that might help us find the perfect gift.
      </p>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        maxLength={200}
        rows={4}
        placeholder='e.g. "She loves cozy evenings and tea" or "He just got a new apartment"'
        className="w-full rounded-2xl p-4 resize-none transition-all duration-200 focus:outline-none"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-body)',
        }}
        aria-label="Additional notes about the recipient"
      />
      <p className="text-right mt-1" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--color-text-muted)' }}>
        {notes.length}/200
      </p>

      {error && (
        <div className="mt-4 p-3 rounded-xl text-center" style={{ background: 'rgba(255,45,120,0.1)', border: '1px solid rgba(255,45,120,0.3)', color: '#FF6B9D', fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)' }}>
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button className="btn-secondary" onClick={prevStep} disabled={isLoading}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button className="btn-primary" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Finding Gifts...
            </>
          ) : (
            <>
              Find My Gifts <Sparkles className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

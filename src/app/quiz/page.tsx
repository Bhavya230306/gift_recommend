'use client';

import { useQuizStore } from '@/store/quizStore';
import { motion, AnimatePresence } from 'framer-motion';
import StepRelationship from '@/components/quiz/StepRelationship';
import StepOccasion from '@/components/quiz/StepOccasion';
import StepPersonality from '@/components/quiz/StepPersonality';
import StepBudget from '@/components/quiz/StepBudget';
import StepNotes from '@/components/quiz/StepNotes';
import { useRouter } from 'next/navigation';

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function QuizPage() {
  const step = useQuizStore((s) => s.step);
  const router = useRouter();
  const store = useQuizStore();

  const handleSubmit = async () => {
    store.setLoading(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          relationship: store.relationship,
          occasion: store.occasion,
          personality_tags: store.personalityTags,
          budget_max_inr: store.budgetMax,
          notes: store.notes,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        store.setError(err.message || 'Something went wrong');
        return;
      }
      const data = await res.json();
      store.setResults(data.results, data.session_id);
      router.push('/results');
    } catch {
      store.setError('Network error. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <StepRelationship />;
      case 2: return <StepOccasion />;
      case 3: return <StepPersonality />;
      case 4: return <StepBudget />;
      case 5: return <StepNotes onSubmit={handleSubmit} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8" role="list" aria-label="Quiz progress">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center gap-2" role="listitem" aria-current={s === step ? 'step' : undefined}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                fontFamily: 'var(--font-mono)',
                background: s === step ? 'var(--gradient-cta)' : s < step ? 'rgba(123,47,255,0.3)' : 'rgba(255,255,255,0.05)',
                color: s <= step ? '#fff' : 'var(--color-text-muted)',
                border: s === step ? 'none' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {s < step ? '✓' : s}
            </div>
            {s < 5 && (
              <div
                className="w-8 h-0.5 rounded"
                style={{ background: s < step ? 'rgba(123,47,255,0.5)' : 'rgba(255,255,255,0.08)' }}
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
        STEP {step} OF 5
      </p>

      {/* Step Content */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={step}
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

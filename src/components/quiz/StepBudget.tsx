'use client';

import { useQuizStore } from '@/store/quizStore';
import { BUDGET_MIN, BUDGET_MAX } from '@/lib/constants';
import { formatINR, logSliderToValue, valueToLogSlider } from '@/lib/utils';
import { ArrowRight, ArrowLeft, Minus, Plus } from 'lucide-react';

export default function StepBudget() {
  const budgetMax = useQuizStore((s) => s.budgetMax);
  const setBudgetMax = useQuizStore((s) => s.setBudgetMax);
  const nextStep = useQuizStore((s) => s.nextStep);
  const prevStep = useQuizStore((s) => s.prevStep);

  const sliderPos = valueToLogSlider(budgetMax, BUDGET_MIN, BUDGET_MAX);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pos = parseFloat(e.target.value);
    setBudgetMax(logSliderToValue(pos, BUDGET_MIN, BUDGET_MAX));
  };

  const adjust = (delta: number) => {
    const next = Math.max(BUDGET_MIN, Math.min(BUDGET_MAX, budgetMax + delta));
    setBudgetMax(Math.round(next / 100) * 100);
  };

  return (
    <div className="glass-card-static p-8 sm:p-10">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--color-text-primary)', fontWeight: 600, textAlign: 'center' }}>
        Set your budget
      </h2>
      <p className="text-center mt-2 mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-muted)' }}>
        We&apos;ll only show gifts within your budget.
      </p>

      {/* Budget Display */}
      <div className="text-center mb-8">
        <div
          className="text-4xl sm:text-5xl font-bold"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'var(--gradient-cta)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {formatINR(budgetMax)}
        </div>
        <p className="mt-1" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
          MAXIMUM BUDGET
        </p>
      </div>

      {/* Slider with stepper buttons */}
      <div className="flex items-center gap-4">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-muted)' }}
          onClick={() => adjust(-100)}
          aria-label="Decrease budget by 100"
        >
          <Minus className="w-4 h-4" />
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={sliderPos}
          onChange={handleSlider}
          className="budget-slider flex-1"
          aria-label={`Budget: ${formatINR(budgetMax)}`}
          aria-valuemin={BUDGET_MIN}
          aria-valuemax={BUDGET_MAX}
          aria-valuenow={budgetMax}
          aria-valuetext={formatINR(budgetMax)}
        />

        <button
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-muted)' }}
          onClick={() => adjust(100)}
          aria-label="Increase budget by 100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Range Labels */}
      <div className="flex justify-between mt-2">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--color-text-muted)' }}>
          {formatINR(BUDGET_MIN)}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--color-text-muted)' }}>
          {formatINR(BUDGET_MAX)}+
        </span>
      </div>

      <div className="mt-8 flex justify-between">
        <button className="btn-secondary" onClick={prevStep}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button className="btn-primary" onClick={nextStep}>
          Next Step <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

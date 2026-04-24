'use client';

import { useQuizStore } from '@/store/quizStore';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, ArrowLeft, SlidersHorizontal, Sparkles } from 'lucide-react';
import GiftCard from '@/components/results/GiftCard';
import type { ScoredGiftItem } from '@/types';
import Link from 'next/link';

type SortMode = 'best' | 'price-asc' | 'price-desc';

export default function ResultsPage() {
  const results = useQuizStore((s) => s.results);
  const isLoading = useQuizStore((s) => s.isLoading);
  const store = useQuizStore();
  const router = useRouter();
  const [sortMode, setSortMode] = useState<SortMode>('best');
  const [shuffleKey, setShuffleKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const sorted = useMemo(() => {
    if (!results) return [];
    const copy = [...results];
    switch (sortMode) {
      case 'price-asc':
        return copy.sort((a, b) => a.price_inr - b.price_inr);
      case 'price-desc':
        return copy.sort((a, b) => b.price_inr - a.price_inr);
      default:
        return copy.sort((a, b) => b.score - a.score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, sortMode, shuffleKey]);

  const handleShuffle = useCallback(async () => {
    if (!store.relationship) return;
    setIsShuffling(true);
    try {
      const nextPage = page + 1;
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          relationship: store.relationship,
          occasion: store.occasion,
          personality_tags: store.personalityTags,
          budget_max_inr: store.budgetMax,
          notes: store.notes,
          page: nextPage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        store.setResults(data.results, data.session_id);
        setPage(nextPage);
        setSortMode('best');
        setShuffleKey((k) => k + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsShuffling(false);
    }
  }, [store, page]);

  const handleNewSearch = () => {
    store.reset();
    router.push('/');
  };

  if (!mounted) return null;

  // No results — redirect to quiz
  if (!results || results.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-6">🔍</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--color-text-primary)' }}>
          No recommendations yet
        </h1>
        <p className="mt-3 mb-8" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
          Complete the questionnaire to get personalized gift recommendations.
        </p>
        <Link href="/quiz" className="btn-primary no-underline">
          Start the Quiz <Sparkles className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', color: 'var(--color-text-primary)', fontWeight: 600 }}>
          Divine Finds for Your{' '}
          <span style={{ background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {store.relationship ? store.relationship.charAt(0).toUpperCase() + store.relationship.slice(1) : 'Loved One'}
          </span>
        </h1>
        <p className="mt-2" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
          {results.length} curated picks, ranked by our recommendation engine.
        </p>
      </motion.div>

      {/* Sort/Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
          <div className="flex gap-1.5">
            {(['best', 'price-asc', 'price-desc'] as SortMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setSortMode(mode)}
                className="px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: sortMode === mode ? 'rgba(123,47,255,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${sortMode === mode ? 'rgba(123,47,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  color: sortMode === mode ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                }}
              >
                {mode === 'best' ? 'Best Match' : mode === 'price-asc' ? 'Low → High' : 'High → Low'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="btn-secondary text-xs" onClick={handleNewSearch}>
            <ArrowLeft className="w-3.5 h-3.5" /> New Search
          </button>
          <button className="btn-secondary text-xs" onClick={handleShuffle} disabled={isShuffling}>
            <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} /> {isShuffling ? 'Shuffling...' : 'Shuffle'}
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((item, idx) => (
          <GiftCard key={item.id} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
}

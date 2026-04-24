'use client';

import { useQuizStore } from '@/store/quizStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { motion } from 'framer-motion';
import { formatINR, getCategoryIcon } from '@/lib/utils';
import { Heart, ExternalLink } from 'lucide-react';
import type { ScoredGiftItem } from '@/types';
import { useState, useEffect } from 'react';

interface GiftCardProps {
  item: ScoredGiftItem;
  index: number;
}

export default function GiftCard({ item, index }: GiftCardProps) {
  const addItem = useWishlistStore((s) => s.addItem);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(isInWishlist(item.id));
  }, [item.id, isInWishlist]);

  const toggleSave = () => {
    if (saved) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
    setSaved(!saved);
  };

  const categoryIcon = getCategoryIcon(item.category);

  return (
    <motion.article
      className="glass-card overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
    >
      {/* Image placeholder */}
      <div
        className="relative h-48 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, rgba(123,47,255,0.15) 0%, rgba(255,45,120,0.1) 100%)`,
        }}
      >
        <span className="text-6xl">{categoryIcon}</span>
        {/* Save button */}
        <button
          onClick={toggleSave}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
          style={{
            background: saved ? 'rgba(255,45,120,0.3)' : 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: 'none',
          }}
          aria-label={`${saved ? 'Remove' : 'Save'} ${item.name} ${saved ? 'from' : 'to'} wishlist`}
          aria-pressed={saved}
        >
          <Heart
            className="w-4 h-4 transition-all"
            style={{ color: saved ? '#FF2D78' : 'rgba(255,255,255,0.7)', fill: saved ? '#FF2D78' : 'none' }}
          />
        </button>
        {/* Category badge */}
        <div
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            color: 'var(--color-text-accent)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {item.category.replace('-', ' ')}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        <h3
          className="text-base font-semibold leading-tight mb-1"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}
        >
          {item.name}
        </h3>

        <div
          className="text-lg font-bold mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'var(--gradient-cta)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {formatINR(item.price_inr)}
        </div>

        {/* Rationale */}
        <div className="rationale flex-1">{item.rationale}</div>

        {/* Shop Now */}
        <a
          href={item.shop_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full mt-4 text-sm no-underline text-center"
        >
          Shop Now <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

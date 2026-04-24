'use client';

import { useWishlistStore } from '@/store/wishlistStore';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Share2, Sparkles, X } from 'lucide-react';
import { formatINR, getCategoryIcon } from '@/lib/utils';
import Link from 'next/link';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const lastRemoved = useWishlistStore((s) => s.lastRemoved);
  const undoRemove = useWishlistStore((s) => s.undoRemove);
  const clearLastRemoved = useWishlistStore((s) => s.clearLastRemoved);
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => { setMounted(true); }, []);

  // Undo snackbar timer
  useEffect(() => {
    if (lastRemoved) {
      setShowToast(true);
      setToastMessage(`"${lastRemoved.name}" removed`);
      const timer = setTimeout(() => {
        clearLastRemoved();
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastRemoved, clearLastRemoved]);

  const handleShare = useCallback(() => {
    const ids = items.map((i) => i.id).join(',');
    const url = `${window.location.origin}/wishlist?items=${ids}`;
    navigator.clipboard.writeText(url).then(() => {
      setToastMessage('Wishlist link copied to clipboard!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  }, [items]);

  const handleUndo = () => {
    undoRemove();
    setShowToast(false);
  };

  if (!mounted) return null;

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
          Your Saved{' '}
          <span style={{ background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Gifts
          </span>
        </h1>
        {items.length > 0 && (
          <div className="flex items-center justify-center gap-3 mt-4">
            <span style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: 'var(--text-small)' }}>
              {items.length} item{items.length !== 1 ? 's' : ''} saved
            </span>
            <button className="btn-secondary text-xs" onClick={handleShare}>
              <Share2 className="w-3.5 h-3.5" /> Share Wishlist
            </button>
          </div>
        )}
      </motion.div>

      {/* Empty State */}
      {items.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(123,47,255,0.1)' }}>
            <Heart className="w-10 h-10" style={{ color: 'var(--color-text-accent)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', color: 'var(--color-text-primary)' }}>
            No saved gifts yet
          </h2>
          <p className="mt-3 mb-8 max-w-md" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
            Explore our recommendations and save the ones you love. They&apos;ll appear here.
          </p>
          <Link href="/quiz" className="btn-primary no-underline">
            Start a New Search <Sparkles className="w-4 h-4" />
          </Link>
        </motion.div>
      )}

      {/* Wishlist Grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                className="glass-card overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                {/* Image */}
                <div
                  className="relative h-40 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(123,47,255,0.15) 0%, rgba(255,45,120,0.1) 100%)' }}
                >
                  <span className="text-5xl">{getCategoryIcon(item.category)}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
                    style={{ background: 'rgba(255,45,120,0.2)', border: 'none' }}
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    <Trash2 className="w-3.5 h-3.5" style={{ color: '#FF6B9D' }} />
                  </button>
                </div>
                <div className="flex-1 flex flex-col p-5">
                  <h3 className="text-base font-semibold mb-1" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>
                    {item.name}
                  </h3>
                  <div className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)', background: 'var(--gradient-cta)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {formatINR(item.price_inr)}
                  </div>
                  <div className="rationale flex-1 text-xs">{item.rationale}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Undo Snackbar */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-6 left-1/2 toast flex items-center gap-3 z-50"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
          >
            <span>{toastMessage}</span>
            {lastRemoved && (
              <button
                onClick={handleUndo}
                className="px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                style={{ background: 'rgba(123,47,255,0.3)', border: 'none', color: 'var(--color-text-accent)' }}
              >
                Undo
              </button>
            )}
            <button
              onClick={() => { setShowToast(false); clearLastRemoved(); }}
              className="cursor-pointer"
              style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)' }}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

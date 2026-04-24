'use client';

import { create } from 'zustand';
import type { WishlistItem, ScoredGiftItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  lastRemoved: WishlistItem | null;

  addItem: (item: ScoredGiftItem) => void;
  removeItem: (id: string) => void;
  undoRemove: () => void;
  clearLastRemoved: () => void;
  isInWishlist: (id: string) => boolean;
  getCount: () => number;
}

// Helper to read from localStorage
function loadWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('gifted_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Helper to save to localStorage
function saveWishlist(items: WishlistItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('gifted_wishlist', JSON.stringify(items));
  } catch {
    // localStorage may be full or unavailable
  }
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: loadWishlist(),
  lastRemoved: null,

  addItem: (item) => {
    const existing = get().items;
    if (existing.some((i) => i.id === item.id)) return;
    const wishlistItem: WishlistItem = { ...item, saved_at: Date.now() };
    const updated = [wishlistItem, ...existing];
    saveWishlist(updated);
    set({ items: updated });
  },

  removeItem: (id) => {
    const existing = get().items;
    const removed = existing.find((i) => i.id === id);
    const updated = existing.filter((i) => i.id !== id);
    saveWishlist(updated);
    set({ items: updated, lastRemoved: removed || null });
  },

  undoRemove: () => {
    const { lastRemoved, items } = get();
    if (!lastRemoved) return;
    const updated = [lastRemoved, ...items];
    saveWishlist(updated);
    set({ items: updated, lastRemoved: null });
  },

  clearLastRemoved: () => set({ lastRemoved: null }),

  isInWishlist: (id) => get().items.some((i) => i.id === id),
  getCount: () => get().items.length,
}));

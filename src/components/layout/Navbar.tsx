'use client';

import Link from 'next/link';
import { Heart, Menu, X, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useWishlistStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const wishlistCount = mounted ? items.length : 0;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 nav-glass transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <Gift className="w-7 h-7 text-[var(--color-text-accent)] group-hover:scale-110 transition-transform" />
            <span
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              Gifted
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/#how-it-works"
              className="text-sm no-underline transition-colors hover:text-[var(--color-text-accent)]"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
            >
              How it Works
            </Link>
            <Link
              href="/wishlist"
              className="relative flex items-center gap-1.5 text-sm no-underline transition-colors hover:text-[var(--color-text-accent)]"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
              aria-label={`Wishlist, ${wishlistCount} items saved`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white bg-gradient-to-r from-[#7B2FFF] to-[#FF2D78]">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-text-primary)', background: 'transparent', border: 'none' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay md:hidden flex flex-col items-center justify-center gap-8" role="dialog" aria-label="Mobile navigation">
          <Link
            href="/#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="text-2xl no-underline"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            How it Works
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="text-2xl no-underline flex items-center gap-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            <Heart className="w-6 h-6" />
            Wishlist
            {wishlistCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-sm bg-gradient-to-r from-[#7B2FFF] to-[#FF2D78] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/quiz"
            onClick={() => setMenuOpen(false)}
            className="btn-primary text-lg no-underline mt-4"
          >
            Find a Gift
          </Link>
        </div>
      )}
    </>
  );
}

import { Gift } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t mt-auto"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
        background: 'rgba(8,11,26,0.6)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[var(--color-text-accent)]" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--color-text-primary)' }}>
                Gifted
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              The perfect gift, found by intelligence.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)' }}>
            <a href="#" className="no-underline transition-colors hover:text-[var(--color-text-accent)]" style={{ color: 'var(--color-text-muted)' }}>
              About
            </a>
            <a href="#" className="no-underline transition-colors hover:text-[var(--color-text-accent)]" style={{ color: 'var(--color-text-muted)' }}>
              Privacy Policy
            </a>
            <a href="#" className="no-underline transition-colors hover:text-[var(--color-text-accent)]" style={{ color: 'var(--color-text-muted)' }}>
              Contact
            </a>
          </div>
        </div>

        {/* Disclosure + Copyright */}
        <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', color: 'var(--color-text-muted)' }}>
            Gifted may earn a commission from qualifying purchases through affiliate links.
          </p>
          <p className="mt-2" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Gifted. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Star, Zap, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0, 0, 0.2, 1] as const, delay: i * 0.15 },
  }),
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* ─── Hero Section ─────────────────────────────────────── */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-4xl"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: 600,
            lineHeight: 1.1,
            color: 'var(--color-text-primary)',
          }}
        >
          The Perfect Gift,{' '}
          <span
            style={{
              background: 'var(--gradient-cta)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Found by AI
          </span>
        </motion.h1>

        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 max-w-2xl"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
          }}
        >
          Answer 5 quick questions about your recipient — and our intelligent algorithm
          delivers curated, ranked gift recommendations with a reason for every pick.
        </motion.p>

        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mt-10">
          <Link href="/quiz" className="btn-primary text-lg no-underline px-10 py-4">
            Find the Perfect Gift
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
          id="how-it-works"
        >
          <TrustBadge icon={<Sparkles className="w-5 h-5" />} text="1000+ Gifts Curated" />
          <TrustBadge icon={<Star className="w-5 h-5" />} text="4.8 Average Rating" />
          <TrustBadge icon={<Zap className="w-5 h-5" />} text="Smart Algorithm" />
        </motion.div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            How It Works
          </motion.h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell us about them',
                desc: 'Relationship, occasion, personality — answer 5 simple questions.',
                icon: '💬',
              },
              {
                step: '02',
                title: 'We work the magic',
                desc: 'Our hybrid engine scores 200+ gifts using personality & context matching.',
                icon: '✨',
              },
              {
                step: '03',
                title: 'Get perfect picks',
                desc: 'Receive 8 ranked suggestions with a "Perfect because…" rationale for each.',
                icon: '🎁',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                className="glass-card-static p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{
                    background: 'rgba(123,47,255,0.15)',
                    color: 'var(--color-text-accent)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  STEP {item.step}
                </div>
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 text-center">
        <motion.div
          className="max-w-3xl mx-auto glass-card-static p-12 sm:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
            }}
          >
            Ready to find the perfect gift?
          </h2>
          <p className="mt-4 mb-8" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
            It takes less than 90 seconds. No sign-up required.
          </p>
          <Link href="/quiz" className="btn-primary text-lg no-underline px-10 py-4">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-small)',
        color: 'var(--color-text-muted)',
      }}
    >
      <span style={{ color: 'var(--color-text-accent)' }}>{icon}</span>
      {text}
    </div>
  );
}

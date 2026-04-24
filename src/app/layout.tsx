import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackgroundOrbs from '@/components/layout/BackgroundOrbs';

export const metadata: Metadata = {
  title: 'Gifted — Smart Gift Recommendations, Found by Intelligence',
  description:
    'Gifted is an AI-powered gift recommendation engine. Answer 5 quick questions about your recipient and get 6–9 curated, ranked gift suggestions with human-readable rationale.',
  keywords: ['gift recommendations', 'AI gifting', 'smart gifts', 'personalized gifts', 'India'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <BackgroundOrbs />
        <Navbar />
        <main className="relative z-10 flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

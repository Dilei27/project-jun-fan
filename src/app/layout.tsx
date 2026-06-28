import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CommandPalette } from '@/features/command-palette/command-palette';
import { AIDock } from '@/features/ai-dock/ai-dock';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Jun Fan — Product Operating System',
  description: 'Plataforma front-end first de produtos, documentação e experiências técnicas. QA Command Center, WhatsApp AI Assistant, Vigilante AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary font-sans antialiased">
        <Header />
        <main className="flex-1 pt-14">
          {children}
        </main>
        <Footer />
        <CommandPalette />
        <AIDock />
      </body>
    </html>
  );
}

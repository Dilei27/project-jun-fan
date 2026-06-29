import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CommandPalette } from '@/features/command-palette/command-palette';
import { AIDock } from '@/features/ai-dock/ai-dock';
import { AtmosphereBackground } from '@/components/atmosphere/atmosphere-background';
import { ContextBar } from '@/components/platform/context-bar';
import { SenseiFab } from '@/components/platform/sensei-fab';
import { PlatformProvider } from '@/components/platform/platform-context';
import { LivingStatusBar } from '@/components/platform/living-status-bar';
import { WelcomeExperience } from '@/components/platform/welcome-experience';
import { ExplorationHistory } from '@/components/platform/exploration-history';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Jun Fan — Product Operating System',
  description:
    'Plataforma front-end first de produtos, documentação e experiências técnicas. QA Command Center, WhatsApp AI Assistant, Vigilante AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary font-sans antialiased relative">
        <a href="#main-content" className="jf-skip-link">Pular para o conteúdo</a>
        <AtmosphereBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <PlatformProvider>
            <Header />
            <main id="main-content" className="flex-1 pt-14" tabIndex={-1}>
              <ContextBar />
              {children}
            </main>
            <Footer />
            <CommandPalette />
            <AIDock />
            <SenseiFab />
            <LivingStatusBar />
            <WelcomeExperience />

            {/* Hot zone: exploration history in header area */}
            <div className="fixed top-14 right-4 z-40">
              <ExplorationHistory />
            </div>
          </PlatformProvider>
        </div>
      </body>
    </html>
  );
}

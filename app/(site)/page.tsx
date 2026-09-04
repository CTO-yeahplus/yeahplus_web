"use client";

import { Header, Footer } from "@/components/landing/Layout";
import { Hero, Ecosystem, CoreValues, TechStack, FinalCTA } from "@/components/landing/Sections";
import { TheArchitects, Roadmap } from "@/components/landing/NewSections";
import { LanguageProvider, useLanguage } from "@/lib/i18n";

// --- Helper: Sticky Section Shell ---
function SectionShell({
  id,
  title,
  number,
  children,
  className = "bg-black",
}: {
  id?: string;
  title?: string;
  number?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div id={id} className={`relative border-t border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {title && (
          <div className="lg:w-64 lg:shrink-0 pt-12 lg:pt-24 px-6 lg:border-r lg:border-white/5 relative">
            <div className="sticky top-24">
              <span className="block text-xs font-mono font-bold text-indigo-500 mb-2">{number}</span>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white">{title}</h2>
            </div>
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

function MainContent() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans relative">
      <Header />

      <div id="vision" className="bg-black pb-24 border-b border-white/5">
        <Hero />
      </div>

      <SectionShell id="products" number="01" title={lang === "ko" ? "생태계" : "The Ecosystem"} className="bg-[#080808]">
        <div className="pb-0">
          <Ecosystem />
        </div>
      </SectionShell>

      <SectionShell id="roadmap" number="02" title={lang === "ko" ? "우리의 DNA" : "Our DNA"} className="bg-[#080808]">
        <div className="-mt-24">
          <Roadmap />
        </div>
        <div className="-mt-24 pb-24">
          <TechStack />
        </div>
        <div className="pb-0">
          <CoreValues />
        </div>
        <div id="team" className="-mt-24">
          <TheArchitects />
        </div>
      </SectionShell>

      <FinalCTA />
      <Footer />
    </main>
  );
}

export default function LandingPage() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

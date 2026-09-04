"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/landing/Layout";
import { 
  Hero, DeviceShowcase, Ecosystem, VoicesSection,
  CoreValues, TechStack, FaqSection, FinalCTA,
  ProjectType, ArticleType, JobType
} from "@/components/landing/Sections";
import { TheArchitects, Careers, Roadmap, Newsletter } from "@/components/landing/NewSections";
import { ProjectModal, JournalModal, JobModal } from "@/components/landing/Modals"; 
// 💡 방금 만든 i18n 모듈 임포트
import { LanguageProvider, useLanguage } from "@/lib/i18n"; 

// --- Helper: Sticky Section Shell ---
function SectionShell({ id, title, number, children, className = "bg-black" }: any) {
  return (
    <div id={id} className={`relative border-t border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {title && (
          <div className="lg:w-64 lg:shrink-0 pt-12 lg:pt-24 px-6 lg:border-r lg:border-white/5 relative">
            <div className="sticky top-24">
               <span className="block text-xs font-mono font-bold text-indigo-500 mb-2">{number}</span>
               <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">{title}</h2>
            </div>
          </div>
        )}
        <div className={`flex-1 ${title ? 'pt-0 lg:pt-0' : ''}`}>{children}</div>
      </div>
    </div>
  );
}

function MainContent() {
  const [activeProject, setActiveProject] = useState<ProjectType>(null);
  const [activeArticle, setActiveArticle] = useState<ArticleType | null>(null);
  const [activeJob, setActiveJob] = useState<JobType | null>(null); 

  useEffect(() => {
    if (activeProject || activeArticle || activeJob) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeProject, activeArticle, activeJob]);

  // 💡 영어일 때 타이틀 변경 (필요시)
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans relative">
      <Header />
      
      <div id="vision" className="bg-black pb-24 border-b border-white/5">
        <Hero />
      </div>
      
      <SectionShell id="products" number="01" title={lang === 'ko' ? "생태계" : "The Ecosystem"} className="bg-[#080808]">
        <div className="pb-0"><Ecosystem /></div>
      </SectionShell>
      
      <SectionShell id="roadmap" number="02" title={lang === 'ko' ? "우리의 DNA" : "Our DNA"} className="bg-[#080808]">
        <div className="-mt-24"><Roadmap /></div>
        <div className="-mt-24 pb-24"><TechStack /></div>
        <div className="pb-0"><CoreValues /></div>
        <div id="team" className="-mt-24"><TheArchitects /></div>
      </SectionShell>

      <FinalCTA />
      <Footer />

      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
        {activeArticle && <JournalModal article={activeArticle} onClose={() => setActiveArticle(null)} />}
        {activeJob && <JobModal job={activeJob} onClose={() => setActiveJob(null)} />}
      </AnimatePresence>
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
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/landing/Layout";
import { 
  Hero, DeviceShowcase, Ecosystem, VoicesSection, SystemStatus, 
  CoreValues, TechStack, JournalSection, FaqSection, FinalCTA, 
  ProjectType, ArticleType, JobType 
} from "@/components/landing/Sections"; // SystemStatus import 확인
import { TheArchitects, EnginePlayground, Partners, Careers, Roadmap, Newsletter } from "@/components/landing/NewSections";
import { ProjectModal, JournalModal, JobModal } from "@/components/landing/Modals"; // JobModal 추가

// --- Helper: Sticky Section Shell (섹션 구분 강화) ---
function SectionShell({ 
  id, title, number, children, className = "bg-black" 
}: { 
  id?: string, title?: string, number?: string, children: React.ReactNode, className?: string 
}) {
  return (
    <div id={id} className={`relative border-t border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Sticky Sidebar Header (Desktop) */}
        {title && (
          <div className="lg:w-64 lg:shrink-0 pt-12 lg:pt-24 px-6 lg:border-r lg:border-white/5 relative">
            <div className="sticky top-24">
               <span className="block text-xs font-mono font-bold text-indigo-500 mb-2">{number}</span>
               <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">{title}</h2>
            </div>
          </div>
        )}
        
        {/* Content Area */}
        <div className={`flex-1 ${title ? 'pt-0 lg:pt-0' : ''}`}>
           {children}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [activeProject, setActiveProject] = useState<ProjectType>(null);
  const [activeArticle, setActiveArticle] = useState<ArticleType | null>(null);
  const [activeJob, setActiveJob] = useState<JobType | null>(null); // New State

  // Lock scroll
  useEffect(() => {
    if (activeProject || activeArticle || activeJob) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeProject, activeArticle, activeJob]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans">
      <Header />
      
      {/* 0. Vision (No Sidebar, Full Width) */}
      <div id="vision" className="bg-black pb-24 border-b border-white/5">
        <Hero />
        <DeviceShowcase />
        <Partners />
      </div>
      
      {/* 1. Products */}
      <SectionShell id="products" number="01" title="The Ecosystem" className="bg-[#080808]">
        <div className="pb-0"><Ecosystem onOpenProject={setActiveProject} /></div>
        <div className="-mt-32 pb-24"><EnginePlayground /></div>
      </SectionShell>
      
      {/* 2. Validation */}
      <SectionShell number="02" title="The Proof" className="bg-black">
         <div className="pb-0"><VoicesSection /></div>
         <div className="-mt-24 pb-24"><SystemStatus /></div>
      </SectionShell>
      
      {/* 3. Identity & Roadmap */}
      <SectionShell id="roadmap" number="03" title="Our DNA" className="bg-[#080808]">
        <div className="-mt-24"><Roadmap /></div>
        <div className="-mt-24 pb-24"><TechStack /></div>
        <div className="pb-0"><CoreValues /></div>
        <div id="team" className="-mt-24"><TheArchitects /></div>
      </SectionShell>
      
      {/* 4. Careers & Contact */}
      <SectionShell  number="04" title="Join Us" className="bg-black">
        <div className="pb-0"><JournalSection onOpenArticle={setActiveArticle} /></div>
        <div className="-mt-24"><Newsletter /></div>
        <div className="-mt-24" id="careers"><Careers onOpenJob={setActiveJob} /></div>
        <div className="-mt-24 pb-24"><FaqSection /></div>
      </SectionShell>

      <FinalCTA />
      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
        {activeArticle && <JournalModal article={activeArticle} onClose={() => setActiveArticle(null)} />}
        {activeJob && <JobModal job={activeJob} onClose={() => setActiveJob(null)} />}
      </AnimatePresence>
    </main>
  );
}
"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { 
  ArrowRight, Brain, Youtube, ChevronRight, Zap, Globe, Layers, 
  ArrowUpRight, Check, Play, Calendar, Clock, 
  Server, Activity, Shield // ✅ Server, Activity 아이콘 추가됨
} from "lucide-react";
import Link from "next/link";
import React, { useState, MouseEvent } from "react";
import { useLanguage } from "@/lib/i18n"; // 상단에 임포트 추가

// --- Types ---
export type ProjectType = "neurovoca" | "subtube" | null;
export type ArticleType = { id: string; category: string; title: string; date: string; content: React.ReactNode; };
export type JobType = { title: string; type: string; loc: string; desc: string; responsibilities: string[] };

// --- Helper Components ---
function Badge({ children, color }: { children: React.ReactNode, color: "blue" | "red" }) {
  const styles = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[color]}`}>{children}</span>;
}

function SpotlightCard({ 
  children, onClick, color 
}: { 
  children: React.ReactNode, onClick: () => void, color: string 
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="group relative border border-white/10 bg-zinc-900/50 overflow-hidden rounded-[2.5rem] cursor-pointer h-full"
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${color},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// --- 1. Hero ---
export function Hero() {
  const { t } = useLanguage(); // 💡 언어 데이터 불러오기

  return (
    <section className="pt-48 pb-10 px-6 flex flex-col items-center justify-center text-center whitespace-pre-line">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-8">
        <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter leading-[1] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-600">
          {t.hero.title}
        </h1>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed font-light mb-12">
        {t.hero.desc1}<br className="hidden md:block"/>
        {t.hero.desc2}
      </motion.p>
    </section>
  );
}

// --- 2. Device Showcase (Hybrid: Real UI + Live Motion) ---
export function DeviceShowcase() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] opacity-40 pointer-events-none animate-pulse" />
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
          {/* Mobile Mockup */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-[300px] h-[600px] bg-black border-[8px] border-[#2c2c2e] rounded-[3.5rem] overflow-hidden shadow-2xl relative flex flex-col group"
          >
             <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30 pointer-events-none" />
             <div className="relative w-full h-full bg-[#1c1c1e]">
                <img src="/img/mobile.png" alt="NeuroVoca App Interface" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"/>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-indigo-500/30 z-20 shadow-lg">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                   <span className="text-[10px] text-indigo-200 font-mono font-bold tracking-wide">FSRS ACTIVE</span>
                </div>
                <motion.div
                  className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-70 z-20"
                  style={{ boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-20" />
             </div>
          </motion.div>

          {/* Desktop Mockup */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[640px] aspect-[16/10] bg-[#1c1c1e] border-[8px] border-[#2c2c2e] rounded-2xl overflow-hidden shadow-2xl relative flex flex-col group"
          >
             <div className="w-full h-9 bg-[#2c2c2e] flex items-center px-4 gap-2 border-b border-black/20 z-20">
               <div className="flex gap-2 mr-4"><div className="w-3 h-3 rounded-full bg-[#FF5F57]"/><div className="w-3 h-3 rounded-full bg-[#FEBC2E]"/><div className="w-3 h-3 rounded-full bg-[#28C840]"/></div>
               <div className="flex-1 h-6 bg-black/20 rounded-md flex items-center px-3"><span className="text-[10px] text-zinc-500 font-mono flex items-center gap-2"><span className="text-zinc-600">🔒</span> sub-tube.com/dashboard</span></div>
             </div>
             <div className="relative w-full h-full bg-zinc-900">
                <img src="/img/labtop.png" alt="Sub-tube Dashboard Interface" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div 
                   className="absolute bottom-6 right-6 w-64 bg-zinc-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl z-30"
                   initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                >
                   <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2"><div className="p-1 rounded bg-indigo-500/20"><Zap className="w-3 h-3 text-indigo-400" /></div><span className="text-xs text-zinc-200 font-bold">Auto-Sync</span></div>
                      <span className="text-[9px] text-zinc-500 font-mono">2s ago</span>
                   </div>
                   <div className="font-mono text-[10px] text-zinc-400 h-5 overflow-hidden relative mb-2">
                      <motion.div animate={{ y: [0, -20, -40, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "circInOut", repeatDelay: 2 }}>
                        <div className="h-5 flex items-center gap-2"><Check className="w-3 h-3 text-green-500"/> Script extracted</div>
                        <div className="h-5 flex items-center gap-2"><Globe className="w-3 h-3 text-blue-500"/> Translating (EN→KR)</div>
                        <div className="h-5 flex items-center gap-2"><Youtube className="w-3 h-3 text-red-500"/> Applying to Channel</div>
                      </motion.div>
                   </div>
                   <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" animate={{ width: ["0%", "100%"] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
                   </div>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



// 💡 PremiumSpotlightCard 수정: 개별 컬러(hoverColor)를 지원하도록 변경
function PremiumSpotlightCard({ 
  children, 
  hoverColor = "rgba(255,255,255,0.05)" // 기본값은 화이트
}: { 
  children: React.ReactNode, 
  hoverColor?: string 
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="group relative border border-white/5 bg-[#0a0a0a] overflow-hidden rounded-[2rem] h-[500px] transition-all duration-500 hover:border-white/10"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${hoverColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full flex flex-col p-10 z-10">{children}</div>
    </div>
  );
}

export function Ecosystem() {
  const { t } = useLanguage(); // 💡 언어 데이터 불러오기
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-6 pb-12">
      
      {/* 1. NeuroVoca - Blue Tone */}
      <a href="https://neurovoca.co.kr" target="_blank" rel="noopener noreferrer" className="block group">
        <PremiumSpotlightCard hoverColor="rgba(59, 130, 246, 0.1)">
          <div className="flex flex-col h-full">
            
            {/* 💡 Visual Area: 뇌과학 알고리즘의 신경망을 추상적으로 표현 */}
            <div className="h-48 mb-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/10 flex items-center justify-center relative overflow-hidden">
               <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
               <Brain className="w-12 h-12 text-blue-400/80 z-10" />
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">NeuroVoca</h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-widest uppercase border border-blue-500/20">Live</span>
              </div>
              <p className="text-xl text-zinc-400 font-medium mb-6">{t.ecosystem.neuro.desc}</p>
              <div className="flex flex-wrap gap-2">
                {["FSRS 4.5", "기억 안정성", "개인화 알고리즘"].map((kw) => (
                  <span key={kw} className="px-3 py-1 rounded-full bg-blue-500/5 text-blue-300/50 text-xs border border-blue-500/10">{kw}</span>
                ))}
              </div>
            </div>
            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all">
              <span className="text-sm font-semibold text-blue-400 flex items-center gap-2">{t.ecosystem.visit} neurovoca.co.kr <ArrowUpRight className="w-4 h-4"/></span>
            </div>
          </div>
        </PremiumSpotlightCard>
      </a>

      {/* 2. Sub-tube - Red Tone */}
      <a href="https://sub-tube.com" target="_blank" rel="noopener noreferrer" className="block group">
        <PremiumSpotlightCard hoverColor="rgba(239, 68, 68, 0.1)">
          <div className="flex flex-col h-full">
            
            {/* 💡 Visual Area: 콘텐츠가 전 세계로 퍼져나가는 파동을 표현 */}
            <div className="h-48 mb-8 rounded-2xl bg-gradient-to-br from-red-900/20 to-transparent border border-red-500/10 flex items-center justify-center relative overflow-hidden">
               {[...Array(3)].map((_, i) => (
                 <motion.div key={i} animate={{ scale: [1, 2.5], opacity: [0.5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 1 }} className="absolute w-16 h-16 border border-red-500/30 rounded-full" />
               ))}
               <Youtube className="w-12 h-12 text-red-500/80 z-10" />
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-red-500 transition-colors">Sub-tube</h3>
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold tracking-widest uppercase border border-red-500/20">Live</span>
              </div>
              <p className="text-xl text-zinc-400 font-medium mb-6">{t.ecosystem.subtube.desc}</p>
              <div className="flex flex-wrap gap-2">
                {["3클릭 번역", "다국어 동기화", "트래픽 확장"].map((kw) => (
                  <span key={kw} className="px-3 py-1 rounded-full bg-red-500/5 text-red-400/50 text-xs border border-red-500/10">{kw}</span>
                ))}
              </div>
            </div>
            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all">
              <span className="text-sm font-semibold text-red-500 flex items-center gap-2">{t.ecosystem.neuro.desc} sub-tube.com <ArrowUpRight className="w-4 h-4"/></span>
            </div>
          </div>
        </PremiumSpotlightCard>
      </a>

      {/* 3. 대나무 숲 - Green Tone */}
      <div className="block group cursor-default">
        <PremiumSpotlightCard hoverColor="rgba(34, 197, 94, 0.1)">
          <div className="flex flex-col h-full">
            
            {/* 💡 Visual Area: 프라이버시와 평온함을 상징하는 블러 쉴드 */}
            <div className="h-48 mb-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-transparent border border-green-500/10 flex items-center justify-center relative overflow-hidden">
               <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="w-20 h-20 bg-green-500/10 backdrop-blur-md border border-green-500/20 rounded-2xl rotate-12 flex items-center justify-center z-10">
                 <span className="text-4xl opacity-50">🎋</span>
               </motion.div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-green-500 transition-colors">BambooForrest</h3>
                <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold tracking-widest uppercase border border-green-500/20">Beta</span>
              </div>
              <p className="text-xl text-zinc-400 font-medium mb-6">{t.ecosystem.bamboo.desc}</p>
              <div className="flex flex-wrap gap-2">
                {["자아 탐색", "AI 심리 상담", "프라이버시"].map((kw) => (
                  <span key={kw} className="px-3 py-1 rounded-full bg-green-500/5 text-green-400/50 text-xs border border-green-500/10">{kw}</span>
                ))}
              </div>
            </div>
            <div className="mt-auto">
              <span className="text-xs font-bold text-green-600 tracking-tighter uppercase">{t.ecosystem.coming}</span>
            </div>
          </div>
        </PremiumSpotlightCard>
      </div>

      {/* 4. AURA - Black & White Tone */}
      <a href="https://auraootd.com" target="_blank" rel="noopener noreferrer" className="block group">
        <PremiumSpotlightCard hoverColor="rgba(255, 255, 255, 0.08)">
          <div className="flex flex-col h-full">
            
            {/* 💡 Visual Area: 하이퍼로컬 날씨와 스타일링의 세련된 교차점 */}
            <div className="h-48 mb-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center relative overflow-hidden">
               <div className="absolute w-full h-full flex justify-center items-center opacity-20">
                 <div className="w-16 h-16 rounded-full border border-white rotate-45" />
                 <div className="w-16 h-16 rounded-full border border-white -translate-x-8" />
               </div>
               <span className="text-4xl z-10 opacity-80">✨</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-zinc-300 transition-colors">AURA</h3>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-widest uppercase border border-white/20">Live</span>
              </div>
              <p className="text-xl text-zinc-400 font-medium mb-6">{t.ecosystem.aura.desc}</p>
              <div className="flex flex-wrap gap-2">
                {["하이퍼로컬 날씨", "AI 스타일링", "실시간 OOTD"].map((kw) => (
                  <span key={kw} className="px-3 py-1 rounded-full bg-white/5 text-white/30 text-xs border border-white/10">{kw}</span>
                ))}
              </div>
            </div>
            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all">
              <span className="text-sm font-semibold text-white flex items-center gap-2">{t.ecosystem.visit} auraootd.com <ArrowUpRight className="w-4 h-4"/></span>
            </div>
          </div>
        </PremiumSpotlightCard>
      </a>

    </div>
  );
}

// --- 4. Voices ---
export function VoicesSection() {
  const reviews = [
    { product: "NeuroVoca", quote: "단어 암기가 게임보다 재미있을 수 있다는 걸 처음 알았습니다.", author: "Kim Min-jun", role: "Medical Student", color: "text-indigo-400" },
    { product: "Sub-tube", quote: "내 채널의 구세주입니다. 10분 만에 번역이 끝나요.", author: "Sarah Jenkins", role: "Global Vlogger", color: "text-red-400" },
    { product: "NeuroVoca", quote: "나만의 단어장과 AI가 대화하는 기능은 혁명입니다.", author: "Lee Ji-hyeon", role: "Instructor", color: "text-indigo-400" }
  ];
  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-16 text-center">Voices of Innovation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-[#111111] border border-white/5 relative group">
              <div className={`text-xs font-bold mb-4 uppercase tracking-wide ${r.color}`}>{r.product}</div>
              <p className="text-zinc-300 text-lg leading-relaxed mb-8 h-24">"{r.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm">{r.author[0]}</div>
                <div><div className="text-sm font-bold text-white">{r.author}</div><div className="text-xs text-zinc-500">{r.role}</div></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 5. System Status (Replaces Impact Metrics) ---
export function SystemStatus() {
  const stats = [
    { label: "System Latency", value: "< 200ms", desc: "Real-time AI Processing", icon: Zap },
    { label: "Global Availability", value: "99.9%", desc: "Enterprise-grade Uptime", icon: Server },
    { label: "Architecture", value: "Serverless", desc: "Infinite Scalability", icon: Activity },
  ];
  return (
    <section className="py-24 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
           <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Engine Performance</h3>
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono text-green-500">All Systems Operational</span>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group cursor-default border-l border-white/10 pl-8">
              <m.icon className="w-8 h-8 text-zinc-600 mb-6 group-hover:text-white transition-colors" />
              <div className="text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">{m.value}</div>
              <div className="text-sm font-bold text-zinc-400 mb-1">{m.label}</div>
              <p className="text-xs text-zinc-600 font-mono">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 6. Core Values ---
export function CoreValues() {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
            <div><Zap className="w-8 h-8 text-white mb-6 mx-auto md:mx-0"/><h4 className="text-lg font-bold text-white mb-3">Zero Latency.</h4><p className="text-zinc-500 leading-relaxed">기술은 기다림을 주어서는 안 됩니다.<br/>생각의 속도로 반응하는 경험을 설계합니다.</p></div>
            <div><Globe className="w-8 h-8 text-white mb-6 mx-auto md:mx-0"/><h4 className="text-lg font-bold text-white mb-3">Infinite Context.</h4><p className="text-zinc-500 leading-relaxed">단편적인 정보는 의미가 없습니다.<br/>무한한 맥락 속에서 지식을 연결합니다.</p></div>
            <div><Layers className="w-8 h-8 text-white mb-6 mx-auto md:mx-0"/><h4 className="text-lg font-bold text-white mb-3">Scientific Precision.</h4><p className="text-zinc-500 leading-relaxed">감각이 아닌 데이터로 증명합니다.<br/>가장 효율적인 경로를 알고리즘으로 제시합니다.</p></div>
          </div>
      </div>
    </section>
  );
}

// --- 7. Tech Stack ---
export function TechStack() {
  const techs = ["Next.js", "Supabase", "OpenAI", "Vercel", "Tailwind CSS", "Framer Motion"];
  return (
    <div className="py-16 border-t border-b border-white/5 bg-black overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-8">Built on Modern Infrastructure</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          {techs.map((tech) => <span key={tech} className="text-lg md:text-xl font-bold text-white cursor-default">{tech}</span>)}
        </div>
      </div>
    </div>
  );
}
// --- 9. FAQ ---
export function FaqSection() {
  const faqs = [
    { q: "NeuroVoca는 기존 앱과 무엇이 다른가요?", a: "기존 앱은 단순 반복에 그칩니다. NeuroVoca는 당신의 망각 곡선을 개별적으로 분석하는 FSRS 알고리즘을 사용합니다." },
    { q: "Sub-tube는 유튜브 스튜디오 없이 작동하나요?", a: "네, YouTube API 공식 파트너십을 통해 권한을 위임받아 원스톱으로 처리합니다." },
    { q: "B2B 솔루션도 있나요?", a: "교육 기관용 LMS와 MCN용 Enterprise 플랜이 준비되어 있습니다." },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { AnimatePresence, motion: m } = require("framer-motion"); 

  return (
    <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Questions.</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/5 pb-4">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex justify-between items-center py-4 text-left group">
                <span className="text-lg text-zinc-300 group-hover:text-white transition-colors font-medium">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-zinc-500 transition-transform ${openIndex === i ? "rotate-90" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="text-zinc-500 pb-4 leading-relaxed pl-1">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 10. Final CTA ---
export function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-black text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10 pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to transform?</h2>
        <p className="text-xl text-zinc-400 mb-10">We are looking for partners, creators, and visionaries.<br/>Join the ecosystem of YeahPlus.</p>
        <Link href="mailto:contact@yeahplus.co.kr" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">Contact Us <ArrowRight className="w-5 h-5" /></Link>
      </div>
    </section>
  );
}
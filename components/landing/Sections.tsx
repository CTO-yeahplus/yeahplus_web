"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { 
  ArrowRight, Brain, Youtube, ChevronRight, Zap, Globe, Layers, 
  ArrowUpRight, Check, Play, Calendar, Clock, 
  Server, Activity, Shield // ✅ Server, Activity 아이콘 추가됨
} from "lucide-react";
import Link from "next/link";
import { useState, MouseEvent } from "react";

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
  return (
    <section className="pt-48 pb-10 px-6 flex flex-col items-center justify-center text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-8">
        <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter leading-[1] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">
          Intelligence.<br />Humanized.
        </h1>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed font-light mb-12">
        We bridge the gap between complex AI and human potential.<br className="hidden md:block"/>
        YeahPlus builds the most elegant interfaces for learning and creation.
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

// --- 3. Ecosystem ---
export function Ecosystem({ onOpenProject }: { onOpenProject: (p: any) => void }) {
  return (
    <section className="px-6 py-24 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Our Ecosystem.</h2>
            <p className="text-zinc-500">Products that redefine their categories.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[640px] md:h-[600px]">
          {/* NeuroVoca Card */}
          <SpotlightCard onClick={() => onOpenProject("neurovoca")} color="rgba(99, 102, 241, 0.15)">
             <div className="flex flex-col h-full p-10 md:p-12 relative z-10">
                <div className="flex items-center justify-between mb-6">
                   <Badge color="blue">Education</Badge>
                   <ChevronRight className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
                <div className="mb-2"><h3 className="text-4xl font-bold text-white mb-2">NeuroVoca.</h3><p className="text-lg text-zinc-400 font-medium">Memory perfected by science.</p></div>
                <div className="flex-1 flex items-center justify-center relative my-4">
                   <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition-all duration-500 relative z-10"><Brain className="w-10 h-10 text-indigo-400" /></div>
                   {[...Array(3)].map((_, i) => (
                     <motion.div key={i} className="absolute border border-indigo-500/20 rounded-full" style={{ width: 160 + i * 60, height: 160 + i * 60 }} animate={{ rotate: 360 }} transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear", delay: i * 2 }} >
                       <div className="w-3 h-3 bg-indigo-400 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-lg shadow-indigo-500" />
                     </motion.div>
                   ))}
                   <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full blur-3xl" />
                </div>
                <div className="mt-auto"><p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-6">FSRS v4.5 알고리즘과 생성형 AI가 결합된 뇌과학 학습 플랫폼.</p><span className="text-indigo-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></span></div>
             </div>
          </SpotlightCard>

          {/* Sub-tube Card */}
          <SpotlightCard onClick={() => onOpenProject("subtube")} color="rgba(239, 68, 68, 0.15)">
             <div className="flex flex-col h-full p-10 md:p-12 relative z-10">
                <div className="flex items-center justify-between mb-6">
                   <Badge color="red">Productivity</Badge>
                   <ChevronRight className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
                <div className="mb-2"><h3 className="text-4xl font-bold text-white mb-2">Sub-tube.</h3><p className="text-lg text-zinc-400 font-medium">Your content. Everywhere.</p></div>
                <div className="flex-1 flex items-center justify-center relative my-4">
                   <motion.div className="absolute opacity-10 pointer-events-none" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}><Globe className="w-64 h-64 text-red-500" strokeWidth={0.5} /></motion.div>
                   {[...Array(3)].map((_, i) => (
                     <motion.div key={i} className="absolute border border-red-500/20 rounded-3xl" initial={{ width: "6rem", height: "6rem", opacity: 0.8 }} animate={{ width: ["6rem", "18rem"], height: ["6rem", "18rem"], opacity: [0.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: i * 0.8 }} />
                   ))}
                   <div className="w-24 h-24 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.2)] group-hover:shadow-[0_0_60px_rgba(239,68,68,0.4)] transition-all duration-500 relative z-20"><Youtube className="w-10 h-10 text-red-500" /></div>
                   {/* Language Tags */}
                   <motion.div className="absolute top-6 right-12 px-2 py-1 bg-zinc-900/80 border border-zinc-700 rounded text-[10px] text-zinc-300 font-mono shadow-lg" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>EN</motion.div>
                   <motion.div className="absolute bottom-10 left-10 px-2 py-1 bg-zinc-900/80 border border-zinc-700 rounded text-[10px] text-zinc-300 font-mono shadow-lg" animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>KR</motion.div>
                   <motion.div className="absolute bottom-16 right-16 px-2 py-1 bg-zinc-900/80 border border-zinc-700 rounded text-[10px] text-zinc-300 font-mono shadow-lg" animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>JP</motion.div>
                   <motion.div className="absolute top-12 left-14 px-2 py-1 bg-zinc-900/80 border border-zinc-700 rounded text-[10px] text-zinc-500 font-mono" animate={{ y: [0, 4, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>ES</motion.div>
                   <motion.div className="absolute -top-4 px-2 py-1 bg-zinc-900/80 border border-zinc-700 rounded text-[10px] text-zinc-500 font-mono" animate={{ y: [0, -3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}>CN</motion.div>
                   <motion.div className="absolute -bottom-2 px-2 py-1 bg-zinc-900/80 border border-zinc-700 rounded text-[10px] text-zinc-500 font-mono" animate={{ y: [0, 5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>FR</motion.div>
                </div>
                <div className="mt-auto"><p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-6">클릭 3번으로 끝나는 글로벌 확장. 번역부터 업로드까지.</p><span className="text-red-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></span></div>
             </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
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

// --- 8. Journal ---
export const JOURNAL_DATA: ArticleType[] = [
  { id: "vision", category: "Vision", title: "왜 우리는 단어장에 집착하는가?", date: "Oct 2, 2024", content: <><p className="mb-6">언어는 사고의 경계입니다. 우리가 사용하는 단어의 한계가 곧 우리가 인식할 수 있는 세상의 한계가 됩니다.</p><p>YeahPlus가 단순한 '암기 앱'이 아닌 '지식의 인터페이스'를 만드는 이유가 여기에 있습니다.</p></> },
  { id: "tech", category: "Technology", title: "FSRS v4.5: 기억의 유통기한을 계산하다", date: "Sep 15, 2024", content: <><p className="mb-6">인간의 뇌는 망각하도록 설계되었습니다. 이것은 버그가 아니라 기능입니다.</p><p>FSRS v4.5는 당신의 기억력에 대한 '개인화된 모델'을 만듭니다. 이것은 마법이 아닙니다. 수학입니다.</p></> },
  { id: "prod", category: "Productivity", title: "유튜브 자막 번역이 크리에이터 경제에 미치는 영향", date: "Aug 28, 2024", content: <><p className="mb-6">콘텐츠에는 국경이 없어야 합니다. 하지만 언어는 여전히 가장 높은 장벽입니다.</p><p>우리는 이 과정을 단 3번의 클릭으로 압축했습니다.</p></> }
];

export function JournalSection({ onOpenArticle }: { onOpenArticle: (a: ArticleType) => void }) {
  return (
    <section id="journal" className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">The Journal.</h2>
          <button className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group">View all archives <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></button>
        </div>
        <div className="space-y-6">
          {JOURNAL_DATA.map((article) => (
            <div key={article.id} onClick={() => onOpenArticle(article)} className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/5 hover:border-white/20 transition-colors cursor-pointer">
              <div className="mb-2 md:mb-0"><span className="text-xs font-bold text-indigo-400 mb-2 block uppercase tracking-wide">{article.category}</span><h3 className="text-xl md:text-2xl font-medium text-zinc-200 group-hover:text-white transition-colors">{article.title}</h3></div>
              <div className="flex items-center gap-4 mt-2 md:mt-0"><span className="text-sm text-zinc-600">{article.date}</span><div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"><ArrowUpRight className="w-4 h-4 transition-transform" /></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
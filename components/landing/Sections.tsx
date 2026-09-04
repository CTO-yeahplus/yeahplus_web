"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ArrowRight, Brain, Youtube, ChevronRight, Zap, Globe, Layers,
  ArrowUpRight, Check, Play, Calendar, Clock,
  Server, Activity, Shield, // ✅ Server, Activity 아이콘 추가됨
  Cat, Camera, Shirt, // ✅ 라이브 4개 앱 아이콘
  Dog, PlaneLanding, GraduationCap, Type, Dices, Moon // ✅ 신규 앱 아이콘
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
        {t.hero.desc1}<br className="hidden md:block"/>{" "}
        {t.hero.desc2}
      </motion.p>

      {/* 히어로 CTA — 첫 화면에서 다음 행동을 바로 고를 수 있게 한다. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto"
      >
        <a
          href="#products"
          className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-colors"
        >
          {t.hero.ctaPrimary}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="#roadmap"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-sm font-medium text-zinc-300 hover:text-white hover:border-white/40 transition-colors"
        >
          {t.hero.ctaSecondary}
        </a>
      </motion.div>
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

  // yeahplus 자체 제작 앱 — 라이브 4종 + 출시 준비 중 5종 (AI × Content)
  const apps: {
    name: string; Icon: typeof Brain; logo: string | null; logoBg: string; image: string | null;
    href: string; domain: string; accent: string; hover: string; desc: string; badges: readonly string[];
    status?: "live" | "soon"; fit?: "cover" | "contain";
  }[] = [
    { name: "묘해 (MYOHAE)", Icon: Cat, logo: "/meow/myohae_logo.png", logoBg: "#ffffff", image: "/img/meow.webp",
      href: "https://yeahplus.co.kr/meow", domain: "yeahplus.co.kr/meow",
      accent: "#a78bfa", hover: "rgba(124,77,255,0.12)", desc: t.ecosystem.meow.desc, badges: t.ecosystem.meow.badges },
    { name: "24STILLS", Icon: Camera, logo: "/24stills/24_logo.png", logoBg: "#0A0A0A", image: "/img/24stills.webp",
      href: "https://yeahplus.co.kr/24stills", domain: "yeahplus.co.kr/24stills",
      accent: "#e0b84e", hover: "rgba(212,175,70,0.12)", desc: t.ecosystem.stills.desc, badges: t.ecosystem.stills.badges },
    { name: "AURA", Icon: Shirt, logo: "/img/aura_logo_1k.png", logoBg: "#000000", image: "/img/aura.webp",
      href: "https://auraootd.com", domain: "auraootd.com",
      accent: "#f0a6c0", hover: "rgba(233,166,182,0.14)", desc: t.ecosystem.aura.desc, badges: t.ecosystem.aura.badges },
    { name: "뇌새김 (NeuroVoca)", Icon: Brain, logo: null, logoBg: "#ffffff", image: null,
      href: "https://neurovoca.co.kr", domain: "neurovoca.co.kr",
      accent: "#818cf8", hover: "rgba(79,70,229,0.14)", desc: t.ecosystem.neuro.desc, badges: t.ecosystem.neuro.badges },
    { name: "월덕 (WOLDEOK)", Icon: Moon, logo: "/img/woldeok_logo.png", logoBg: "#0f1424", image: "/img/woldeok_wide.webp",
      href: "https://woldeok.app", domain: "woldeok.app",
      accent: "#f6c86b", hover: "rgba(246,200,107,0.12)", desc: t.ecosystem.woldeok.desc, badges: t.ecosystem.woldeok.badges },
    { name: "멍해 (MUNGHAE)", Icon: Dog, logo: "/munghae/munghae_logo.png", logoBg: "#0e1330", image: "/munghae/ss.webp",
      href: "https://yeahplus.co.kr/munghae", domain: "yeahplus.co.kr/munghae",
      accent: "#f4c77b", hover: "rgba(244,199,123,0.12)", desc: t.ecosystem.munghae.desc, badges: t.ecosystem.munghae.badges, status: "soon" },
    { name: "TOWER 68", Icon: PlaneLanding, logo: "/tower68/tower68_logo.png", logoBg: "#0b1020", image: "/tower68/ss.webp",
      href: "https://yeahplus.co.kr/tower68", domain: "yeahplus.co.kr/tower68",
      accent: "#ffc93c", hover: "rgba(255,201,60,0.12)", desc: t.ecosystem.tower68.desc, badges: t.ecosystem.tower68.badges, status: "soon" },
    { name: "ARKE", Icon: GraduationCap, logo: "/arke/arke_logo.png", logoBg: "#f3f2f2", image: "/arke/ss.webp",
      href: "https://yeahplus.co.kr/arke", domain: "yeahplus.co.kr/arke",
      accent: "#c28d41", hover: "rgba(182,130,53,0.14)", desc: t.ecosystem.arke.desc, badges: t.ecosystem.arke.badges, status: "soon" },
    { name: "WORDFORGE", Icon: Type, logo: "/wordforge/wordforge_logo.png", logoBg: "#16130f", image: "/wordforge/ss.webp",
      href: "https://yeahplus.co.kr/wordforge", domain: "yeahplus.co.kr/wordforge",
      accent: "#ffd27a", hover: "rgba(255,210,122,0.12)", desc: t.ecosystem.wordforge.desc, badges: t.ecosystem.wordforge.badges, status: "soon" },
    { name: "PIPFORGE", Icon: Dices, logo: "/pipforge/pipforge_icon.png", logoBg: "#16130f", image: "/pipforge/ss.webp",
      href: "https://yeahplus.co.kr/pipforge", domain: "yeahplus.co.kr/pipforge",
      accent: "#e8a33d", hover: "rgba(232,163,61,0.14)", desc: t.ecosystem.pipforge.desc, badges: t.ecosystem.pipforge.badges, status: "soon" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-6 pb-12">
      {apps.map((app) => (
        <a key={app.name} href={app.href} target="_blank" rel="noopener noreferrer" className="block group">
          <PremiumSpotlightCard hoverColor={app.hover}>
            <div className="flex flex-col h-full">

              {/* Visual — 큰 이미지로 그리드 채우기 */}
              <div
                className="h-64 mb-8 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${app.accent}22, transparent)` }}
              >
                {app.image ? (
                  <>
                    {/* 세로 스크린샷·로고 아트는 흐린 배경 위에 전체를 보여준다 */}
                    {app.fit === "contain" && (
                      <Image
                        src={app.image}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 768px) 100vw, 560px"
                        className="object-cover scale-125 blur-2xl opacity-40"
                      />
                    )}
                    <Image
                      src={app.image}
                      alt={`${app.name} 미리보기`}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className={
                        app.fit === "contain"
                          ? "object-contain p-3 drop-shadow-[0_12px_32px_rgba(0,0,0,0.65)]"
                          : "object-cover"
                      }
                    />
                    {app.fit !== "contain" && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    )}
                  </>
                ) : (
                  <>
                    <div className="absolute w-32 h-32 rounded-full blur-2xl" style={{ background: `${app.accent}33` }} />
                    <app.Icon className="w-14 h-14 z-10" style={{ color: app.accent }} strokeWidth={1.5} />
                  </>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  {/* 앱 아이콘 — 타이틀 앞으로 */}
                  {app.logo ? (
                    <span className="w-9 h-9 rounded-[10px] overflow-hidden shrink-0 border border-white/10 shadow-md" style={{ background: app.logoBg }}>
                      <Image src={app.logo} alt={`${app.name} 로고`} width={72} height={72} className="w-full h-full object-cover" />
                    </span>
                  ) : (
                    <span className="w-9 h-9 rounded-[10px] shrink-0 flex items-center justify-center border" style={{ background: `${app.accent}1a`, borderColor: `${app.accent}33` }}>
                      <app.Icon className="w-5 h-5" style={{ color: app.accent }} strokeWidth={1.7} />
                    </span>
                  )}
                  <h3 className="text-3xl font-bold text-white transition-colors">{app.name}</h3>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border whitespace-nowrap"
                    style={
                      app.status === "soon"
                        ? { color: "#a1a1aa", borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.05)" }
                        : { color: app.accent, borderColor: `${app.accent}55`, background: `${app.accent}1a` }
                    }
                  >
                    {app.status === "soon" ? t.ecosystem.soon : "Live"}
                  </span>
                </div>
                <p className="text-xl text-zinc-400 font-medium mb-6">{app.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {app.badges.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 rounded-full text-xs border"
                      style={{ color: `${app.accent}cc`, borderColor: `${app.accent}22`, background: `${app.accent}0d` }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all">
                <span className="text-sm font-semibold flex items-center gap-2" style={{ color: app.accent }}>
                  {t.ecosystem.visit} {app.domain} <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </PremiumSpotlightCard>
        </a>
      ))}
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
  const { t } = useLanguage();
  const icons = [Zap, Globe, Layers];

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          {t.values.items.map((v, i) => {
            const Icon = icons[i];
            return (
              <div key={v.title}>
                <Icon className="w-8 h-8 text-white mb-6 mx-auto md:mx-0" />
                <h4 className="text-lg font-bold text-white mb-3">{v.title}</h4>
                <p className="text-zinc-500 leading-relaxed whitespace-pre-line">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- 7. Tech Stack ---
export function TechStack() {
  const { t } = useLanguage();
  const techs = ["Next.js", "Supabase", "OpenAI", "Vercel", "Tailwind CSS", "Framer Motion"];
  return (
    <div className="py-16 border-t border-b border-white/5 bg-black overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-8">{t.tech.label}</p>
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
  const { t } = useLanguage();

  return (
    <section className="py-32 px-6 bg-black text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10 pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{t.cta.title}</h2>
        <p className="text-xl text-zinc-400 mb-10 whitespace-pre-line">{t.cta.desc}</p>
        <Link href="mailto:contact@yeahplus.co.kr" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">{t.cta.button} <ArrowRight className="w-5 h-5" /></Link>
      </div>
    </section>
  );
}
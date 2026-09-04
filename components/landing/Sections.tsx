"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Brain, Zap, Globe, Layers,
  Cat, Camera, Shirt, // 라이브 앱
  Dog, PlaneLanding, GraduationCap, Type, Dices, Moon, // 신규 앱
  Spade, Pickaxe, Gem, // Forge 3종
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { MouseEvent } from "react";
import { useLanguage } from "@/lib/i18n"; // 상단에 임포트 추가

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

/** 자사 경로는 next/link 로 이동하고, 외부 도메인만 새 탭으로 연다. */
function AppCardLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className="block group">
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block group">
      {children}
    </a>
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
      href: "/meow", domain: "yeahplus.co.kr/meow",
      accent: "#a78bfa", hover: "rgba(124,77,255,0.12)", desc: t.ecosystem.meow.desc, badges: t.ecosystem.meow.badges },
    { name: "24STILLS", Icon: Camera, logo: "/24stills/24_logo.png", logoBg: "#0A0A0A", image: "/img/24stills.webp",
      href: "/24stills", domain: "yeahplus.co.kr/24stills",
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
      href: "/munghae", domain: "yeahplus.co.kr/munghae",
      accent: "#f4c77b", hover: "rgba(244,199,123,0.12)", desc: t.ecosystem.munghae.desc, badges: t.ecosystem.munghae.badges, status: "soon" },
    { name: "TOWER 68", Icon: PlaneLanding, logo: "/tower68/tower68_logo.png", logoBg: "#0b1020", image: "/tower68/ss.webp",
      href: "/tower68", domain: "yeahplus.co.kr/tower68",
      accent: "#ffc93c", hover: "rgba(255,201,60,0.12)", desc: t.ecosystem.tower68.desc, badges: t.ecosystem.tower68.badges, status: "soon" },
    { name: "ARKE", Icon: GraduationCap, logo: "/arke/arke_logo.png", logoBg: "#f3f2f2", image: "/arke/ss.webp",
      href: "/arke", domain: "yeahplus.co.kr/arke",
      accent: "#c28d41", hover: "rgba(182,130,53,0.14)", desc: t.ecosystem.arke.desc, badges: t.ecosystem.arke.badges, status: "soon" },
    { name: "WORDFORGE", Icon: Type, logo: "/wordforge/wordforge_logo.png", logoBg: "#16130f", image: "/wordforge/ss.webp",
      href: "/wordforge", domain: "yeahplus.co.kr/wordforge",
      accent: "#ffd27a", hover: "rgba(255,210,122,0.12)", desc: t.ecosystem.wordforge.desc, badges: t.ecosystem.wordforge.badges, status: "soon" },
    { name: "PIPFORGE", Icon: Dices, logo: "/pipforge/pipforge_icon.png", logoBg: "#16130f", image: "/pipforge/ss.webp",
      href: "/pipforge", domain: "yeahplus.co.kr/pipforge",
      accent: "#e8a33d", hover: "rgba(232,163,61,0.14)", desc: t.ecosystem.pipforge.desc, badges: t.ecosystem.pipforge.badges, status: "soon" },
    { name: "ACEFORGE", Icon: Spade, logo: null, logoBg: "#16130f", image: null,
      href: "/aceforge", domain: "yeahplus.co.kr/aceforge",
      accent: "#e8a33d", hover: "rgba(232,163,61,0.14)", desc: t.ecosystem.aceforge.desc, badges: t.ecosystem.aceforge.badges, status: "soon" },
    { name: "MINEFORGE", Icon: Pickaxe, logo: null, logoBg: "#16130f", image: null,
      href: "/mineforge", domain: "yeahplus.co.kr/mineforge",
      accent: "#ffc86e", hover: "rgba(255,200,110,0.14)", desc: t.ecosystem.mineforge.desc, badges: t.ecosystem.mineforge.badges, status: "soon" },
    { name: "JADEFORGE", Icon: Gem, logo: null, logoBg: "#0f1a14", image: null,
      href: "/jadeforge", domain: "yeahplus.co.kr/jadeforge",
      accent: "#7fd8a8", hover: "rgba(127,216,168,0.14)", desc: t.ecosystem.jadeforge.desc, badges: t.ecosystem.jadeforge.badges, status: "soon" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-6 pb-12">
      {apps.map((app) => (
        <AppCardLink key={app.name} href={app.href}>
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
        </AppCardLink>
      ))}
    </div>
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
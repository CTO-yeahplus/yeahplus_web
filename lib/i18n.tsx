"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// --- 1. Dictionaries (번역 데이터) ---
export const dictionaries = {
  ko: {
    nav: {
      vision: "비전",
      products: "제품",
      timeline: "타임라인",
      team: "팀",
      contact: "문의하기",
      menu: "메뉴 열기",
      close: "메뉴 닫기",
    },
    hero: {
      title: "AI × Content",
      desc1: "일상을 바꾸는 앱을 만듭니다.",
      desc2: "YeahPlus는 사진·필름·패션·학습에 AI를 더해, 매일 쓰는 앱을 직접 만듭니다.",
      ctaPrimary: "제품 보러가기",
      ctaSecondary: "회사 소개",
    },
    values: {
      items: [
        { title: "Zero Latency.", desc: "기술은 기다림을 주어서는 안 됩니다.\n생각의 속도로 반응하는 경험을 설계합니다." },
        { title: "Infinite Context.", desc: "단편적인 정보는 의미가 없습니다.\n무한한 맥락 속에서 지식을 연결합니다." },
        { title: "Scientific Precision.", desc: "감각이 아닌 데이터로 증명합니다.\n가장 효율적인 경로를 알고리즘으로 제시합니다." },
      ],
    },
    tech: { label: "우리가 쓰는 기술" },
    cta: {
      title: "함께 만들 준비가 되셨나요?",
      desc: "파트너, 크리에이터, 그리고 같은 방향을 보는 분들을 찾고 있습니다.\nYeahPlus 생태계에 합류하세요.",
      button: "문의하기",
    },
    footer: {
      contact: "문의",
      country: "대한민국",
      rights: "All rights reserved.",
      ceo: "대표",
      biz: "사업자등록번호",
      mailorder: "통신판매업신고",
    },
    ecosystem: {
      meow: { desc: "집에서 찍은 우리 냥이, AI 아트로 작품이 되다.", badges: ["AI 아트", "사진 꾸미기", "커뮤니티"] },
      stills: { desc: "한달 24컷, 3일의 기다림. 디지털 시대의 아날로그 필름.", badges: ["필름 18종", "AI 그레이딩", "3일 현상"] },
      aura: { desc: "오늘의 룩을 발견하고, 바로 따라 사는 패션·뷰티 커뮤니티.", badges: ["AI 개인화", "바로 쇼핑", "OOTD"] },
      neuro: { desc: "뇌과학이 설계한 AI 영어 암기 엔진.", badges: ["FSRS 4.5", "AI 맥락 학습", "개인화"] },
      woldeok: { desc: "생년월일만 넣으면 사주 원국과 오늘의 흐름을 읽어주는 운세.", badges: ["사주 원국", "오늘의 운세", "웹에서 바로"] },
      munghae: { desc: "우리 강아지의 하루를 AI가 그려주는 반려 다이어리.", badges: ["AI 아트", "생활공간", "반려 기록"] },
      tower68: { desc: "JFK 관제탑 31년, 1시간 68대. 손끝으로 하늘의 질서를.", badges: ["라인 드로잉", "버터 랜딩", "캐주얼 아케이드"] },
      arke: { desc: "오늘 뭘 풀지 정해주는 고2 수능 코치. 수학 + 영어.", badges: ["오답 진단", "AI 3단 해설", "개념맵"] },
      wordforge: { desc: "자모를 이어 낱말을 만들고 점수를 터뜨리는 워드 로그라이크.", badges: ["한글 조합", "로그라이크", "오프라인"] },
      pipforge: { desc: "주사위 눈을 직접 세공해 배율을 쌓는 주사위 로그라이크.", badges: ["주사위 세공", "참 45종", "광고 없음"] },
      visit: "방문하기",
      soon: "준비 중",
    },
    architect: {
      title: "The Architect",
      headline: "Engineering the bridge\nbetween Daily Life and Tech.",
      quote: "\"기술은 가장 복잡한 곳에서 태어나, 가장 단순한 형태로 우리와 만나야 합니다.\"",
      currentTitle: "인생네컷 (Life4Cuts) CTO",
      currentDesc: "글로벌 포토 키오스크 플랫폼의 기술 총괄로서, 비전 AI 및 클라우드 인프라 기반의 디지털 혁신을 진두지휘하고 있습니다.",
      careerTitle: "학계 및 산업계 수퍼바이저",
      careerDesc: "대학교수로 후학을 양성함과 동시에, 국내외 대형 프로젝트의 VFX/CG 수퍼바이저로서 압도적인 시각 기술의 기준을 제시했습니다.",
      originTitle: "Lucasfilm Ltd. 시니어 TD",
      originDesc: "조지 루카스가 설립한 세계 최고의 시각효과 스튜디오에서 글로벌 스탠다드의 기술적 완성도와 파이프라인을 경험했습니다."
    },
    roadmap: {
        title: "The Horizon.",
        subtitle: "From Genesis to AI × Content.",
        steps: [
          { year: "Future", title: "The Next", desc: "사진·필름·패션·학습·운세·게임을 넘어, 일상의 더 많은 순간으로 AI × Content를 확장합니다. 오늘 무엇을 보고 무엇을 할지, 그 사소한 선택까지 AI가 함께 완성하는 미래." },
          {
            year: "2026", title: "AI × Content 생태계",
            descMain: "사진·필름·패션·학습에 운세까지, 다섯 개의 라이브 서비스로 생태계를 넓혔습니다. 여기에 게임과 학습 앱 다섯 개가 출시를 준비하고 있습니다.",
            proj1Title: "라이브 — 묘해 · 24STILLS · AURA · 뇌새김 · 월덕",
            proj1Desc: "반려동물 AI 아트, 아날로그 필름, 취향 기반 패션·뷰티, 뇌과학 암기 엔진, 그리고 사주로 읽는 오늘의 흐름.",
            proj2Title: "준비 중 — 멍해 · TOWER 68 · ARKE · WORDFORGE · PIPFORGE",
            proj2Desc: "반려 다이어리와 고2 수능 코치, 그리고 관제·낱말·주사위 세 편의 아케이드 로그라이크."
          },
          { year: "2025", title: "뇌새김 (NeuroVoca)", desc: "기억의 유효기간을 재정의하다. 뇌과학 기반 AI 암기 엔진의 정식 런칭." },
          { year: "2024", title: "Content Labs", desc: "AI × Content 실험의 시작. 사진·영상·학습 도메인에서 아이디어를 프로토타이핑하며 방향을 다졌습니다." },
          { year: "2023", title: "Foundation", desc: "핵심 소프트웨어 납품 및 기술 검증 완료. 안정적인 엔진의 기반을 닦았습니다." },
          { year: "2022", title: "Genesis", desc: "YeahPlus 창업. 콘텐츠에 AI를 더해 일상을 확장하겠다는 비전의 시작." }
        ]
      }
  },
  en: {
    nav: {
      vision: "Vision",
      products: "Products",
      timeline: "Timeline",
      team: "Team",
      contact: "Contact Us",
      menu: "Open menu",
      close: "Close menu",
    },
    hero: {
      title: "AI × Content",
      desc1: "We build apps that reshape everyday life.",
      desc2: "YeahPlus adds AI to photos, film, fashion, and learning — apps we design and ship ourselves.",
      ctaPrimary: "See the products",
      ctaSecondary: "About us",
    },
    values: {
      items: [
        { title: "Zero Latency.", desc: "Technology should never make you wait.\nWe design experiences that answer at the speed of thought." },
        { title: "Infinite Context.", desc: "Fragments of information mean nothing.\nWe connect knowledge inside an endless context." },
        { title: "Scientific Precision.", desc: "We prove it with data, not instinct.\nAlgorithms find the most efficient path." },
      ],
    },
    tech: { label: "Built on Modern Infrastructure" },
    cta: {
      title: "Ready to build with us?",
      desc: "We are looking for partners, creators, and visionaries.\nJoin the ecosystem of YeahPlus.",
      button: "Contact Us",
    },
    footer: {
      contact: "Contact",
      country: "Korea (Republic of)",
      rights: "All rights reserved.",
      ceo: "CEO",
      biz: "Business Reg. No.",
      mailorder: "Mail-order Reg.",
    },
    ecosystem: {
      meow: { desc: "Your cat at home, turned into art by AI.", badges: ["AI Art", "Photo Decor", "Community"] },
      stills: { desc: "24 frames a day, a 3-day wait. Analog film in a digital age.", badges: ["18 Films", "AI Grading", "3-Day Develop"] },
      aura: { desc: "Discover today's look and shop it right away.", badges: ["AI Personalization", "Instant Shop", "OOTD"] },
      neuro: { desc: "An AI English memory engine designed by neuroscience.", badges: ["FSRS 4.5", "AI Context", "Personalized"] },
      woldeok: { desc: "Enter your birth date and read your saju chart and today's flow.", badges: ["Saju Chart", "Daily Fortune", "On the Web"] },
      munghae: { desc: "A companion diary where AI illustrates your dog's day.", badges: ["AI Art", "Living Space", "Pet Journal"] },
      tower68: { desc: "31 years in the JFK tower, 68 landings in one hour.", badges: ["Line Drawing", "Butter Landing", "Casual Arcade"] },
      arke: { desc: "A Korean SAT coach that decides what to study today. Math + English.", badges: ["Error Diagnosis", "3-Step AI Explainer", "Concept Map"] },
      wordforge: { desc: "Chain letters into words and blow up the score. A word roguelike.", badges: ["Hangul Assembly", "Roguelike", "Offline"] },
      pipforge: { desc: "Chisel your own dice and stack absurd multipliers.", badges: ["Dice Forging", "45 Charms", "No Ads"] },
      visit: "Visit",
      soon: "Coming Soon",
    },
    architect: {
      title: "The Architect",
      headline: "Engineering the bridge\nbetween Daily Life and Tech.",
      quote: "\"Technology is born in the most complex places, but must meet us in its simplest form.\"",
      currentTitle: "CTO @ Life4Cuts",
      currentDesc: "Leading digital innovation based on Vision AI and cloud infrastructure as the technical head of a global photo kiosk platform.",
      careerTitle: "Academic & VFX Supervisor",
      careerDesc: "Fostered future talents as a professor while setting the highest standards of visual technology as a VFX/CG supervisor for major global projects.",
      originTitle: "Senior TD @ Lucasfilm Ltd.",
      originDesc: "Experienced the technical perfection and pipelines of global standards at the world's premier visual effects studio founded by George Lucas."
    },
    roadmap: {
        title: "The Horizon.",
        subtitle: "From Genesis to AI × Content.",
        steps: [
          { year: "Future", title: "The Next", desc: "Beyond photos, film, fashion, learning, fortune, and games — expanding AI × Content into more moments of everyday life, down to the small choices of what to see and what to do today." },
          {
            year: "2026", title: "AI × Content Ecosystem",
            descMain: "Photos, film, fashion, learning — and now fortune. Five live services, with five more games and learning apps preparing to launch.",
            proj1Title: "LIVE — MYOHAE · 24STILLS · AURA · NeuroVoca · WOLDEOK",
            proj1Desc: "Pet photos as AI art, analog film in a digital age, taste-based fashion curation, a neuroscience memory engine, and today's flow read from your saju chart.",
            proj2Title: "COMING SOON — MUNGHAE · TOWER 68 · ARKE · WORDFORGE · PIPFORGE",
            proj2Desc: "A companion diary and a Korean SAT coach, plus three arcade roguelikes built on air traffic, words, and dice."
          },
          { year: "2025", title: "NeuroVoca", desc: "Redefining the expiration date of memory. Official launch of the neuroscience-based AI memorization engine." },
          { year: "2024", title: "Content Labs", desc: "The start of our AI × Content experiments — prototyping ideas across photo, video, and learning domains." },
          { year: "2023", title: "Foundation", desc: "Completion of core software delivery and technical verification. Laid the foundation for a stable engine." },
          { year: "2022", title: "Genesis", desc: "Founding of YeahPlus — a vision to expand everyday life by adding AI to content." }
        ]
      }
  }
};

type Language = "ko" | "en";
type Dictionary = typeof dictionaries.ko;

// --- 2. Context Setup ---
const LanguageContext = createContext<{
  lang: Language;
  toggleLang: () => void;
  t: Dictionary;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 서버 렌더와 첫 클라이언트 렌더를 'ko'로 맞춘 뒤, 마운트 후 저장값·브라우저 언어를 반영한다.
  const [lang, setLang] = useState<Language>("ko");

  useEffect(() => {
    let next: Language | null = null;
    try {
      const saved = localStorage.getItem("yp_site_lang");
      if (saved === "ko" || saved === "en") next = saved;
    } catch {}
    if (!next) next = (navigator.language || "ko").toLowerCase().startsWith("ko") ? "ko" : "en";
    if (next !== "ko") setLang(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("yp_site_lang", lang);
    } catch {}
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "ko" ? "en" : "ko"));
  const t = dictionaries[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
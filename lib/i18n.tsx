"use client";

import React, { createContext, useContext, useState } from "react";

// --- 1. Dictionaries (번역 데이터) ---
export const dictionaries = {
  ko: {
    hero: {
      title: "AI × Content",
      desc1: "일상을 바꾸는 앱을 만듭니다.",
      desc2: "YeahPlus는 사진·필름·패션·학습에 AI를 더해, 매일 쓰는 앱을 직접 만듭니다.",
    },
    ecosystem: {
      meow: { desc: "집에서 찍은 우리 냥이, AI 아트로 작품이 되다.", badges: ["AI 아트", "사진 꾸미기", "커뮤니티"] },
      stills: { desc: "한달 24컷, 3일의 기다림. 디지털 시대의 아날로그 필름.", badges: ["필름 18종", "AI 그레이딩", "3일 현상"] },
      aura: { desc: "오늘의 룩을 발견하고, 바로 따라 사는 패션·뷰티 커뮤니티.", badges: ["AI 개인화", "바로 쇼핑", "OOTD"] },
      neuro: { desc: "뇌과학이 설계한 AI 영어 암기 엔진.", badges: ["FSRS 4.5", "AI 맥락 학습", "개인화"] },
      visit: "방문하기",
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
          { year: "Future", title: "The Next", desc: "AI × Content로 일상의 더 많은 콘텐츠를 확장합니다. 사진·필름·패션·학습을 넘어, 매일의 순간이 AI로 완성되는 미래." },
          {
            year: "2026", title: "AI × Content 생태계",
            descMain: "사진·필름·패션·학습, 네 개의 라이브 앱으로 AI × Content 생태계를 완성했습니다.",
            proj1Title: "묘해 · 24STILLS",
            proj1Desc: "집에서 찍은 반려동물을 AI 아트로. 아날로그 필름 카메라의 감성을 디지털로.",
            proj2Title: "AURA · 뇌새김",
            proj2Desc: "취향 기반 패션·뷰티 큐레이션과, 뇌과학이 설계한 AI 영어 암기 엔진."
          },
          { year: "2025", title: "뇌새김 (NeuroVoca)", desc: "기억의 유효기간을 재정의하다. 뇌과학 기반 AI 암기 엔진의 정식 런칭." },
          { year: "2024", title: "Content Labs", desc: "AI × Content 실험의 시작. 사진·영상·학습 도메인에서 아이디어를 프로토타이핑하며 방향을 다졌습니다." },
          { year: "2023", title: "Foundation", desc: "핵심 소프트웨어 납품 및 기술 검증 완료. 안정적인 엔진의 기반을 닦았습니다." },
          { year: "2022", title: "Genesis", desc: "YeahPlus 창업. 콘텐츠에 AI를 더해 일상을 확장하겠다는 비전의 시작." }
        ]
      }
  },
  en: {
    hero: {
      title: "AI × Content",
      desc1: "We build apps that reshape everyday life.",
      desc2: "YeahPlus adds AI to photos, film, fashion, and learning — apps we design and ship ourselves.",
    },
    ecosystem: {
      meow: { desc: "Your cat at home, turned into art by AI.", badges: ["AI Art", "Photo Decor", "Community"] },
      stills: { desc: "24 frames a day, a 3-day wait. Analog film in a digital age.", badges: ["18 Films", "AI Grading", "3-Day Develop"] },
      aura: { desc: "Discover today's look and shop it right away.", badges: ["AI Personalization", "Instant Shop", "OOTD"] },
      neuro: { desc: "An AI English memory engine designed by neuroscience.", badges: ["FSRS 4.5", "AI Context", "Personalized"] },
      visit: "Visit",
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
          { year: "Future", title: "The Next", desc: "Expanding AI × Content to more of everyday life — beyond photos, film, fashion, and learning, toward a future where every moment is completed by AI." },
          {
            year: "2026", title: "AI × Content Ecosystem",
            descMain: "Photos, film, fashion, and learning — four live apps completing our AI × Content ecosystem.",
            proj1Title: "MYOHAE · 24STILLS",
            proj1Desc: "Turn your pet's photos into AI art, and bring the analog film camera feeling to digital.",
            proj2Title: "AURA · NeuroVoca",
            proj2Desc: "Taste-based fashion & beauty curation, and a neuroscience-designed AI English memory engine."
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
  const [lang, setLang] = useState<Language>("ko"); // 기본 언어: 한국어

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
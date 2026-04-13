"use client";

import React, { createContext, useContext, useState } from "react";

// --- 1. Dictionaries (번역 데이터) ---
export const dictionaries = {
  ko: {
    hero: {
      title: "Tech fades.\nLife remains.",
      desc1: "복잡한 기술은 저희가 다루겠습니다. 그저 일상을 즐기면 됩니다.",
      desc2: "YeahPlus는 1020 세대가 장벽 없이 혁신을 누릴 수 있도록, 삶에 가장 자연스럽게 스며드는 기술을 설계합니다.",
    },
    ecosystem: {
      neuro: { desc: "뇌과학이 설계한 완벽한 지식 각인 엔진.", badges: ["FSRS 4.5", "기억 안정성", "개인화 알고리즘"] },
      subtube: { desc: "글로벌 콘텐츠 자동화 솔루션.", badges: ["3클릭 번역", "다국어 동기화", "트래픽 확장"] },
      bamboo: { desc: "나를 찾아가는 심리 대화. 가장 안전한 익명 공간.", badges: ["자아 탐색", "AI 심리 상담", "프라이버시"] },
      aura: { desc: "데이터로 큐레이션하는 가장 완벽한 AURA.", badges: ["하이퍼로컬 날씨", "AI 스타일링", "실시간 OOTD"] },
      visit: "방문하기",
      coming: "Coming Soon in 2026"
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
        subtitle: "From Genesis to Singularity.",
        steps: [
          { year: "Future", title: "Singularity", desc: "개인화된 AI 튜터와의 완전한 대화형 학습 환경 구축. 기술이 사라지고 오직 대화만이 남는 순간." },
          { 
            year: "2026", title: "Ecosystem Expansion", 
            descMain: "NeuroVoca B2B 엔터프라이즈 솔루션 및 API 런칭. 전 세계의 교육 기관을 우리의 신경망으로 연결합니다.",
            proj1Title: "Project: Bamboo Forest (대나무 숲)",
            proj1Desc: "청소년과 20대를 위한 자아 탐색 AI. 가장 안전한 심리 대화 인터페이스.",
            proj2Title: "Project: AURA",
            proj2Desc: "하이퍼로컬 날씨 데이터 기반 OOTD 큐레이션. 초개인화 라이프스타일 엔진."
          },
          { year: "2025", title: "NeuroVoca", desc: "기억의 유효기간을 재정의하다. 뇌과학 기반 암기 엔진의 정식 런칭." },
          { year: "2024", title: "Sub-Tube", desc: "언어의 장벽을 허무는 시작. 글로벌 영상 번역 자동화 플랫폼 런칭." },
          { year: "2023", title: "Foundation", desc: "핵심 소프트웨어 납품 및 기술 검증 완료. 안정적인 엔진의 기반을 닦았습니다." },
          { year: "2022", title: "Genesis", desc: "YeahPlus 창업. 인간의 잠재력을 확장하겠다는 비전의 시작." }
        ]
      }
  },
  en: {
    hero: {
      title: "Tech fades.\nLife remains.",
      desc1: "We handle the complex technology. You just enjoy your life.",
      desc2: "YeahPlus designs seamless technology for Gen Z & Millennials, allowing them to experience innovation without barriers.",
    },
    ecosystem: {
      neuro: { desc: "The ultimate knowledge imprinting engine designed by neuroscience.", badges: ["FSRS 4.5", "Memory Stability", "AI Personalized"] },
      subtube: { desc: "Global content automation solution.", badges: ["3-Click Translation", "Multilingual Sync", "Global Traffic"] },
      bamboo: { desc: "A safe, anonymous space for self-discovery & psychological conversation.", badges: ["Self-Discovery", "AI Counseling", "Total Privacy"] },
      aura: { desc: "The most perfect AURA curated by hyper-local data.", badges: ["Hyper-local Weather", "AI Styling", "Real-time OOTD"] },
      visit: "Visit",
      coming: "Coming Soon in 2026"
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
        subtitle: "From Genesis to Singularity.",
        steps: [
          { year: "Future", title: "Singularity", desc: "Building a fully conversational learning environment with personalized AI tutors. The moment tech fades and only conversation remains." },
          { 
            year: "2026", title: "Ecosystem Expansion", 
            descMain: "Launch of NeuroVoca B2B Enterprise Solutions and APIs. Connecting educational institutions worldwide to our neural network.",
            proj1Title: "Project: Bamboo Forest",
            proj1Desc: "Self-discovery AI for Gen Z. The safest interface for psychological conversation.",
            proj2Title: "Project: AURA",
            proj2Desc: "Hyper-local weather data-based OOTD curation. A hyper-personalized lifestyle engine."
          },
          { year: "2025", title: "NeuroVoca", desc: "Redefining the expiration date of memory. Official launch of the neuroscience-based memorization engine." },
          { year: "2024", title: "Sub-Tube", desc: "The beginning of breaking language barriers. Launch of the global video translation automation platform." },
          { year: "2023", title: "Foundation", desc: "Completion of core software delivery and technical verification. Laid the foundation for a stable engine." },
          { year: "2022", title: "Genesis", desc: "Founding of YeahPlus. The beginning of our vision to expand human potential." }
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
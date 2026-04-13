"use client";

import { motion } from "framer-motion";
import { RefreshCw, Zap, Activity, Briefcase, ArrowUpRight, ArrowRight, Linkedin, Megaphone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
// JobType을 Sections에서 가져옵니다. 경로가 맞는지 확인해주세요.
import { JobType } from "./Sections"; 
import { useLanguage } from "@/lib/i18n"; // 상단에 임포트

export function TheArchitects() {
  const { t } = useLanguage();

  return (
    <section id="architect" className="py-32 px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-4 block">The Architect</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight whitespace-pre-line">{t.architect.headline}</h2>
          </motion.div>
        </div>

        <div className="bg-[#0a0a0a] rounded-[3rem] p-8 md:p-16 border border-white/5 flex flex-col lg:flex-row gap-16 items-center lg:items-start relative overflow-hidden group">
          
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex flex-col gap-6 shrink-0 z-10 w-full lg:w-72">
            
            <div className="w-48 h-48 mx-auto rounded-full bg-[#111] p-2 shrink-0 border border-white/10 transition-transform duration-500 hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src="/img/eko_profile.jpeg" alt="Founder Eugene Ko" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="w-full aspect-[4/3] bg-[#111] rounded-2xl border border-white/10 overflow-hidden relative group/img cursor-default">
              <img src="/img/lucasfilm_group.jpg" alt="With George Lucas at Lucasfilm" className="w-full h-full object-cover grayscale opacity-70 group-hover/img:grayscale-0 group-hover/img:opacity-100 transition-all duration-500 group-hover/img:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                <p className="text-[10px] font-mono text-zinc-400 tracking-tight flex items-center justify-between">
                  <span>With George Lucas</span>
                  <span className="text-zinc-600">Lucasfilm Ltd.</span>
                </p>
              </div>
            </div>
            
          </div>

          <div className="flex-1 z-10 w-full text-left">
            <div className="mb-12">
              <h3 className="text-4xl font-bold text-white mb-2">Eugene Ko</h3>
              <p className="text-xl text-zinc-500 font-medium max-w-xl leading-relaxed">
                {t.architect.quote}
              </p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                {/* 💡 LinkedIn Hover Effect */}
                <a href="https://www.linkedin.com/in/eugene-ko-32910a154/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  LinkedIn
                </a>
                {/* 💡 IMDb Hover Effect */}
                <a href="https://www.imdb.com/name/nm6031012/?ref_=fn_t_1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-[#f5c518] hover:text-black hover:border-[#f5c518] transition-all duration-300">
                  IMDb <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* 💡 Current (인생네컷 - 핑크/퍼플) */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-colors">
                <div className="shrink-0 w-24 pt-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">Current</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{t.architect.currentTitle}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{t.architect.currentDesc}</p>
                </div>
              </div>
              
              {/* 💡 Career (학계/VFX - 블루) */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 bg-transparent p-6 rounded-2xl border border-transparent hover:bg-[#111] hover:border-blue-500/30 transition-all">
                <div className="shrink-0 w-24 pt-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Career</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-zinc-200 mb-2">{t.architect.careerTitle}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{t.architect.careerDesc}</p>
                </div>
              </div>

              {/* 💡 Origin (루카스필름 - 골드) */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 bg-transparent p-6 rounded-2xl border border-transparent hover:bg-[#111] hover:border-yellow-500/30 transition-all">
                <div className="shrink-0 w-24 pt-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">Origin</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-zinc-400 mb-2">{t.architect.originTitle}</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">{t.architect.originDesc}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// 4. Roadmap (2026 Ecosystem Expanded)
export function Roadmap() {
  const { t } = useLanguage();
  const steps = [
    { 
      ...t.roadmap.steps[0], 
      status: "vision" 
    },
    { 
      year: t.roadmap.steps[1].year, 
      title: t.roadmap.steps[1].title, 
      desc: (
        <div className="space-y-4">
          <p>{t.roadmap.steps[1].descMain}</p>
          <div className="pt-3 border-t border-white/10 space-y-3">
             <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-indigo-400">{t.roadmap.steps[1].proj1Title}</span>
                <span className="text-zinc-400">{t.roadmap.steps[1].proj1Desc}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-purple-400">{t.roadmap.steps[1].proj2Title}</span>
                <span className="text-zinc-400">{t.roadmap.steps[1].proj2Desc}</span>
             </div>
          </div>
        </div>
      ),
      status: "active"
    },
    { ...t.roadmap.steps[2], status: "completed" },
    { ...t.roadmap.steps[3], status: "completed" },
    { ...t.roadmap.steps[4], status: "completed" },
    { ...t.roadmap.steps[5], status: "completed" },
  ];

  return (
    <section id="roadmap" className="py-32 px-6 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{t.roadmap.title}</h2>
          <p className="text-zinc-500">{t.roadmap.subtitle}</p>
        </div>

        <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-0 md:border-l-0">
           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -ml-[1px]" />
          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="pl-12 md:pl-0 md:w-1/2 md:px-12">
                  <div className={`relative ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-3 tracking-wider ${
                      step.status === 'vision' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      step.status === 'active' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' :
                      step.status === 'upcoming' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 
                      'bg-zinc-800 text-zinc-500'
                    }`}>{step.year}</span>
                    <h3 className={`text-2xl font-bold mb-3 ${step.status === 'active' ? 'text-white' : step.status === 'vision' ? 'text-purple-200' : 'text-zinc-400'}`}>{step.title}</h3>
                    <div className={`text-sm leading-relaxed font-medium max-w-sm ml-0 md:ml-auto md:mr-0 inline-block text-left ${step.status === 'active' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {step.desc}
                    </div>
                  </div>
                </div>
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-0 w-3 h-3 rounded-full z-10 border-4 border-[#050505] box-content" style={{ backgroundColor: step.status === 'active' ? '#fff' : step.status === 'vision' ? '#a855f7' : '#3f3f46', boxShadow: step.status === 'active' ? '0 0 15px rgba(255,255,255,0.5)' : 'none' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Careers (Fixed: Accepts onOpenJob Prop)
export function Careers({ onOpenJob }: { onOpenJob: (job: JobType) => void }) {
  const jobs: JobType[] = [
    { 
      title: "Senior AI Engineer", 
      type: "Full-time", 
      loc: "Seoul / Remote",
      desc: "NeuroVoca의 핵심인 FSRS 알고리즘을 고도화하고, 생성형 AI(LLM) 파이프라인을 최적화하는 역할입니다.",
      responsibilities: ["FSRS 알고리즘 개선 및 최적화", "RAG 기반의 콘텐츠 생성 파이프라인 구축", "모델 서빙 인프라 설계 및 운영"]
    },
    { 
      title: "Product Designer", 
      type: "Full-time", 
      loc: "Seoul",
      desc: "복잡한 기술을 가장 단순하고 우아한 인터페이스로 풀어내는 역할을 담당합니다. 사용자의 학습 경험(UX)을 설계합니다.",
      responsibilities: ["NeuroVoca/Sub-tube UI/UX 디자인", "디자인 시스템 구축 및 유지보수", "사용자 리서치 및 프로토타이핑"]
    }
  ];

  const ambassadorJob: JobType = {
      title: "YeahPlus Ambassador",
      type: "Part-time / Remote",
      loc: "Global",
      desc: "YeahPlus의 혁신적인 서비스를 전 세계에 알리는 목소리가 되어주세요. 소셜 미디어와 커뮤니티에서 우리 브랜드를 대변합니다.",
      responsibilities: ["소셜 미디어 콘텐츠 제작 및 홍보", "커뮤니티 내 브랜드 바이럴 마케팅", "초기 사용자 피드백 수집"]
  };

  return (
    <section id="careers" className="py-24 px-6 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div><h2 className="text-3xl font-bold text-white mb-2">Join the Mission.</h2><p className="text-zinc-500">Build the future of learning with us.</p></div>
        </div>

        <div className="grid gap-4">
          {/* Regular Jobs */}
          {jobs.map((job, i) => (
            <div key={i} onClick={() => onOpenJob(job)} className="group flex items-center justify-between p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-indigo-500/30 hover:bg-[#161616] transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors"><Briefcase className="w-5 h-5 text-zinc-400" /></div>
                <div><h4 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{job.title}</h4><div className="flex items-center gap-3 text-xs text-zinc-500"><span>{job.type}</span><span className="w-1 h-1 rounded-full bg-zinc-700" /><span>{job.loc}</span></div></div>
              </div>
              <div className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-zinc-400 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-transparent transition-all">Apply</div>
            </div>
          ))}

          {/* Ambassador Card */}
          <div onClick={() => onOpenJob(ambassadorJob)} className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-[#111111] to-[#1a1033] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer mt-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-500/10 text-purple-400"><Megaphone className="w-5 h-5" /></div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">YeahPlus Ambassador</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500 text-white">HOT</span>
                    </div>
                    <div className="text-xs text-zinc-400">Be the voice of innovation. Spread the impact.</div>
                </div>
              </div>
              <div className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-zinc-400 group-hover:bg-purple-600 group-hover:text-white group-hover:border-transparent transition-all">Join</div>
            </div>
        </div>
      </div>
    </section>
  );
}

// 6. Newsletter
export function Newsletter() {
  return (
    <section className="py-24 px-6 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Join the Inner Circle.</h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto">교육과 기술의 미래에 대한 YeahPlus의 인사이트를 가장 먼저 받아보세요.<br/>스팸은 없습니다. 오직 영감(Inspiration)만 보냅니다.</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="enter@your.email" className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all" />
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group">Subscribe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></button>
        </form>
        <p className="text-xs text-zinc-600 mt-6">By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
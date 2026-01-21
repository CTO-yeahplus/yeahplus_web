"use client";

import { motion } from "framer-motion";
import { RefreshCw, Zap, Activity, Briefcase, ArrowRight, Linkedin, Megaphone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
// JobType을 Sections에서 가져옵니다. 경로가 맞는지 확인해주세요.
import { JobType } from "./Sections"; 

// 1. The Architects (CTO Only)
export function TheArchitects() {
  return (
    <section className="py-32 px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-2">The Architect.</h2>
          <p className="text-zinc-500">Engineering the bridge between Human and AI.</p>
        </div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="group relative bg-[#1c1c1e] rounded-[2.5rem] p-10 md:p-12 border border-white/5 shadow-2xl inline-block text-left max-w-2xl w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
               <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border-4 border-[#2c2c2e] group-hover:border-indigo-500/30 transition-colors duration-500">
                  <img src="/img/eko_profile.jpeg" alt="CTO Eugene Ko" className="w-full h-full object-cover" />
               </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-white mb-1">Eugene Ko</h3>
              <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">Founder & CTO</div>
              
              <p className="text-zinc-400 leading-relaxed mb-8">
                "기술은 복잡하지만 경험은 단순해야 합니다."<br/><br/>
                NeuroVoca의 FSRS 알고리즘과 Sub-tube의 자동화 엔진을 설계했습니다. 
                뇌과학과 생성형 AI의 결합을 통해, 인간의 학습과 생산성을 극대화하는 인터페이스를 구축하고 있습니다.
              </p>

              <div className="flex justify-center md:justify-start">
                <Link 
                  href="https://www.linkedin.com/in/eugene-ko-32910a154" 
                  target="_blank"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2c2c2e] hover:bg-[#0077b5] text-white text-sm font-medium transition-colors duration-300 group/btn"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="w-3 h-3 opacity-50 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 2. Engine Playground
export function EnginePlayground() {
  const [memory, setMemory] = useState(100);
  const [day, setDay] = useState(0);
  const handleReview = () => { setMemory(100); setDay(0); };
  const simulateDecay = () => { if (memory > 10) setMemory(prev => prev - (prev * 0.1)); setDay(prev => prev + 1); };

  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 mb-6 animate-pulse"><Activity className="w-3 h-3" /> Live Demo</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience the Engine.</h2>
        <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">FSRS 알고리즘이 당신의 기억을 어떻게 유지하는지 시뮬레이션해보세요.<br/>시간이 지날수록 흐릿해지는 기억을 단 한 번의 복습으로 완벽하게 복구합니다.</p>
        <div className="bg-[#1c1c1e] rounded-3xl p-8 border border-white/10 shadow-2xl max-w-lg mx-auto">
          <div className="flex justify-between items-end mb-8 h-32 relative">
             <div className="w-full bg-zinc-800 h-2 rounded-full absolute bottom-0 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" animate={{ width: `${memory}%` }} transition={{ type: "spring", stiffness: 100 }} />
             </div>
             <div className="absolute bottom-4 left-0 w-full flex justify-between text-xs text-zinc-500 font-mono"><span>Retention: {Math.round(memory)}%</span><span>Day {day}</span></div>
          </div>
          <div className="flex gap-4 justify-center">
             <button onClick={simulateDecay} className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition-colors flex items-center gap-2 text-sm"><RefreshCw className="w-4 h-4" /> Wait (Decay)</button>
             <button onClick={handleReview} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors flex items-center gap-2 text-sm shadow-lg shadow-indigo-900/50"><Zap className="w-4 h-4" /> Review Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Partners
export function Partners() {
  const partners = ["TechCrunch", "Product Hunt", "OpenAI", "Microsoft for Startups"];
  return (
    <section className="py-16 border-t border-b border-white/5 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Trusted by & Featured in</span>
        <div className="flex flex-wrap gap-8 md:gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((p, i) => <span key={i} className="text-lg font-bold text-white cursor-default hover:text-indigo-400 transition-colors">{p}</span>)}
        </div>
      </div>
    </section>
  );
}

// 4. Roadmap (2026 Active)
export function Roadmap() {
  const steps = [
    { year: "Future", title: "Singularity", desc: "개인화된 AI 튜터와의 완전한 대화형 학습 환경 구축. 기술이 사라지고 오직 대화만이 남는 순간.", status: "vision" },
    { year: "2026", title: "Ecosystem", desc: "NeuroVoca B2B 엔터프라이즈 솔루션 및 API 개발. 전 세계의 교육 기관을 우리의 신경망으로 연결합니다.", status: "active" },
    { year: "2025", title: "NeuroVoca", desc: "기억의 유효기간을 재정의하다. 뇌과학 기반 암기 엔진의 정식 런칭.", status: "completed" },
    { year: "2024", title: "Sub-Tube", desc: "언어의 장벽을 허무는 시작. 글로벌 영상 번역 자동화 플랫폼 런칭.", status: "completed" },
    { year: "2023", title: "Foundation", desc: "핵심 소프트웨어 납품 및 기술 검증 완료. 안정적인 엔진의 기반을 닦았습니다.", status: "completed" },
    { year: "2022", title: "Genesis", desc: "YeahPlus 창업. 인간의 잠재력을 확장하겠다는 비전의 시작.", status: "completed" },
  ];

  return (
    <section id="roadmap" className="py-32 px-6 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">The Horizon.</h2>
          <p className="text-zinc-500">From Genesis to Singularity.</p>
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
                    <p className={`text-sm leading-relaxed font-medium max-w-sm ml-0 md:ml-auto md:mr-0 inline-block ${step.status === 'active' ? 'text-zinc-300' : 'text-zinc-500'}`}>{step.desc}</p>
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
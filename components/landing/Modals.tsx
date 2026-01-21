"use client";

import { motion } from "framer-motion";
import { Brain, Youtube, X, ArrowRight, Calendar, Clock, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { ProjectType, ArticleType, JobType } from "./Sections"; // JobType은 아래 Sections.tsx에서 정의

// 1. Project Modal
export function ProjectModal({ project, onClose }: { project: ProjectType, onClose: () => void }) {
  if (!project) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-2xl" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-[#1c1c1e] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"><X className="w-5 h-5 text-white" /></button>
        {project === "neurovoca" ? (
          <div className="p-8 md:p-16">
            <div className="inline-flex items-center gap-2 text-indigo-400 mb-4 font-bold tracking-wide uppercase text-xs"><Brain className="w-4 h-4" /> NeuroVoca</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Memory.<br/>Re-engineered.</h2>
            <p className="text-xl text-zinc-400 leading-relaxed mb-12 max-w-2xl">단어 암기는 지루한 반복이 아닙니다. 뇌과학이 증명한 가장 완벽한 타이밍에, 가장 우아한 방식으로 지식을 각인시키는 과정입니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black/30 p-8 rounded-3xl border border-white/5"><h3 className="text-xl font-bold text-white mb-2">FSRS 4.5 Algorithm</h3><p className="text-zinc-400 text-sm leading-relaxed">기억의 안정성(Stability)과 난이도(Difficulty)를 실시간으로 계산하여, 뇌가 잊기 직전의 순간을 포착해 학습 효율을 극대화합니다.</p></div>
              <div className="bg-black/30 p-8 rounded-3xl border border-white/5"><h3 className="text-xl font-bold text-white mb-2">Adaptive AI Context</h3><p className="text-zinc-400 text-sm leading-relaxed">단어는 고립되어 존재하지 않습니다. RAG(검색 증강 생성) 기술을 통해 개인화된 예문과 퀴즈를 경험하세요.</p></div>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-16">
            <div className="inline-flex items-center gap-2 text-red-500 mb-4 font-bold tracking-wide uppercase text-xs"><Youtube className="w-4 h-4" /> Sub-tube</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Global Reach.<br/>Instantly.</h2>
            <p className="text-xl text-zinc-400 leading-relaxed mb-12 max-w-2xl">번역은 귀찮은 작업이 아닙니다. 당신의 콘텐츠가 국경을 넘어 전 세계와 만나는 해방의 순간입니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-black/30 p-6 rounded-3xl border border-white/5"><div className="text-3xl font-bold text-white mb-2">3 Clicks</div><p className="text-zinc-400 text-sm">링크 입력, 언어 선택, 적용하기. 단 세 번의 클릭.</p></div>
              <div className="bg-black/30 p-6 rounded-3xl border border-white/5"><div className="text-3xl font-bold text-white mb-2">Direct Sync</div><p className="text-zinc-400 text-sm">유튜브 스튜디오 접속 없이 채널에 자막을 '직접 적용'하는 유일한 솔루션.</p></div>
              <div className="bg-black/30 p-6 rounded-3xl border border-white/5"><div className="text-3xl font-bold text-white mb-2">300% Growth</div><p className="text-zinc-400 text-sm">영어 자막 하나로 조회수가 2~3배 폭발하는 경험.</p></div>
            </div>
            <div className="flex items-center justify-between p-6 bg-zinc-900 rounded-2xl border border-white/5">
               <div className="text-sm text-zinc-400">"번역은 SubTube에게. 조회수는 당신에게."</div>
               <Link href="https://sub-tube.com/" target="_blank" className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">Visit Sub-tube <ArrowRight className="w-4 h-4"/></Link>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// 2. Journal Reader Modal
export function JournalModal({ article, onClose }: { article: ArticleType | null, onClose: () => void }) {
  if (!article) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-2xl" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }} className="bg-[#111111] w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] border border-white/10 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-20 flex justify-end p-6 bg-gradient-to-b from-[#111111] to-transparent">
            <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md"><X className="w-5 h-5 text-white" /></button>
        </div>
        <div className="px-8 md:px-12 pb-16">
            <div className="mb-8 border-b border-white/5 pb-8">
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3 block">{article.category}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{article.title}</h2>
                <div className="flex items-center gap-2 text-zinc-500 text-sm"><Calendar className="w-4 h-4" /><span>{article.date}</span><span className="mx-2">|</span><Clock className="w-4 h-4" /><span>3 min read</span></div>
            </div>
            <div className="text-lg text-zinc-300 leading-loose font-light">{article.content}</div>
            <div className="mt-12 pt-8 border-t border-white/5 text-center"><p className="text-zinc-600 text-sm italic">Written by YeahPlus Team</p></div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 3. Job Description Modal (NEW)
export function JobModal({ job, onClose }: { job: JobType | null, onClose: () => void }) {
    if (!job) return null;
  
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-2xl" 
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }} 
          className="bg-[#111111] w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] border border-white/10 shadow-2xl relative flex flex-col" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex justify-between items-start p-8 bg-[#111111]/90 backdrop-blur-md border-b border-white/5">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{job.title}</h2>
                <div className="flex flex-wrap gap-4 text-xs text-zinc-400 font-mono">
                  <span className="flex items-center gap-1"><BriefcaseIcon className="w-3 h-3"/> {job.type}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {job.loc}</span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"><X className="w-5 h-5 text-white" /></button>
          </div>
  
          {/* Content */}
          <div className="p-8 space-y-8 text-zinc-300 leading-relaxed">
              <div>
                <h3 className="text-white font-bold mb-3 text-lg">Role Overview</h3>
                <p>{job.desc}</p>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-3 text-lg">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((res, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
  
          {/* Footer (Apply Action) */}
          <div className="p-6 border-t border-white/5 bg-[#1a1a1a] sticky bottom-0 mt-auto">
            <Link 
              href={`mailto:contact@yeahplus.co.kr?subject=Application for ${job.title}`}
              className="w-full py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              Apply via Email <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-center text-xs text-zinc-500 mt-3">Please attach your CV and Portfolio.</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }
  
  // Icon Helper
  function BriefcaseIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
  }
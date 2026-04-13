// app/neurovoca/page.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function NeuroVocaPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* 고정 네비게이션: 언제든 메인으로 돌아갈 수 있는 명확한 탈출구 */}
      <nav className="fixed top-0 w-full z-50 p-6 mix-blend-difference">
        <Link href="/#products" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Ecosystem
        </Link>
      </nav>

      {/* Immersive Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 max-w-5xl mx-auto pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 text-indigo-400 mb-8 font-bold tracking-widest uppercase text-sm">
            <Brain className="w-5 h-5" /> NeuroVoca
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Memory.<br/>Re-engineered.
          </h1>
          <p className="text-2xl text-zinc-400 leading-relaxed max-w-3xl font-light">
            단어 암기는 지루한 반복이 아닙니다. 뇌과학이 증명한 가장 완벽한 타이밍에, 가장 우아한 방식으로 지식을 각인시키는 과정입니다.
          </p>
        </motion.div>
      </section>

      {/* 상세 기능 설명 (여백을 극대화하여 스크롤 유도) */}
      <section className="py-32 px-6 max-w-5xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">FSRS 4.5 Algorithm</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">
              기억의 안정성(Stability)과 난이도(Difficulty)를 실시간으로 계산하여, 뇌가 잊기 직전의 순간을 포착해 학습 효율을 극대화합니다.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Adaptive AI Context</h3>
            <p className="text-lg text-zinc-400 leading-relaxed">
              단어는 고립되어 존재하지 않습니다. RAG(검색 증강 생성) 기술을 통해 개인화된 예문과 퀴즈를 경험하세요.
            </p>
          </div>
        </div>
      </section>
      
      {/* 거대한 하단 CTA */}
      <section className="py-48 text-center px-6">
         <h2 className="text-4xl font-bold mb-10">Start learning perfectly.</h2>
         <button className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:scale-105 transition-transform">
           Try NeuroVoca Beta
         </button>
      </section>
    </main>
  );
}
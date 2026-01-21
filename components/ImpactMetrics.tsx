// components/ImpactMetrics.tsx
"use client";

const metrics = [
  { label: "Words Memorized", value: "1.2M+", desc: "NeuroVoca를 통해 학습된 단어 수" },
  { label: "Videos Globalized", value: "50K+", desc: "Sub-tube로 번역된 영상 수" },
  { label: "AI Interactions", value: "10M+", desc: "매월 처리되는 AI 요청 수" },
];

export default function ImpactMetrics() {
  return (
    <section className="py-24 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-12">Our Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {metrics.map((m, i) => (
            <div key={i} className="group cursor-default">
              <div className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-500 transition-all duration-500">
                {m.value}
              </div>
              <div className="text-lg font-bold text-zinc-300 mb-2">{m.label}</div>
              <p className="text-sm text-zinc-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
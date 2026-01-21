// components/JournalSection.tsx
import { ArrowUpRight } from "lucide-react";

const articles = [
  { category: "Vision", title: "왜 우리는 단어장에 집착하는가?", date: "Oct 2, 2024" },
  { category: "Technology", title: "FSRS v4.5: 기억의 유통기한을 계산하다", date: "Sep 15, 2024" },
  { category: "Productivity", title: "유튜브 자막 번역이 크리에이터 경제에 미치는 영향", date: "Aug 28, 2024" },
];

export default function JournalSection() {
  return (
    <section className="py-24 px-6 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-white">The Journal.</h2>
          <button className="text-sm text-zinc-400 hover:text-white transition-colors">View all archives</button>
        </div>
        
        <div className="space-y-4">
          {articles.map((article, i) => (
            <div key={i} className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-white/20 transition-colors cursor-pointer">
              <div>
                <span className="text-xs font-bold text-indigo-400 mb-1 block">{article.category}</span>
                <h3 className="text-xl font-medium text-zinc-200 group-hover:text-white transition-colors">{article.title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-600">{article.date}</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
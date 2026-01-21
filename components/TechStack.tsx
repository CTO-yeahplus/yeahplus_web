// components/TechStack.tsx
// 로고 이미지는 lucide 아이콘이나 svg로 대체 가능합니다.
export default function TechStack() {
    const techs = ["Next.js", "Supabase", "OpenAI", "Vercel", "Tailwind"];
    
    return (
      <div className="py-12 border-t border-b border-white/5 bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 flex justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-700">
          {/* 실제로는 SVG 로고를 사용하는 것이 좋습니다 */}
          {techs.map((tech) => (
            <span key={tech} className="text-lg font-bold text-white">{tech}</span>
          ))}
        </div>
      </div>
    );
  }
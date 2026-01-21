"use client";

import Link from "next/link";
import { Globe, Menu } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

export function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navItems = [
    { name: "Vision", href: "#vision" },
    { name: "Products", href: "#products" },
    { name: "Timeline", href: "#roadmap" },
    { name: "Team", href: "#team" },
    { name: "Careers", href: "#careers" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
           <span className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center text-white font-bold">Y+</span>
           <span className="font-bold text-lg tracking-tight text-white group-hover:text-gray-300 transition-colors">YeahPlus</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              {item.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
           <a href="mailto:contact@yeahplus.co.kr" className="hidden md:inline-flex px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors">
             Contact Us
           </a>
           {/* Mobile Menu Icon (Placeholder for functionality) */}
           <button className="md:hidden text-white"><Menu className="w-6 h-6" /></button>
        </div>
      </div>
      
      {/* Scroll Progress Bar */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 origin-left" style={{ scaleX }} />
    </header>
  );
}

// Footer는 기존 코드 유지
export function Footer() {
  return (
    <footer className="py-20 px-6 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">YeahPlus.</h2>
          <div className="space-y-2 text-xs text-zinc-500 font-mono">
            <p>CEO: Jaehyuk Ko | Reg: 283-88-02519</p>
            <p>Gyeonggi-do, Paju-si, Gyoha-ro 159-33, 3F 304-A318</p>
            <p>E-commerce: 2022-GyeonggiPaju-2995</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-8">
           <div className="flex gap-8 text-sm text-zinc-400">
             <Link href="mailto:contact@yeahplus.co.kr" className="hover:text-white transition-colors">Contact</Link>
             <span className="text-zinc-700">|</span>
             
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
              <Globe className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              <span className="text-xs font-bold text-zinc-400 group-hover:text-white">Korea (Republic of)</span>
           </div>
           <p className="text-xs text-zinc-300">© 2022-2026 YeahPlus Co., Ltd. Designed in Korea.</p>
        </div>
      </div>
    </footer>
  );
}
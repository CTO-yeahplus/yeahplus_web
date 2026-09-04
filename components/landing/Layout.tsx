"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { t, lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: t.nav.vision, href: "#vision" },
    { name: t.nav.products, href: "#products" },
    { name: t.nav.timeline, href: "#roadmap" },
    { name: t.nav.team, href: "#team" },
  ];

  // 메뉴가 열려 있는 동안 배경 스크롤을 막고, ESC 로 닫는다.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0 bg-black/20 border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.png" alt="" width={32} height={32} className="w-full h-full object-cover" />
          </span>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-gray-300 transition-colors">
            YeahPlus
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {/* 언어 전환 — 데스크톱은 헤더에서 바로 */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
          >
            <span className={lang === "en" ? "text-white font-bold" : ""}>EN</span>
            <span className="opacity-30">/</span>
            <span className={lang === "ko" ? "text-white font-bold" : ""}>KR</span>
          </button>
          <a
            href="mailto:contact@yeahplus.co.kr"
            className="hidden md:inline-flex px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
          >
            {t.nav.contact}
          </a>

          {/* Mobile Menu */}
          <button
            type="button"
            className="md:hidden text-white p-1 -mr-1"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 origin-left"
        style={{ scaleX }}
      />

      {/* Mobile Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <nav className="px-6 py-4 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium text-zinc-300 hover:text-white border-b border-white/5 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-5 pb-2">
                <a
                  href="mailto:contact@yeahplus.co.kr"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-3 rounded-full bg-white text-black text-sm font-bold"
                >
                  {t.nav.contact}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    toggleLang();
                    setOpen(false);
                  }}
                  className="px-4 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest text-zinc-300"
                >
                  {lang === "ko" ? "EN" : "KR"}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-20 px-6 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">YeahPlus.</h2>
          <div className="space-y-2 text-xs text-zinc-500 font-mono">
            <p>
              {t.footer.ceo}: Jaehyuk Ko | {t.footer.biz}: 283-88-02519
            </p>
            <p>Gyeonggi-do, Paju-si, Gyoha-ro 159-33, 3F 304-A318</p>
            <p>{t.footer.mailorder}: 2022-GyeonggiPaju-2995</p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-8">
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="mailto:contact@yeahplus.co.kr" className="hover:text-white transition-colors">
              {t.footer.contact}
            </a>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Globe className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-xs font-bold text-zinc-500">{t.footer.country}</span>
          </div>
          <p className="text-xs text-zinc-300">© 2022-2026 YeahPlus Co., Ltd. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

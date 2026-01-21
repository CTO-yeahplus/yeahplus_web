// components/DeviceMockup.tsx
"use client";
import { motion } from "framer-motion";

export default function DeviceShowcase() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] opacity-50 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
          {/* NeuroVoca - Mobile View */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-[280px] h-[580px] bg-zinc-900 border-[8px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl relative"
          >
             {/* Replace with actual app screenshot */}
             <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-black flex items-center justify-center text-zinc-600 font-mono text-xs">
                App Interface<br/>(390x844)
             </div>
             {/* iPhone Notch */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl" />
          </motion.div>

          {/* Sub-tube - Desktop View */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[600px] aspect-video bg-zinc-900 border-[8px] border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative"
          >
             {/* Replace with actual web screenshot */}
             <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600 font-mono text-xs">
                Web Interface<br/>(1920x1080)
             </div>
             {/* MacOS Dot UI */}
             <div className="absolute top-4 left-4 flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500"/>
               <div className="w-3 h-3 rounded-full bg-yellow-500"/>
               <div className="w-3 h-3 rounded-full bg-green-500"/>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
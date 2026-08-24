"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedSecurityHero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden py-32 md:py-40 px-4 bg-[#181E2C]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cyber_security_hero.png')" }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#181E2C]/85 z-0 backdrop-blur-[2px]"></div>

      {/* Floating nodes only. The sweeping scan line and the grid overlay that
          used to sit here were removed: on a photographic hero they read as
          artefacts laid over the picture rather than as part of it. */}
      {isMounted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(15)].map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            return (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]"
                initial={{
                  y: "110%",
                  opacity: 0,
                  left: `${left}%`
                }}
                animate={{
                  y: "-10%",
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: delay
                }}
              />
            );
          })}
        </div>
      )}

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-sm font-semibold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Advanced Cyber Defense
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8 text-white">
            Protect What <br className="hidden sm:block" />
            Matters Most
          </h1>
          <p className="text-xl leading-relaxed mb-10 max-w-2xl mx-auto text-gray-400">
            Multi-layered security, <span className="text-white font-medium">endpoint protection</span>, <span className="text-white font-medium">SOC & MDR</span>, <span className="text-white font-medium">penetration testing</span>, and <span className="text-white font-medium">24/7 monitoring</span>, so your business stays resilient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white font-semibold px-8 py-4 rounded-full hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_30px_rgba(var(--primary),0.4)]"
            >
              Get a Security Assessment
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

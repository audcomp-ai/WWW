"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const agents = [
  {
    name: "Atlas",
    role: "Tier-1 Help Desk Responder",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80",
    description: "Instantly resolves 60% of incoming tickets before a human technician even sees them."
  },
  {
    name: "Cipher",
    role: "SOC & Threat Analyst",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    description: "Monitors endpoints 24/7, instantly quarantining zero-day threats in milliseconds."
  },
  {
    name: "Nova",
    role: "Cloud Optimization Architect",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    description: "Continuously scans Azure and AWS environments to eliminate wasted spend."
  },
  {
    name: "Orion",
    role: "Network Reliability Technician",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    description: "Predicts bandwidth bottlenecks and re-routes traffic automatically."
  },
  {
    name: "Lyra",
    role: "Compliance & Governance Auditor",
    image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&q=80",
    description: "Ensures all data storage meets strict PIPEDA and PHIPA regulations."
  },
  {
    name: "Nexus",
    role: "Copilot Enablement Guide",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
    description: "Onboards your staff to Microsoft Copilot, training them on effective prompts."
  }
];

export default function ClientAiAgentsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cinematic Text 1
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [50, 0, 0, -50]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1.1]);

  // Cinematic Text 2
  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [50, 0, 0, -50]);
  const text2Scale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1.1]);

  // Cinematic Text 3
  const text3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [50, 0, 0, -50]);
  const text3Scale = useTransform(scrollYProgress, [0.6, 0.9], [0.9, 1.1]);
  
  // Video fade out at the end
  const videoOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      
      {/* 1. Cinematic Scroll Section (Apple Vision Pro style) */}
      <div ref={containerRef} className="relative h-[400vh] w-full bg-black">
        {/* Sticky Video Background */}
        <motion.div 
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ opacity: videoOpacity }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://aiaudit.audcomp.ai/Videos/Agent_intro-web.webm" type="video/webm" />
            <source src="https://aiaudit.audcomp.ai/Videos/Agent_intro-web.mp4" type="video/mp4" />
          </video>
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </motion.div>

        {/* Text Layer 1 */}
        <motion.div 
          className="fixed inset-0 flex items-center justify-center pointer-events-none px-4"
          style={{ opacity: text1Opacity, y: text1Y, scale: text1Scale }}
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 drop-shadow-2xl">
              The era of <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                AI-Managed IT
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto drop-shadow-lg">
              Welcome to the modern workforce.
            </p>
          </div>
        </motion.div>

        {/* Text Layer 2 */}
        <motion.div 
          className="fixed inset-0 flex items-center justify-center pointer-events-none px-4"
          style={{ opacity: text2Opacity, y: text2Y, scale: text2Scale }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 drop-shadow-2xl">
              Zero downtime.
            </h2>
            <p className="text-xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto drop-shadow-lg">
              Agents that never sleep, never stop learning, and work alongside your human team.
            </p>
          </div>
        </motion.div>

        {/* Text Layer 3 */}
        <motion.div 
          className="fixed inset-0 flex items-center justify-center pointer-events-none px-4"
          style={{ opacity: text3Opacity, y: text3Y, scale: text3Scale }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 drop-shadow-2xl">
              Meet your team.
            </h2>
            <p className="text-xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto drop-shadow-lg">
              Scroll down to view our specialized AI Agents.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. The AI Agents Roster (Dark, sleek Apple-style grid) */}
      <section className="relative z-10 bg-black py-32 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl font-bold text-foreground mb-6">The Agents</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Highly specialized, infinitely scalable. Each agent is designed to solve complex IT challenges autonomously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative rounded-3xl bg-[#111] border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
              >
                {/* Agent Image */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10" />
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-full object-cover transform-gpu group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000 ease-out"
                  />
                </div>
                
                {/* Agent Info */}
                <div className="p-8 relative z-20 -mt-10">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-3xl font-bold tracking-tight text-white">{agent.name}</h3>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)] animate-pulse" />
                  </div>
                  <p className="text-cyan-400 font-medium mb-4 uppercase tracking-widest text-sm">{agent.role}</p>
                  <p className="text-gray-400 leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Immersive CTA */}
      <section className="bg-black py-32 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Ready to deploy?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Our AI integration team will audit your readiness and help you launch your first agent in weeks.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black font-semibold text-lg px-12 py-5 rounded-full hover:scale-105 transition-all"
          >
            Start Your AI Audit
          </Link>
        </div>
      </section>

    </div>
  );
}

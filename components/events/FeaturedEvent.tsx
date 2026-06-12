"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function FeaturedEvent() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-[#071e3d]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#06b6d4]/20 to-transparent rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#0071e3]/20 to-transparent rounded-full blur-3xl opacity-50 transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white/[0.03] border border-white/[0.1] rounded-3xl p-8 md:p-14 backdrop-blur-md shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle hover gleam */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-1000 transition-all ease-in-out -skew-x-12 transform -translate-x-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/20 border border-[#0071e3]/30 text-[#38bdf8] text-xs font-semibold tracking-widest uppercase mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
                Flagship Event
              </motion.span>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Meet the Moment <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#0071e3]">2026</span>
              </h2>
              
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                Join industry leaders, top technology partners, and the Audcomp engineering team for our premier annual event. Discover the strategies and tools shaping the future of IT infrastructure and cyber security.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1]">
                    <Calendar className="w-4 h-4 text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Date</p>
                    <p className="font-medium">April 28, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1]">
                    <MapPin className="w-4 h-4 text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Location</p>
                    <p className="font-medium">Hamilton Golf and Country Club</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="#register" className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,113,227,0.3)] hover:shadow-[0_0_30px_rgba(0,113,227,0.5)] hover:-translate-y-1 flex items-center gap-2">
                  Save Your Seat
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#agenda" className="border border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-semibold px-8 py-4 rounded-full transition-all duration-300">
                  View Agenda
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d] via-transparent to-transparent z-10"></div>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/mtm2025.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

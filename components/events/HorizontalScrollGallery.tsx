"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface PastEvent {
  id: string;
  title: string;
  date: string;
  image: string;
  href: string;
}

const pastEvents: PastEvent[] = [
  {
    id: "0",
    title: "Meet the Moment 2026",
    date: "April 2026",
    image: "/images/professional_services_hero.png",
    href: "/events/meet-the-moment-2026",
  },
  {
    id: "1",
    title: "Meet the Moment 2024",
    date: "October 2024",
    image: "/images/professional_services_hero.png",
    href: "#",
  },
  {
    id: "2",
    title: "Azure Cloud Security Workshop",
    date: "July 2024",
    image: "/images/managed_it_hero.png",
    href: "#",
  },
  {
    id: "3",
    title: "Future of Workspace AI",
    date: "May 2024",
    image: "/images/professional_services_hero.png",
    href: "#",
  },
  {
    id: "4",
    title: "CIO Roundtable: Ransomware",
    date: "February 2024",
    image: "/images/managed_it_hero.png",
    href: "#",
  },
  {
    id: "5",
    title: "Meet the Moment 2023",
    date: "October 2023",
    image: "/images/professional_services_hero.png",
    href: "#",
  },
];

export default function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Slight parallax effect on the background based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="py-24 bg-white overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">Event Archive</p>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight">Past Events</h2>
          </div>
          <p className="text-slate-500 max-w-md text-sm md:text-right">
            Browse highlights, recordings, and recaps from our previous conferences and technical workshops.
          </p>
        </div>
      </div>

      {/* Scrolling Container */}
      <div className="relative w-full">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 px-4 md:px-8 space-x-6 md:space-x-8">
          {/* Invisible spacer to center the first item somewhat on large screens if desired, but padding usually works */}
          <div className="shrink-0 w-4 md:w-[calc((100vw-72rem)/2)]"></div>
          
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] md:w-[400px] group cursor-pointer"
            >
              <Link href={event.href} className="block">
                <div className="relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                  <motion.div className="absolute inset-0" style={{ y }}>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="absolute inset-0 w-full h-[120%] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating Action Button on Hover */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <ArrowUpRight className="w-5 h-5 text-[#0071e3]" />
                  </div>
                </div>
                
                <p className="text-sm font-semibold text-[#0071e3] mb-2">{event.date}</p>
                <h3 className="text-xl font-bold text-[#0a2540] group-hover:text-[#0071e3] transition-colors">{event.title}</h3>
              </Link>
            </motion.div>
          ))}
          
          {/* Trailing spacer */}
          <div className="shrink-0 w-4 md:w-[calc((100vw-72rem)/2)]"></div>
        </div>

        {/* Global style to hide scrollbar for this specific component */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion, Variants } from "framer-motion";

const TestimonialCard = ({
  quote,
  authorName,
  authorTitle,
  rating,
  index,
  variant = "light",
}: {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarUrl?: string;
  rating: number;
  index: number;
  variant?: "light" | "dark";
}) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  if (variant === "dark") {
    return (
      <motion.div
        className="flex h-full flex-col justify-between rounded-2xl p-8 border border-white/[0.1] bg-white/[0.06] backdrop-blur-sm"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
      >
        <div>
          <div className="flex items-center gap-0.5 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-white/20"}`} fill="currentColor" />
            ))}
          </div>
          <blockquote className="text-base leading-relaxed text-white/65">&ldquo;{quote}&rdquo;</blockquote>
        </div>
        <footer className="mt-8 pt-5 border-t border-white/[0.08]">
          <p className="font-semibold text-white text-sm">{authorName}</p>
          <p className="text-xs text-white/40 mt-0.5">{authorTitle}</p>
        </footer>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex h-full flex-col justify-between rounded-2xl p-8 border border-slate-200 bg-white shadow-sm"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.25 }}
    >
      <div>
        <div className="flex items-center gap-0.5 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" />
          ))}
        </div>
        <blockquote className="text-base leading-relaxed text-slate-500">&ldquo;{quote}&rdquo;</blockquote>
      </div>
      <footer className="mt-8 pt-5 border-t border-slate-100">
        <p className="font-semibold text-[#0a2540] text-sm">{authorName}</p>
        <p className="text-xs text-slate-400 mt-0.5">{authorTitle}</p>
      </footer>
    </motion.div>
  );
};

export default TestimonialCard;

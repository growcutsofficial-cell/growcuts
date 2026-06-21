"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { Sparkles, Zap, Users, RotateCcw } from "lucide-react";

export default function Benefits() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    },
  };

  const benefits = [
    {
      icon: Sparkles,
      title: "Attention-Grabbing Edits",
      description: "Visual hooks, tactical graphics, text tracking, and pacing shifts designed specifically to lock eyes and boost retention from the first second.",
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "A streamlined post-production pipeline that keeps you on schedule. Receive high-fidelity edits quickly, keeping your channel upload-ready.",
    },
    {
      icon: Users,
      title: "Creator-Focused Workflow",
      description: "We speak creator language. Drop your raw footages and instructions via drive or frame.io, and let us handle all the technical heavy-lifting.",
    },
    {
      icon: RotateCcw,
      title: "Revision-Friendly Process",
      description: "We refine edits collaboratively. With simple feedback loops, we adjust transitions, audio levels, and style cards until it matches your exact vision.",
    },
  ];

  return (
    <section className="relative w-full bg-obsidian py-24 border-t border-obsidian-border" id="benefits">
      {/* Creative Section Number */}
      <div className="absolute top-8 left-6 md:left-8 select-none pointer-events-none">
        <span className="text-xs font-black tracking-wider text-[#00dc05]">
          05
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-wider text-brand-accent uppercase">Why Choose GrowCuts</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading">
            Results We Help Create
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-obsidian-muted">
            We focus on professional editing workflows that elevate content value, build authority, and keep viewers watching longer.
          </p>
        </div>

        {/* 4-Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative rounded-xl border border-obsidian-border bg-obsidian-card p-6 transition-all duration-300 hover:border-brand-accent/20"
              >
                {/* Visual Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-obsidian-border text-brand-accent transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-obsidian">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-bold text-white font-heading">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-obsidian-muted">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

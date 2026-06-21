"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { Clock, BookOpen, EyeOff } from "lucide-react";

export default function ProblemSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const problems = [
    {
      icon: Clock,
      title: "Slow Pacing",
      description: "Sluggish intros and empty gaps kill viewer retention within the first 3 seconds. Modern audiences swipe away if you waste even a single frame.",
    },
    {
      icon: BookOpen,
      title: "Weak Storytelling",
      description: "Without a structured hook, retention peaks, and payoffs, raw footage turns flat. A lack of narrative engineering makes even good topics boring.",
    },
    {
      icon: EyeOff,
      title: "Lack of Visual Reinforcement",
      description: "Missing text overlays, sluggish transitions, and flat sound design look amateur. Visual reinforcement is required to keep eyes locked on the screen.",
    },
  ];

  return (
    <section className="relative w-full bg-obsidian py-24 border-y border-obsidian-border" id="problem">
      {/* Creative Section Number */}
      <div className="absolute top-8 left-6 md:left-8 select-none pointer-events-none">
        <span className="text-xs font-black tracking-wider text-[#00dc05]">
          01
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-wider text-brand-accent uppercase">The Audience Gap</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading">
            Why Most Videos Lose Attention
          </h2>
        </div>

        {/* 3-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative rounded-2xl border border-obsidian-border bg-obsidian-card p-8 transition-all duration-300 hover:border-brand-accent/30"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-brand-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Icon Container */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-obsidian-deep border border-obsidian-border text-brand-accent transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-slate-950">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-white font-heading">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-obsidian-muted">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Concluding Transition Callout */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <div className="inline-block rounded-2xl border border-brand-accent/20 bg-brand-accent/5 px-8 py-8 md:px-12 max-w-3xl">
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              Stop losing viewers to bad editing. <br className="hidden sm:inline" />
              <span className="text-brand-accent font-extrabold">GrowCuts engineers attention.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { Upload, Cpu, PenTool, CheckCircle } from "lucide-react";

export default function ProcessTimeline() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const stepVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const steps = [
    {
      stepNum: "01",
      icon: Upload,
      title: "Send Raw Footage",
      desc: "Upload your raw clips, voiceovers, thumbnails, and creative briefs to our secure shared storage drive or Frame.io project.",
    },
    {
      stepNum: "02",
      icon: Cpu,
      title: "Strategic Video Engineering",
      desc: "Our editors assemble the cuts, engineer the hook, optimize the pacing, apply color grading, sound design, and text graphics.",
    },
    {
      stepNum: "03",
      icon: PenTool,
      title: "Collaborative Polish & Revisions",
      desc: "Review the initial cut. Suggest time-stamped changes directly, and we will revise graphics, cuts, or overlays until it is perfect.",
    },
    {
      stepNum: "04",
      icon: CheckCircle,
      title: "High-Retention Delivery",
      desc: "Receive your final video file formatted and optimized in full resolution, ready to upload and engage your target audience.",
    },
  ];

  return (
    <section className="relative w-full bg-obsidian py-24 border-t border-obsidian-border" id="process">
      {/* Creative Section Number */}
      <div className="absolute top-8 left-6 md:left-8 select-none pointer-events-none">
        <span className="text-xs font-black tracking-wider text-[#00dc05]">
          07
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold tracking-wider text-brand-accent uppercase">Our Workflow</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading">
            Simple. Clear. Efficient.
          </h2>
        </div>

        {/* Timeline Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Horizontal Line connector (desktop only) */}
          <div className="absolute top-[28px] left-[50px] right-[50px] hidden md:block h-[1px] bg-gradient-to-r from-brand-accent/30 via-obsidian-border to-brand-accent/30 -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={stepVariants}
                className="group relative flex flex-col items-center md:items-start text-center md:text-left bg-obsidian-card border border-obsidian-border rounded-2xl p-6 md:p-8"
              >
                {/* Number / Icon Bubble */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-obsidian-deep border border-obsidian-border text-brand-accent transition-all duration-300 group-hover:bg-brand-accent group-hover:text-obsidian group-hover:scale-105 z-10 shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Step Metadata */}
                <span className="mt-6 text-[10px] font-bold tracking-widest text-brand-accent uppercase">
                  Step {step.stepNum}
                </span>

                {/* Title */}
                <h3 className="mt-3 text-lg font-bold text-white font-heading">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-obsidian-muted">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

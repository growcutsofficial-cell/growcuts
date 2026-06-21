"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import Image from "next/image";

export default function SoftwareStack() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
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

  const stack = [
    {
      name: "Premiere Pro",
      role: "Timeline Engineering & Pacing",
      icon: "/premiere.png",
      glow: "group-hover:shadow-[0_0_20px_rgba(26,115,232,0.15)]",
      borderColor: "group-hover:border-[#0000d6]/30",
    },
    {
      name: "After Effects",
      role: "Visual FX & Motion Graphics",
      icon: "/after-effects.png",
      glow: "group-hover:shadow-[0_0_20px_rgba(155,89,182,0.15)]",
      borderColor: "group-hover:border-[#9b59b6]/30",
    },
    {
      name: "DaVinci Resolve",
      role: "Cinematic Color & Sound",
      icon: "/davinci.png",
      glow: "group-hover:shadow-[0_0_20px_rgba(243,156,18,0.15)]",
      borderColor: "group-hover:border-[#f39c12]/30",
    },
    {
      name: "Photoshop",
      role: "Assets & Thumbnail Elements",
      icon: "/photoshop.png",
      glow: "group-hover:shadow-[0_0_20px_rgba(52,152,219,0.15)]",
      borderColor: "group-hover:border-[#3498db]/30",
    },
  ];

  return (
    <section className="relative w-full bg-slate-50 py-16 border-b border-slate-200/80 overflow-hidden light-section">
      {/* Creative Section Number */}
      <div className="absolute top-8 left-6 md:left-8 select-none pointer-events-none">
        <span className="text-xs font-black tracking-wider text-green-700">
          02
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Section Info */}
          <div className="max-w-md">
            <span className="text-xs font-semibold tracking-wider text-green-700 uppercase">Production Quality</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-black font-heading">
              Our Creative Engine
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We leverage industry-standard video engineering pipelines to deliver frame-accurate timing, motion design, and high-fidelity output.
            </p>
          </div>

          {/* Software Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow md:max-w-3xl"
          >
            {stack.map((item, index) => {
               return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ${item.borderColor} ${item.glow} hover:-translate-y-1`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Centered Image Container with custom rounded styling */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                      <Image
                        src={item.icon}
                        alt={`${item.name} Logo`}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-black font-heading">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

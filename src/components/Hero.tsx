"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight, Star, FileText } from "lucide-react";
import LeadFormModal from "./LeadFormModal";
import Image from "next/image";

function SoftwareIconTile({ src, alt, className = "", delay = 0, style = {} }: { src: string; alt: string; className?: string; delay?: number; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);

  // Hard extruded shadow filter styles
  const normalFilter = "drop-shadow(1px 1px 0px #00dc05) drop-shadow(2px 2px 0px #00dc05) drop-shadow(3px 3px 0px #00dc05)";
  const hoverFilter = "drop-shadow(1px 1px 0px #00dc05) drop-shadow(2px 2px 0px #00dc05) drop-shadow(3px 3px 0px #00dc05) drop-shadow(4px 4px 0px #00dc05) drop-shadow(5px 5px 0px #00dc05)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        filter: hovered ? hoverFilter : normalFilter,
      }}
      className={`relative flex items-center justify-center select-none transition-all duration-300 hover:scale-110 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isReduced = mounted ? shouldReduceMotion : false;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: isReduced ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden py-20 bg-transparent">
      <style>{`
  @keyframes powerOn {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
  .animate-power-on {
    animation: powerOn 1s ease-out forwards;
  }
  .studio-grid {
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
    -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
    opacity: 0.6;
  }
`}</style>

      {/* Solid background color behind everything */}
      <div className="absolute inset-0 bg-[#0a0a0a] -z-30 pointer-events-none" />

      {/* Premium Ambient Background Visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 animate-power-on">
        {/* 3D Studio Grid with Radial Mask */}
        <div className="absolute inset-0 studio-grid" />
        
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 -z-20 opacity-75 [mask-image:radial-gradient(circle_at_center,black_70%,transparent_98%)]">
          <Image
            src="/dark-cinematic-bg.jpeg"
            alt="Cinematic Background"
            fill
            priority
            className="object-cover select-none pointer-events-none"
          />
        </div>

        {/* Static Neon Flares */}
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full bg-[#00dc05]/10 blur-[180px]" />
        <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[180px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 w-full flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-3xl lg:max-w-2xl xl:max-w-3xl rounded-3xl border border-white/20 bg-black/20 backdrop-blur-lg p-8 md:p-12 flex flex-col items-center text-center shadow-[0_24px_50px_-12px_rgba(0,0,0,1)] transition-all duration-300"
        >
          {/* Desktop Left Grouping (Vertically Centered) */}
          <div className="hidden lg:flex absolute -left-24 xl:-left-32 top-1/2 -translate-y-1/2 flex-col gap-5 z-20">
            <SoftwareIconTile 
              src="/after-effects.png" 
              alt="Adobe After Effects" 
              className="w-16 h-16 xl:w-20 xl:h-20"
              style={{ transform: "perspective(1000px) rotateY(20deg) rotateX(5deg)" }}
              delay={0.15}
            />
            <SoftwareIconTile 
              src="/davinci.png" 
              alt="DaVinci Resolve" 
              className="w-16 h-16 xl:w-20 xl:h-20 scale-[1.18]"
              style={{ transform: "perspective(1000px) rotateY(20deg) rotateX(5deg)" }}
              delay={0.3}
            />
          </div>

          {/* Desktop Right Grouping (Vertically Centered) */}
          <div className="hidden lg:flex absolute -right-24 xl:-right-32 top-1/2 -translate-y-1/2 flex-col gap-5 z-20">
            <SoftwareIconTile 
              src="/premiere.png" 
              alt="Adobe Premiere Pro" 
              className="w-16 h-16 xl:w-20 xl:h-20"
              style={{ transform: "perspective(1000px) rotateY(-20deg) rotateX(5deg)" }}
              delay={0.2}
            />
            <SoftwareIconTile 
              src="/photoshop.png" 
              alt="Adobe Photoshop" 
              className="w-16 h-16 xl:w-20 xl:h-20"
              style={{ transform: "perspective(1000px) rotateY(-20deg) rotateX(5deg)" }}
              delay={0.35}
            />
          </div>

          {/* Subtle Tagline */}
          <motion.span
            className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#00dc05]/20 bg-[#00dc05]/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#00dc05] uppercase"
          >
            Video Agency
          </motion.span>

          {/* Mobile & Tablet Software Icon Row */}
          <div className="flex lg:hidden items-center justify-center gap-3 sm:gap-4 mb-6 mt-1">
            <SoftwareIconTile src="/after-effects.png" alt="Adobe After Effects" className="w-12 h-12 rounded-xl p-2.5" delay={0.1} />
            <SoftwareIconTile src="/davinci.png" alt="DaVinci Resolve" className="w-12 h-12 rounded-xl p-2.5 scale-[1.18]" delay={0.2} />
            <SoftwareIconTile src="/premiere.png" alt="Adobe Premiere Pro" className="w-12 h-12 rounded-xl p-2.5" delay={0.3} />
            <SoftwareIconTile src="/photoshop.png" alt="Adobe Photoshop" className="w-12 h-12 rounded-xl p-2.5" delay={0.4} />
          </div>
 
          {/* H1 Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl max-w-4xl font-heading leading-tight text-white"
          >
            Premium Video Editing for Creators & Brands
          
            
          </motion.h1>
 
          {/* Subheading (Uses Soft Mint/White) */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg text-obsidian-muted sm:text-xl md:text-2xl"
          >
            We craft high-retention videos that scale your audience and drive revenue.
          </motion.p>
 
          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            {/* Primary: Fill Lead Form */}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#00dc05]/40 bg-gradient-to-r from-[#00dc05]/20 to-black px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-[#00dc05] hover:shadow-[0_0_5px_rgba(0,220,5,0.5)] hover:from-[#00dc05]/40 hover:to-[#00dc05]/10 active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              <FileText className="h-5 w-5 text-neutral-400" />
              Fill Form
            </motion.button>
 
            {/* Secondary: View Our Work */}
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#00dc05]/40 bg-gradient-to-r from-[#00dc05]/20 to-black px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-[#00dc05] hover:shadow-[0_0_5px_rgba(0,220,5,0.5)] hover:from-[#00dc05]/40 hover:to-[#00dc05]/10 active:scale-95 w-full sm:w-auto"
            >
              View Our Work
              <ArrowRight className="h-5 w-5 text-neutral-400" />
            </a>
          </motion.div>
 
          {/* Trust Signal Rating stars */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <div className="flex items-center gap-0.5 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="text-sm text-neutral-400 font-medium">
              Cinematic quality. Flawless execution. Delivered on time.
            </p>
          </motion.div>

        </motion.div>
      </div>
 
      {/* Downward Arrow indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-obsidian-muted/50">Scroll to Explore</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[#00dc05]/50 to-transparent" />
        </div>
      </div>
 
      {/* Lead Form Modal */}
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

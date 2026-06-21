"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Video, Repeat, Palette, Sparkles, Megaphone, Presentation } from "lucide-react";

export default function Solutions() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"creators" | "businesses">("creators");
  const shouldReduceMotion = useReducedMotion();
  const isReduced = mounted ? shouldReduceMotion : false;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const offerings = {
    creators: {
      title: "Scale Your Audience",
      description: "Custom video engineering designed to grow channels, boost view duration, and free up creator schedules.",
      items: [
        {
          icon: Video,
          title: "Long-form YouTube Editing",
          desc: "Cinematic pacing, documentary-style cuts, and audio design customized to improve viewer retention rates on major uploads.",
        },
        {
          icon: Repeat,
          title: "Shorts & Reels Repurposing",
          desc: "Extract gold nuggets from your long video files and adapt them into high-converting 60-second vertical clips with trendy styling.",
        },
        {
          icon: Palette,
          title: "Thumbnail & Assets Layout",
          desc: "Create high-clickrate (CTR) custom visual elements, thumbnails, dynamic titles, and custom branding templates for your channel.",
        },
      ],
    },
    businesses: {
      title: "Convert More Customers",
      description: "Result-driven marketing assets engineered to showcase products, build credibility, and generate conversions.",
      items: [
        {
          icon: Megaphone,
          title: "High-Converting Ad Creatives",
          desc: "Direct response videos, TikTok ads, and Meta ads with hooks and editing engineered for click-through-rates.",
        },
        {
          icon: Sparkles,
          title: "Promotional & Product Videos",
          desc: "Premium, polished product showcases and promotional launch videos that highlight key benefits and build brand premium.",
        },
        {
          icon: Presentation,
          title: "Brand Storytelling Videos",
          desc: "Company documentaries, case studies, founder stories, and customer success stories edited to drive trust.",
        },
      ],
    },
  };

  const currentOffer = offerings[activeTab];

  return (
    <section className="relative w-full bg-slate-50 py-24 border-t border-slate-200/80 light-section" id="solutions">
      {/* Creative Section Number */}
      <div className="absolute top-8 left-6 md:left-8 select-none pointer-events-none">
        <span className="text-xs font-black tracking-wider text-green-700">
          06
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-wider text-green-700 uppercase">Solutions</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl font-heading">
            Tailored Video Solutions
          </h2>
          
          {/* Tabs Toggle */}
          <div className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 p-1.5">
            <button
              onClick={() => setActiveTab("creators")}
              className={`relative rounded-full px-3 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "creators"
                  ? "text-black"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              {activeTab === "creators" && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-full bg-brand-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">For Creators</span>
            </button>
            <button
              onClick={() => setActiveTab("businesses")}
              className={`relative rounded-full px-3 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "businesses"
                  ? "text-black"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              {activeTab === "businesses" && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-full bg-brand-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">For Businesses</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: isReduced ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: isReduced ? 0 : -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Tab Header Info */}
              <div className="text-center mb-12">
                <h3 className="text-xl font-bold text-black font-heading">
                  {currentOffer.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
                  {currentOffer.description}
                </p>
              </div>

              {/* Offerings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentOffer.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className={`group relative rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 ${
                        index === 1 ? "border-green-600/30 hover:border-green-600/50 hover:shadow-md" : "border-slate-200 hover:border-green-600/30 hover:shadow-md"
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-green-700 group-hover:bg-brand-accent group-hover:text-black transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="mt-5 text-base font-bold text-black font-heading">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

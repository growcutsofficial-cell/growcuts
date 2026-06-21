"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { portfolioData, PortfolioCategory, PortfolioItem } from "@/data/portfolio";
import { Play, X } from "lucide-react";

export default function PortfolioGrid() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"All" | PortfolioCategory>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isReduced = mounted ? shouldReduceMotion : false;

  const getEmbedUrl = (url: string) => {
    // YouTube
    const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const ytMatch = url.match(ytRegExp);
    if (ytMatch && ytMatch[2].length === 11) {
      return { type: "youtube", url: `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1` };
    }

    // Vimeo
    const vimeoRegExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    const vimeoMatch = url.match(vimeoRegExp);
    if (vimeoMatch) {
      return { type: "vimeo", url: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1` };
    }

    return null;
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVideoLoadError(false);
  }, [selectedItem]);

  const filters: ("All" | PortfolioCategory)[] = ["All", "Shorts", "Long-form", "Promos"];

  const filteredItems = portfolioData.filter((item) => {
    if (activeFilter === "All") return true;
    return item.category === activeFilter;
  });

  return (
    <section className="relative w-full bg-obsidian py-24 border-b border-obsidian-border" id="work">
      {/* Creative Section Number */}
      <div className="absolute top-8 left-6 md:left-8 select-none pointer-events-none">
        <span className="text-xs font-black tracking-wider text-[#00dc05]">
          03
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-xs font-semibold tracking-wider text-brand-accent uppercase">Our Work</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading">
              Featured Projects
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 rounded-2xl sm:rounded-full border border-obsidian-border bg-obsidian-card p-1.5 self-start shadow-sm">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeFilter === filter
                    ? "text-obsidian"
                    : "text-obsidian-muted hover:text-white"
                }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 rounded-full bg-brand-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        {!mounted ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl border border-obsidian-border bg-obsidian-card overflow-hidden shadow-sm"
              >
                {/* Thumbnail Wrapper */}
                <div className="relative aspect-video w-full overflow-hidden bg-obsidian-deep">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-white leading-snug font-heading">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout={!isReduced}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout={!isReduced}
                  initial={{ opacity: 0, scale: isReduced ? 1 : 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: isReduced ? 1 : 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer relative rounded-2xl border border-obsidian-border bg-obsidian-card overflow-hidden shadow-sm transition-all duration-300 hover:border-brand-accent/30"
                >
                  {/* Thumbnail Wrapper */}
                  <div className="relative aspect-video w-full overflow-hidden bg-obsidian-deep">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 md:bg-black/60 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent text-obsidian transform scale-100 md:scale-75 md:group-hover:scale-100 transition-all duration-300 shadow-lg">
                        <Play className="h-5 w-5 fill-obsidian ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-white leading-snug group-hover:text-brand-accent transition-colors font-heading">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Video Playback Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: isReduced ? 1 : 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: isReduced ? 1 : 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-obsidian-border bg-obsidian-card shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-obsidian-border px-6 py-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-base font-bold text-white font-heading mt-0.5">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-obsidian-border bg-obsidian-deep text-obsidian-muted transition-colors hover:bg-obsidian-border hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Video Player Area */}
              <div className="relative aspect-video w-full bg-black">
                {(() => {
                  const embed = getEmbedUrl(selectedItem.videoUrl);
                  if (embed) {
                    return (
                      <iframe
                        src={embed.url}
                        className="h-full w-full object-contain border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }
                  if (videoLoadError) {
                    return (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-obsidian-deep">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent mb-4">
                          <Play className="h-8 w-8 text-brand-accent" />
                        </div>
                        <h4 className="text-lg font-bold text-white font-heading">Sample Video Preview</h4>
                        <p className="text-sm text-obsidian-muted max-w-md mt-2">
                          This modal is ready to stream <strong>{selectedItem.title}</strong> once you replace <strong>{selectedItem.videoUrl}</strong> in <code>src/data/portfolio.ts</code> with your actual raw mp4 or cloud link!
                        </p>
                      </div>
                    );
                  }
                  return (
                    <video
                      src={selectedItem.videoUrl}
                      controls
                      autoPlay
                      className="h-full w-full object-contain"
                      onError={() => setVideoLoadError(true)}
                    />
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

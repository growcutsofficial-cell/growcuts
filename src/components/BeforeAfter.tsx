"use client";

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from "react";
import Image from "next/image";

export default function BeforeAfter() {
  const [mounted, setMounted] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: globalThis.MouseEvent) => {
      handleMove(e.clientX);
    };

    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="relative w-full bg-slate-50 py-24 border-t border-slate-200/80 overflow-hidden light-section" id="before-after">
      {/* Creative Section Number */}
      <div className="absolute top-8 left-6 md:left-8 select-none pointer-events-none">
        <span className="text-xs font-black tracking-wider text-green-700">
          04
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-wider text-green-700 uppercase">Editing Magic</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl font-heading">
            Raw Footage vs GrowCuts Edit
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
            Drag the slider to see how we transform flat, raw footage with pacing cuts, custom text graphics, and cinematic color grading.
          </p>
        </div>

        {/* Interactive Slider Container */}
        <div className="mx-auto max-w-4xl">
          {!mounted ? (
            <div className="aspect-video w-full rounded-2xl border border-slate-200 bg-slate-100 animate-pulse" />
          ) : (
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="relative aspect-video w-full select-none overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 cursor-ew-resize shadow-xl touch-none"
            >
              {/* Background Layer: After (GrowCuts Edit) showing on the right */}
              <div className="absolute inset-0 h-full w-full bg-neutral-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/After Thumbnail.webp"
                    alt="GrowCuts Edit Preview"
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Simulated Graphics & Captions Overlay (typical video edit style) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                    <span className="rounded bg-yellow-400 text-black px-4 py-1 text-base font-extrabold uppercase tracking-wide shadow-lg border-2 border-black rotate-[-2deg] font-heading">
                      ENGAGEMENT +180%
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-10 rounded bg-brand-accent px-3 py-1 text-[10px] font-bold tracking-wider text-obsidian uppercase">
                  GrowCuts Edit
                </div>
              </div>

              {/* Clipped Layer: Before (Raw) showing on the left */}
              <div
                className="absolute inset-0 z-10 overflow-hidden bg-neutral-900 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="absolute inset-0 h-full w-full aspect-video">
                  <Image
                    src="/Before Thumbnail.webp"
                    alt="Raw Footage Preview"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute top-4 left-4 z-20 rounded bg-black/60 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase border border-white/10">
                  Raw Footage
                </div>
              </div>

              {/* Slider Handle / Divider Line */}
              <div
                className="absolute inset-y-0 z-30 w-[2px] bg-brand-accent pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Interactive Handle Bubble */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-obsidian shadow-lg border-4 border-obsidian">
                  <svg
                    className="h-3 w-3 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

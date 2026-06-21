"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";

export default function SplineSimulator() {
  const [glowColor, setGlowColor] = useState("#00dc05");
  const [coreColor, setCoreColor] = useState("#f0fff0");
  const [glowIntensity, setGlowIntensity] = useState(0.4);
  const [coreWidth, setCoreWidth] = useState(1.5);
  const [smallBlur, setSmallBlur] = useState(3);
  const [largeBlur, setLargeBlur] = useState(8);
  const [speed, setSpeed] = useState(20);
  const [curveCount, setCurveCount] = useState(4);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Bezier curves in a 1000x600 viewBox space
  const curves = [
    "M -50 150 C 300 100, 700 500, 1050 350",
    "M -50 450 C 400 350, 600 50, 1050 -50",
    "M 1050 -50 C 800 200, 500 550, 200 650",
    "M 1050 450 C 700 300, 300 150, -50 250",
    "M -50 200 C 350 50, 650 550, 1050 400",
    "M -50 350 C 450 150, 550 450, 1050 250"
  ];

  // Dynamic CSS animation styles injected into preview
  const animationStyles = `
    @keyframes spline-flow-sim {
      from { stroke-dashoffset: 1000; }
      to { stroke-dashoffset: 0; }
    }
    .sim-spline {
      stroke-dasharray: 150 350;
      animation: spline-flow-sim ${speed}s linear infinite;
    }
  `;

  // Code generation template
  const generateComponentCode = () => {
    const renderPaths = curves.slice(0, curveCount).map((c, i) => `          <path key={${i}} d="${c}" className="spline-line" />`).join("\n");
    const renderFaintPaths = curves.slice(0, curveCount).map((c, i) => `          <path key={${i}} d="${c}" />`).join("\n");

    return `"use client";

import React, { useEffect, useState } from "react";

export default function NeonSplines() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full min-h-full overflow-hidden bg-black pointer-events-none -z-10" aria-hidden="true">
      <svg
        className="w-full h-full opacity-60"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Custom Neon Glow Filter */}
          <filter id="custom-neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="${smallBlur}" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="${largeBlur}" result="blur2" />
            
            {/* Color Matrix to multiply opacity based on Glow Intensity */}
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 ${glowIntensity} 0
            " in="blur2" result="blur2-glow" />
            
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 ${(glowIntensity * 1.5).toFixed(2)} 0
            " in="blur1" result="blur1-glow" />
            
            <feMerge>
              <feMergeNode in="blur2-glow" />
              <feMergeNode in="blur1-glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Gradient to fade endpoints to transparent */}
          <linearGradient id="glow-fade-grad" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="${glowColor}" stopOpacity="0" />
            <stop offset="15%" stopColor="${glowColor}" stopOpacity="0.75" />
            <stop offset="50%" stopColor="${glowColor}" stopOpacity="1" />
            <stop offset="85%" stopColor="${glowColor}" stopOpacity="0.75" />
            <stop offset="100%" stopColor="${glowColor}" stopOpacity="0" />
          </linearGradient>
        </defs>

        <style>{\`
          @keyframes custom-flow {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
          }
          .spline-line {
            stroke-dasharray: 150 350;
            animation: custom-flow ${speed}s linear infinite;
          }
        \`}</style>

        {/* Faint background static paths */}
        <g stroke="${glowColor}" strokeWidth="1" opacity="0.12">
${renderFaintPaths}
        </g>

        {/* Glowing animated paths */}
        <g filter="url(#custom-neon-glow)">
          {/* Core Off-White paths */}
          <g stroke="${coreColor}" strokeWidth="${coreWidth}">
${renderPaths}
          </g>
          {/* Glowing Green paths */}
          <g stroke="url(#glow-fade-grad)" strokeWidth="${(parseFloat(coreWidth.toString()) + 1.2).toFixed(1)}" opacity="0.8">
${renderPaths}
          </g>
        </g>
      </svg>
    </div>
  );
}`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-[#00dc05]/30">
      <style>{animationStyles}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white mb-3 transition-colors uppercase tracking-wider">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading">
            Neon Splines Visual Simulator
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Tune parameters to define your own clean, professional ambient background glow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-3.5 w-3.5 rounded-full bg-[#00dc05] animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-[#00dc05] uppercase">Interactive Engine</span>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Preview Panel (Spans 2 columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="relative w-full h-[500px] bg-black rounded-2xl border border-neutral-800 overflow-hidden flex flex-col items-center justify-center shadow-2xl">
            {/* Ambient indicator */}
            <div className="absolute top-4 left-4 z-10 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 text-[10px] uppercase font-bold tracking-widest text-neutral-400">
              Live Preview
            </div>

            {/* Simulated Neon Splines SVG */}
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* SVG Filter carrying small + large blurs and ColorMatrix */}
                <filter id="neon-glow-sim" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation={smallBlur} result="blur1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation={largeBlur} result="blur2" />
                  
                  {/* Dynamic glow opacity mapping */}
                  <feColorMatrix type="matrix" values={`
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 ${glowIntensity} 0
                  `} in="blur2" result="blur2-glow" />
                  
                  <feColorMatrix type="matrix" values={`
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 ${glowIntensity * 1.5} 0
                  `} in="blur1" result="blur1-glow" />
                  
                  <feMerge>
                    <feMergeNode in="blur2-glow" />
                    <feMergeNode in="blur1-glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                {/* Dynamic Gradient mapping endpoints fade */}
                <linearGradient id="fade-grad-sim" x1="0" y1="0.5" x2="1" y2="0.5">
                  <stop offset="0%" stopColor={glowColor} stopOpacity="0" />
                  <stop offset="15%" stopColor={glowColor} stopOpacity="0.75" />
                  <stop offset="50%" stopColor={glowColor} stopOpacity="1" />
                  <stop offset="85%" stopColor={glowColor} stopOpacity="0.75" />
                  <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Faint static spline lines underlay */}
              <g stroke={glowColor} strokeWidth="1" opacity="0.12">
                {curves.slice(0, curveCount).map((c, i) => (
                  <path key={i} d={c} />
                ))}
              </g>

              {/* Blending glow and core vectors */}
              <g filter="url(#neon-glow-sim)">
                {/* Core light spline paths */}
                <g stroke={coreColor} strokeWidth={coreWidth}>
                  {curves.slice(0, curveCount).map((c, i) => (
                    <path key={i} d={c} className="sim-spline" />
                  ))}
                </g>
                {/* Outer colored glowing envelope */}
                <g stroke="url(#fade-grad-sim)" strokeWidth={(parseFloat(coreWidth.toString()) + 1.2).toFixed(1)} opacity="0.8">
                  {curves.slice(0, curveCount).map((c, i) => (
                    <path key={i} d={c} className="sim-spline" />
                  ))}
                </g>
              </g>
            </svg>
          </div>

          {/* Export Code Segment */}
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="text-lg font-bold tracking-tight">Code Export</h2>
              <button
                onClick={() => copyToClipboard(generateComponentCode(), "React")}
                className="inline-flex items-center gap-2 rounded-lg bg-[#00dc05] px-3.5 py-1.5 text-xs font-bold text-black hover:bg-[#00c804] active:scale-95 transition-all"
              >
                {copiedType === "React" ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy React Component
                  </>
                )}
              </button>
            </div>
            
            <p className="text-xs text-neutral-400">
              Get the complete, self-contained dynamic Next.js React component for the exact values you configured.
            </p>

            <pre className="bg-black/60 p-4 rounded-xl text-[10px] font-mono text-neutral-300 max-h-[250px] overflow-y-auto border border-neutral-800/50 leading-relaxed">
              {generateComponentCode()}
            </pre>
          </div>
        </div>

        {/* Right: Stacked Form Input Controls */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 flex flex-col gap-6 shadow-xl h-fit">
          <h2 className="text-lg font-bold tracking-tight border-b border-neutral-800 pb-3">
            Visual Parameters
          </h2>

          <div className="space-y-5">
            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-neutral-400">
                  Primary Glow Color
                </label>
                <div className="flex items-center gap-2 bg-black rounded-lg border border-neutral-800 p-2">
                  <input
                    type="color"
                    className="h-7 w-7 rounded cursor-pointer border border-neutral-700 bg-transparent"
                    value={glowColor}
                    onChange={(e) => setGlowColor(e.target.value)}
                  />
                  <span className="text-[10px] font-mono font-semibold text-neutral-300">
                    {glowColor.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-neutral-400">
                  Core Path Color
                </label>
                <div className="flex items-center gap-2 bg-black rounded-lg border border-neutral-800 p-2">
                  <input
                    type="color"
                    className="h-7 w-7 rounded cursor-pointer border border-neutral-700 bg-transparent"
                    value={coreColor}
                    onChange={(e) => setCoreColor(e.target.value)}
                  />
                  <span className="text-[10px] font-mono font-semibold text-neutral-300">
                    {coreColor.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Glow Intensity */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-neutral-400">Glow Intensity</label>
                <span className="font-mono text-neutral-300 font-bold">{glowIntensity}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.1"
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00dc05]"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
              />
            </div>

            {/* Core Stroke Width */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-neutral-400">Core Stroke Width</label>
                <span className="font-mono text-neutral-300 font-bold">{coreWidth}px</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00dc05]"
                value={coreWidth}
                onChange={(e) => setCoreWidth(parseFloat(e.target.value))}
              />
            </div>

            {/* Small Blur Radius */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-neutral-400">Small Blur Radius</label>
                <span className="font-mono text-neutral-300 font-bold">{smallBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00dc05]"
                value={smallBlur}
                onChange={(e) => setSmallBlur(parseInt(e.target.value))}
              />
            </div>

            {/* Large Blur Radius */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-neutral-400">Large Blur Radius</label>
                <span className="font-mono text-neutral-300 font-bold">{largeBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00dc05]"
                value={largeBlur}
                onChange={(e) => setLargeBlur(parseInt(e.target.value))}
              />
            </div>

            {/* Speed */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-neutral-400">Speed (Period)</label>
                <span className="font-mono text-neutral-300 font-bold">{speed}s</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00dc05]"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
              />
            </div>

            {/* Curve Count */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-neutral-400">Lines Quantity</label>
                <span className="font-mono text-neutral-300 font-bold">{curveCount} lines</span>
              </div>
              <input
                type="range"
                min="2"
                max="6"
                step="1"
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00dc05]"
                value={curveCount}
                onChange={(e) => setCurveCount(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="rounded-xl bg-black/50 p-4 border border-neutral-800/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Simulator Note
            </h3>
            <p className="text-[10px] text-neutral-500 leading-relaxed">
              This dashboard leverages SVG feGaussianBlur, feColorMatrix filters, and linear fade gradients. Copy the code to use the responsive overlay in your hero or content section.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

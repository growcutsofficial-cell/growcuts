"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTACT } from "@/config/site";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-obsidian-border bg-obsidian/80 backdrop-blur-md h-[73px]" />
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-obsidian-border bg-obsidian/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo-icon-cropped.png" 
            alt="GrowCuts Logo" 
            width={28} 
            height={28} 
            className="h-7 w-7 object-contain"
          />
          <span className="text-2xl font-extrabold tracking-tighter text-white font-heading">
            GrowCuts
          </span>
        </Link>
 
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium text-obsidian-muted transition-colors hover:text-white">Home</Link>
          <Link href="#work" className="text-sm font-medium text-obsidian-muted transition-colors hover:text-white">Work</Link>
          <Link href="#process" className="text-sm font-medium text-obsidian-muted transition-colors hover:text-white">Process</Link>
          <Link href="#faq" className="text-sm font-medium text-obsidian-muted transition-colors hover:text-white">FAQ</Link>
        </nav>
 
        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href={CONTACT.phone} className="inline-flex items-center gap-2 rounded-full bg-obsidian-card border-[1.5px] border-white/10 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:border-2 hover:border-[#00dc05] active:scale-95">
            <Phone className="h-4 w-4 text-neutral-400" />
            Call Us Now
          </a>
        </div>
 
        {/* Mobile Hamburger Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 items-center justify-center rounded-md border border-obsidian-border bg-obsidian-card text-foreground transition-colors hover:bg-obsidian-border md:hidden">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
 
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="border-b border-obsidian-border bg-obsidian px-6 py-6 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-base font-medium text-obsidian-muted hover:text-white transition-colors">Home</Link>
            <Link href="#work" onClick={() => setIsOpen(false)} className="text-base font-medium text-obsidian-muted hover:text-white transition-colors">Work</Link>
            <Link href="#process" onClick={() => setIsOpen(false)} className="text-base font-medium text-obsidian-muted hover:text-white transition-colors">Process</Link>
            <Link href="#faq" onClick={() => setIsOpen(false)} className="text-base font-medium text-obsidian-muted hover:text-white transition-colors">FAQ</Link>
            
            <div className="flex flex-col gap-2.5 mt-2">
              <a href={CONTACT.phone} onClick={() => setIsOpen(false)} className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-obsidian-card border-[1.5px] border-white/10 px-5 py-3 text-base font-semibold text-white transition-all duration-300 hover:border-2 hover:border-[#00dc05] active:scale-95">
                <Phone className="h-4 w-4 text-neutral-400" />
                Call Us Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
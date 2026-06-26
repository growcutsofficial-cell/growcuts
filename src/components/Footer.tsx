"use client";

import Link from "next/link";
import Image from "next/image";
import { CONTACT } from "@/config/site";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-obsidian-border bg-obsidian-deep z-10">
      
      {/* Final CTA Section */}
      <div className="relative overflow-hidden border-b border-obsidian-border bg-gradient-to-b from-obsidian to-obsidian-deep py-20 px-6 text-center md:px-8">
        {/* Glow ambient effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-brand-accent/5 blur-3xl" />
        
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold tracking-wider text-brand-accent uppercase">Let&apos;s Work Together</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl font-heading leading-tight">
            Ready to Stop Spending Hours Editing?
          </h2>
          <p className="mt-4 text-base md:text-lg text-obsidian-muted max-w-xl mx-auto">
            Let&apos;s turn your raw footage into content people actually watch. Book a call or start a chat today.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* WhatsApp */}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#20ba56] hover:scale-105 w-full sm:w-auto shadow-[0_8px_24px_rgba(37,211,102,0.15)]"
            >
              <WhatsAppIcon className="w-5 h-5 text-white mr-2" />
              WhatsApp Us
            </a>

            {/* Direct Call */}
            <a
              href={CONTACT.phone}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-obsidian-card border border-white/10 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:border-[#00dc05] hover:shadow-[0_0_5px_rgba(0,220,5,0.5)] w-full sm:w-auto active:scale-95"
            >
              <Phone className="h-5 w-5 text-neutral-400" />
              Call Us Now
            </a>
          </div>
        </div>
      </div>
 
      {/* Main Footer Details */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo-icon-cropped.png" 
              alt="GrowCuts Logo" 
              width={24} 
              height={24} 
              className="h-6 w-6 object-contain"
            />
            <span className="text-2xl font-extrabold tracking-tighter text-white font-heading">
              GrowCuts
            </span>
          </div>
          <p className="mt-2 text-[10px] text-obsidian-muted">
            High-retention video engineering for creators & brands.
          </p>
        </div>
 
        {/* Footer Nav Links Mirror */}
        <div className="flex space-x-6">
          <Link href="#services" className="text-xs font-semibold text-obsidian-muted hover:text-white transition-colors">Services</Link>
          <Link href="#work" className="text-xs font-semibold text-obsidian-muted hover:text-white transition-colors">Work</Link>
          <Link href="#process" className="text-xs font-semibold text-obsidian-muted hover:text-white transition-colors">Process</Link>
          <Link href="#faq" className="text-xs font-semibold text-obsidian-muted hover:text-white transition-colors">FAQ</Link>
        </div>

        {/* Social Icons & Email */}
        <div className="flex items-center space-x-4">
          <a
            href={`mailto:growcutsofficial@gmail.com`}
            className="h-8 w-8 flex items-center justify-center rounded-full border border-obsidian-border bg-obsidian-card text-obsidian-muted hover:text-white hover:border-brand-accent/30 transition-colors"
            title="Email Us"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/growcutsofficial?igsh=MTAyZzRxM2w1enVzYw=="
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 flex items-center justify-center rounded-full border border-obsidian-border bg-obsidian-card text-obsidian-muted hover:text-white hover:border-brand-accent/30 transition-colors"
            title="Instagram"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 flex items-center justify-center rounded-full border border-obsidian-border bg-obsidian-card text-obsidian-muted hover:text-white hover:border-brand-accent/30 transition-colors"
            title="WhatsApp Chat"
          >
            <MessageSquare className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="border-t border-obsidian-border py-6 px-6 text-center">
        <p className="text-[10px] text-obsidian-muted/65">
          © 2026 GrowCuts. All rights reserved. Built with precision for premium conversions.
        </p>
      </div>

    </footer>
  );
}

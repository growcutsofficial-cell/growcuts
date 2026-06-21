"use client";

import { useState, useEffect } from "react";
import { CONTACT } from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function WhatsAppFloat() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-8 right-8 z-40 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.3)] transition-all duration-300 hover:bg-[#20ba56] hover:scale-110 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8 text-white" />
      
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10 group-hover:hidden" />
      
      {/* Hover Tooltip tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 rounded bg-obsidian border border-obsidian-border px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 shadow-xl">
        Chat with GrowCuts
      </span>
    </a>
  );
}

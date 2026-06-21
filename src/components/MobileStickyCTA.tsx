"use client";

import { useState, useEffect } from "react";
import { CONTACT } from "@/config/site";
import { Eye } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function MobileStickyCTA() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full p-4 bg-obsidian/90 backdrop-blur-lg border-t border-obsidian-border flex items-center gap-3">
      {/* Secondary CTA: View Work */}
      <a
        href="#work"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-obsidian-border bg-obsidian-card py-3 px-4 text-sm font-semibold text-foreground transition-all active:scale-95"
      >
        <Eye className="h-4 w-4 text-obsidian-muted" />
        View Work
      </a>

      {/* Primary CTA: WhatsApp */}
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-[#20ba56] active:scale-95 shadow-[0_4px_12px_rgba(37,211,102,0.2)]"
      >
        <WhatsAppIcon className="w-5 h-5 text-white mr-2" />
        WhatsApp
      </a>
    </div>
  );
}

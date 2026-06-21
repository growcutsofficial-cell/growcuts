"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const faqs: FaqItem[] = [
    {
      question: "What is your turnaround time?",
      answer: "Short-form content (Reels, TikToks, Shorts) is typically delivered within 24 to 48 hours. Long-form YouTube edits or custom promotional projects take between 3 to 5 business days, depending on visual complexity.",
    },
    {
      question: "How many revisions are included?",
      answer: "We offer a collaborative revision-friendly process. We work closely to align on styling parameters first, and include up to 2 rounds of refinement adjustments to make sure the final cuts match your expectations.",
    },
    {
      question: "Which file formats do you accept?",
      answer: "We accept all industry-standard containers (MP4, MOV, MXF) and raw camera footages. You can easily upload assets via Google Drive, Dropbox, WeTransfer, or directly into a shared Frame.io project workspace.",
    },
    {
      question: "Do you edit videos for businesses and creators?",
      answer: "Yes, we specialize in both. We engineer high-retention storytelling for creators looking to build brand awareness, and design high-converting ad creatives or product promos for businesses looking to scale sales.",
    },
    {
      question: "How do we get started?",
      answer: "It's simple. Select one of our primary CTAs: book a quick call on Calendly to discuss project details, or send us a WhatsApp text to align on immediate deliverables. We will set up your asset folders and get editing immediately.",
    },
  ];

  return (
    <section className="relative w-full bg-slate-50 py-24 border-t border-slate-200/80 light-section" id="faq">
      {/* Creative Section Number */}
      <div className="absolute top-8 left-6 md:left-8 select-none pointer-events-none">
        <span className="text-xs font-black tracking-wider text-green-700">
          08
        </span>
      </div>
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-wider text-green-700 uppercase">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:border-green-600/30 shadow-sm hover:shadow-md"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-bold text-black font-heading">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-green-700" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600 bg-slate-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Video, TrendingUp, Code, Camera, CheckCircle, ArrowRight } from "lucide-react";
import LeadFormModal from "./LeadFormModal";

export default function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const services = [
    {
      title: "Video Editing Agency Services",
      subheadline: "Premium post-production for creators and modern brands.",
      icon: Video,
      features: [
        "High-retention short-form editing (Reels, TikToks, Shorts)",
        "Cinematic long-form YouTube documentaries",
        "Dynamic product promotional videos",
        "Advanced After Effects motion graphics & overlays",
        "Professional sound design & cinematic color grading",
      ],
      leadTemplate: "Hi! I am interested in your Video Editing Agency Services. I'd love to discuss my raw footage, content style, and turnaround timeline.",
    },
    {
      title: "Social Media Management (SMM)",
      subheadline: "Scale your audience, engagement, and brand authority.",
      icon: TrendingUp,
      features: [
        "Data-driven platform content strategy",
        "Daily publishing, scheduling & channel management",
        "Engaging caption writing & target audience hooks",
        "Hashtag, title & SEO keyword optimization",
        "Monthly growth analytics & strategy reporting",
      ],
      leadTemplate: "Hi! I am interested in your Social Media Management (SMM) services. I'd love to scale my brand's online presence, engagement, and publishing consistency.",
    },
    {
      title: "AI-Powered Website Design & Development",
      subheadline: "Next-generation ultra-fast websites engineered to convert leads.",
      icon: Code,
      features: [
        "Custom Next.js & React responsive development",
        "Interactive layouts & seamless motion animations",
        "Conversion-focused landing pages & sales funnels",
        "Secure database integration & Supabase setups",
        "Automated WhatsApp business bots & chat workflows",
      ],
      leadTemplate: "Hi! I am interested in your AI-Powered Website Design & Development services. I'd love to build a high-performance, conversion-focused website for my agency/business.",
    },
    {
      title: "Traditional & Event Videography",
      subheadline: "Cinematic on-location shooting for families, traditional events, and special occasions across Tamil Nadu.",
      icon: Camera,
      features: [
        "Cinematic coverage for traditional events and cultural ceremonies",
        "Premium videography for housewarming functions and milestone celebrations",
        "Beautifully directed maternity shoots and baby showers",
        "Candid event capturing for birthdays and naming ceremonies",
      ],
      leadTemplate: "Hi! I am interested in your Traditional & Event Videography services. I'd love to discuss booking cinematic coverage for an upcoming event or special occasion in Tamil Nadu.",
    },
  ];

  const handleInquire = (template: string) => {
    setSelectedServiceDetails(template);
    setIsModalOpen(true);
  };

  return (
    <section className="relative w-full bg-obsidian-deep py-24 border-t border-obsidian-border" id="services">
      {/* Creative Section Number */}
      <div className="absolute top-8 left-6 md:left-8 select-none pointer-events-none">
        <span className="text-xs font-black tracking-wider text-[#00dc05]">
          09
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="text-sm md:text-base font-bold tracking-widest text-brand-accent uppercase">Services</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl font-heading">
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-obsidian-muted">
            From high-retention video engineering to next-generation websites, we build the creative assets that drive real business growth.
          </p>
        </div>

        {/* Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 flex flex-col justify-between transition-all duration-300 hover:border-green-500/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(34,197,94,0.25)]"
              >
                {/* Backlit Glow Overlay */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-green-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  {/* Icon Wrapper */}
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400 p-4 transition-all duration-300 group-hover:bg-green-500/20 group-hover:text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.15)] mb-6">
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Title & Subheadline */}
                  <h3 className="text-2xl font-extrabold text-white font-heading leading-tight group-hover:text-green-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-400 font-medium leading-relaxed">
                    {service.subheadline}
                  </p>

                  {/* Feature Bullet Points */}
                  <ul className="mt-8 space-y-4">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-400 leading-relaxed font-sans">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action Button */}
                <div className="mt-10">
                  <button
                    onClick={() => handleInquire(service.leadTemplate)}
                    className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-green-500 hover:text-black transition-all duration-300 font-bold flex justify-center items-center gap-2 text-sm text-white hover:shadow-[0_0_25px_rgba(34,197,94,0.45)] cursor-pointer active:scale-95"
                  >
                    Inquire Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Leads Capture Popup Modal */}
      <LeadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialProjectDetails={selectedServiceDetails} 
      />
    </section>
  );
}

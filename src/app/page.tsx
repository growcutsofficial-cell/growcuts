"use client";

import dynamic from "next/dynamic";

// Loading skeletons to preserve space and avoid Cumulative Layout Shift (CLS)
const SectionSkeleton = () => (
  <div className="w-full h-[350px] bg-obsidian border-t border-obsidian-border animate-pulse" />
);

const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-obsidian animate-pulse" />
});

const ProblemSection = dynamic(() => import("@/components/ProblemSection"), {
  ssr: false,
  loading: SectionSkeleton
});
const SoftwareStack = dynamic(() => import("@/components/SoftwareStack"), {
  ssr: false,
  loading: SectionSkeleton
});
const PortfolioGrid = dynamic(() => import("@/components/PortfolioGrid"), {
  ssr: false,
  loading: SectionSkeleton
});
const BeforeAfter = dynamic(() => import("@/components/BeforeAfter"), {
  ssr: false,
  loading: SectionSkeleton
});
const Benefits = dynamic(() => import("@/components/Benefits"), {
  ssr: false,
  loading: SectionSkeleton
});
const Solutions = dynamic(() => import("@/components/Solutions"), {
  ssr: false,
  loading: SectionSkeleton
});
const ProcessTimeline = dynamic(() => import("@/components/ProcessTimeline"), {
  ssr: false,
  loading: SectionSkeleton
});
const FaqAccordion = dynamic(() => import("@/components/FaqAccordion"), {
  ssr: false,
  loading: SectionSkeleton
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: SectionSkeleton
});

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SoftwareStack />
      <PortfolioGrid />
      <BeforeAfter />
      <Benefits />
      <Solutions />
      <ProcessTimeline />
      <FaqAccordion />
      <Footer />
    </>
  );
}

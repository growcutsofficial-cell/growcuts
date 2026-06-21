"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitLead } from "@/actions/submitLead";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    location: "",
    projectDetails: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    whatsapp: "",
    location: "",
    projectDetails: "",
  });

  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setError(null);
      setIsPending(false);
      setFormData({ name: "", email: "", whatsapp: "", location: "", projectDetails: "" });
      setErrors({ name: "", email: "", whatsapp: "", location: "", projectDetails: "" });
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Listen for Escape key to close the modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!mounted) return null;

  const validateField = (field: keyof typeof formData, value: string): string => {
    const trimmed = value.trim();
    switch (field) {
      case "name":
        if (!trimmed) return "Full name is required.";
        if (trimmed.length < 2) return "Name must be at least 2 characters.";
        return "";
      case "email":
        if (!trimmed) return "Email address is required.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) return "Please enter a valid email address.";
        return "";
      case "whatsapp":
        if (!trimmed) return "WhatsApp number is required.";
        if (trimmed.length < 6) return "Please enter a valid phone number.";
        return "";
      case "location":
        if (!trimmed) return "Location is required.";
        return "";
      case "projectDetails":
        if (!trimmed) return "Project scope is required.";
        if (trimmed.length < 10) return "Please provide at least 10 characters describing your project.";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      whatsapp: validateField("whatsapp", formData.whatsapp),
      location: validateField("location", formData.location),
      projectDetails: validateField("projectDetails", formData.projectDetails),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((errorMsg) => errorMsg !== "");
    if (hasErrors) {
      // Focus the first field with an error for optimal accessibility (a11y)
      const firstErrorField = Object.keys(newErrors).find(
        (key) => newErrors[key as keyof typeof newErrors] !== ""
      );
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.focus();
        }
      }
      return;
    }

    setIsPending(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("whatsapp", formData.whatsapp);
    data.append("location", formData.location);
    data.append("projectDetails", formData.projectDetails);

    try {
      const result = await submitLead(data);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setFormData({ name: "", email: "", whatsapp: "", location: "", projectDetails: "" });
        setErrors({ name: "", email: "", whatsapp: "", location: "", projectDetails: "" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-obsidian-border bg-obsidian-card p-8 md:p-10 shadow-2xl scrollbar-thin"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-obsidian-border bg-obsidian-deep text-obsidian-muted transition-all hover:bg-obsidian-border hover:text-white hover:scale-105 active:scale-95"
              aria-label="Close form"
            >
              <X className="h-4 w-4" />
            </button>

            {success ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00dc05]/10 text-[#00dc05] mb-6 shadow-[0_0_20px_rgba(0,220,5,0.15)]">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">Submitted!</h3>
                <p className="mt-3 text-sm leading-relaxed text-obsidian-muted max-w-sm">
                  Thank you for filling out the form. We have received your project details and our team will contact you shortly via WhatsApp.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#00dc05] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#00c804] shadow-md hover:scale-105 active:scale-95"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00dc05]">Start Project</span>
                  <h3 id="modal-title" className="text-xl font-bold text-white font-heading mt-1">Let&apos;s Edit Your Next Video</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold tracking-widest text-[#e6f5e9] uppercase">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. John Doe"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      disabled={isPending}
                      className={`w-full rounded-lg border bg-obsidian-card p-3 text-[#e6f5e9] placeholder-neutral-500 hover:border-neutral-700 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 ${
                        errors.name
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-obsidian-border focus:border-[#00dc05] focus:ring-[#00dc05]/20"
                      }`}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onBlur={() => setErrors(prev => ({ ...prev, name: validateField("name", formData.name) }))}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          id="name-error"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-400 mt-1 flex items-center gap-1 overflow-hidden"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold tracking-widest text-[#e6f5e9] uppercase">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      disabled={isPending}
                      className={`w-full rounded-lg border bg-obsidian-card p-3 text-[#e6f5e9] placeholder-neutral-500 hover:border-neutral-700 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-obsidian-border focus:border-[#00dc05] focus:ring-[#00dc05]/20"
                      }`}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={() => setErrors(prev => ({ ...prev, email: validateField("email", formData.email) }))}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          id="email-error"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-400 mt-1 flex items-center gap-1 overflow-hidden"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-xs font-bold tracking-widest text-[#e6f5e9] uppercase">
                      WhatsApp Number
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      placeholder="e.g. +91 99999 99999"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.whatsapp}
                      aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                      disabled={isPending}
                      className={`w-full rounded-lg border bg-obsidian-card p-3 text-[#e6f5e9] placeholder-neutral-500 hover:border-neutral-700 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 ${
                        errors.whatsapp
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-obsidian-border focus:border-[#00dc05] focus:ring-[#00dc05]/20"
                      }`}
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      onBlur={() => setErrors(prev => ({ ...prev, whatsapp: validateField("whatsapp", formData.whatsapp) }))}
                    />
                    <AnimatePresence>
                      {errors.whatsapp && (
                        <motion.p
                          id="whatsapp-error"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-400 mt-1 flex items-center gap-1 overflow-hidden"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {errors.whatsapp}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-xs font-bold tracking-widest text-[#e6f5e9] uppercase">
                      Location (City/Area)
                    </label>
                    <input
                      id="location"
                      type="text"
                      placeholder="e.g. New York, NY"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.location}
                      aria-describedby={errors.location ? "location-error" : undefined}
                      disabled={isPending}
                      className={`w-full rounded-lg border bg-obsidian-card p-3 text-[#e6f5e9] placeholder-neutral-500 hover:border-neutral-700 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 ${
                        errors.location
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-obsidian-border focus:border-[#00dc05] focus:ring-[#00dc05]/20"
                      }`}
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      onBlur={() => setErrors(prev => ({ ...prev, location: validateField("location", formData.location) }))}
                    />
                    <AnimatePresence>
                      {errors.location && (
                        <motion.p
                          id="location-error"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-400 mt-1 flex items-center gap-1 overflow-hidden"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {errors.location}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Project Scope & Requirements */}
                  <div className="space-y-2">
                    <label htmlFor="projectDetails" className="text-xs font-bold tracking-widest text-[#e6f5e9] uppercase">
                      Project Scope & Requirements
                    </label>
                    <textarea
                      id="projectDetails"
                      rows={4}
                      placeholder="Tell us about the videos you need edited..."
                      required
                      aria-required="true"
                      aria-invalid={!!errors.projectDetails}
                      aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined}
                      disabled={isPending}
                      className={`w-full rounded-lg border bg-obsidian-card p-3 text-[#e6f5e9] placeholder-neutral-500 hover:border-neutral-700 focus:outline-none resize-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 ${
                        errors.projectDetails
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-obsidian-border focus:border-[#00dc05] focus:ring-[#00dc05]/20"
                      }`}
                      value={formData.projectDetails}
                      onChange={(e) => handleInputChange("projectDetails", e.target.value)}
                      onBlur={() => setErrors(prev => ({ ...prev, projectDetails: validateField("projectDetails", formData.projectDetails) }))}
                    />
                    <AnimatePresence>
                      {errors.projectDetails && (
                        <motion.p
                          id="projectDetails-error"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-red-400 mt-1 flex items-center gap-1 overflow-hidden"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {errors.projectDetails}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#00dc05] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#00c804] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      "Submit Project Details"
                    )}
                  </button>

                  {/* General Banner Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-500/20 p-3.5 text-xs text-red-400"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
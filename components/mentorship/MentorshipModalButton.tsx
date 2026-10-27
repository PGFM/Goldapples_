"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

const MENTOR_INTEREST_OPTIONS = [
  "Communication Intelligence Mentorship",
  "Executive Communication Intelligence",
] as const;

const RESPONSE_METHODS = ["Email", "Phone", "WhatsApp"] as const;

type MentorInterestOption = (typeof MENTOR_INTEREST_OPTIONS)[number];

interface MentorshipModalButtonProps {
  label: string;
  defaultInterest?: MentorInterestOption;
  className?: string;
}

export function MentorshipModalButton({
  label,
  defaultInterest = "Communication Intelligence Mentorship",
  className = "",
}: MentorshipModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [mentorInterest, setMentorInterest] = useState<string>(defaultInterest);
  const [message, setMessage] = useState("");
  const [preferredResponse, setPreferredResponse] = useState<string>("Email");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMentorInterest(defaultInterest);
  }, [defaultInterest]);

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function openModal() {
    setError(null);
    setSubmitted(false);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !mentorInterest || !preferredResponse) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "mentorship",
          name: name.trim(),
          email: email.trim(),
          phone: `${phoneCode} ${phone.trim()}`,
          mentorInterest,
          message: message.trim(),
          responseMethod: preferredResponse,
        }),
      }).catch(() => null);

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`inline-flex items-center justify-center gap-2 rounded-[3px] font-sans text-sm font-semibold tracking-[0.01em] transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold min-h-11 px-6 py-3 bg-gold text-ink hover:bg-gold-deep cursor-pointer ${className}`}
      >
        {label}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mentorship-modal-title"
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-ink/80 backdrop-blur-sm"
                  onClick={closeModal}
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="relative z-10 my-auto w-full max-w-[600px] max-h-[92vh] overflow-y-auto rounded-md border border-ink/15 bg-white shadow-2xl text-left"
                >
                  {/* Top Header Band */}
                  <div className="bg-ink px-6 py-6 sm:px-8 sm:py-7 flex items-start justify-between gap-4 border-b border-white/10">
                    <div>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                        Mentorship &amp; Executive Advisory
                      </p>
                      <h2
                        id="mentorship-modal-title"
                        className="mt-1.5 font-serif text-2xl sm:text-3xl text-white leading-snug"
                      >
                        {label}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      aria-label="Close modal"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-champagne/80 hover:border-gold-deep hover:text-gold transition-colors cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-8">
                    {submitted ? (
                      <div className="py-8 text-center flex flex-col items-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-champagne text-gold-deep">
                          <CheckCircle2 className="h-7 w-7" />
                        </div>
                        <h3 className="font-serif text-2xl text-ink">
                          Thank You for Reaching Out
                        </h3>
                        <p className="mt-3 text-graphite text-[15.5px] leading-relaxed max-w-[44ch]">
                          Your enquiry for{" "}
                          <span className="font-semibold text-ink">
                            {mentorInterest}
                          </span>{" "}
                          has been received. We will respond via your preferred
                          channel ({preferredResponse}).
                        </p>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="mt-8 inline-flex items-center justify-center rounded-[3px] bg-gold px-8 py-3 font-sans text-sm font-semibold text-ink hover:bg-gold-deep transition-colors cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {error && (
                          <div className="rounded-sm border border-red-600/20 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                          </div>
                        )}

                        {/* Name* */}
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="mentorship-name"
                            className="text-ink font-semibold text-[14.5px]"
                          >
                            Name <span className="text-gold-deep">*</span>
                          </label>
                          <input
                            id="mentorship-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full bg-transparent border-b border-graphite/25 pb-2.5 pt-1 text-ink text-[15.5px] focus:outline-none focus:border-gold-deep transition-colors"
                          />
                        </div>

                        {/* Email Address* */}
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="mentorship-email"
                            className="text-ink font-semibold text-[14.5px]"
                          >
                            Email address <span className="text-gold-deep">*</span>
                          </label>
                          <input
                            id="mentorship-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="w-full bg-transparent border-b border-graphite/25 pb-2.5 pt-1 text-ink text-[15.5px] focus:outline-none focus:border-gold-deep transition-colors"
                          />
                        </div>

                        {/* Phone Number* */}
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="mentorship-phone"
                            className="text-ink font-semibold text-[14.5px]"
                          >
                            Phone number <span className="text-gold-deep">*</span>
                          </label>
                          <div className="flex gap-3">
                            <select
                              aria-label="Country code"
                              value={phoneCode}
                              onChange={(e) => setPhoneCode(e.target.value)}
                              className="w-[108px] shrink-0 bg-transparent border-b border-graphite/25 pb-2.5 pt-1 text-ink text-[15px] focus:outline-none focus:border-gold-deep transition-colors cursor-pointer"
                            >
                              <option value="+234">NG (+234)</option>
                              <option value="+1">US (+1)</option>
                              <option value="+44">UK (+44)</option>
                              <option value="+27">ZA (+27)</option>
                              <option value="+254">KE (+254)</option>
                              <option value="+233">GH (+233)</option>
                            </select>
                            <input
                              id="mentorship-phone"
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Phone number"
                              className="flex-1 min-w-0 bg-transparent border-b border-graphite/25 pb-2.5 pt-1 text-ink text-[15.5px] focus:outline-none focus:border-gold-deep transition-colors"
                            />
                          </div>
                        </div>

                        {/* Mentor Interest* Dropdown */}
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="mentorship-interest"
                            className="text-ink font-semibold text-[14.5px]"
                          >
                            Mentor Interest <span className="text-gold-deep">*</span>
                          </label>
                          <select
                            id="mentorship-interest"
                            required
                            value={mentorInterest}
                            onChange={(e) => setMentorInterest(e.target.value)}
                            className="w-full bg-transparent border-b border-graphite/25 pb-2.5 pt-1 text-ink text-[15.5px] focus:outline-none focus:border-gold-deep transition-colors cursor-pointer"
                          >
                            {MENTOR_INTEREST_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Additional Message */}
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="mentorship-message"
                            className="text-ink font-semibold text-[14.5px]"
                          >
                            Additional message
                          </label>
                          <textarea
                            id="mentorship-message"
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Share any context or questions (optional)..."
                            className="w-full bg-transparent border-b border-graphite/25 pb-2.5 pt-1 text-ink text-[15.5px] focus:outline-none focus:border-gold-deep transition-colors resize-y"
                          />
                        </div>

                        {/* Preferred Response* Radio Buttons */}
                        <div className="flex flex-col gap-3">
                          <span className="text-ink font-semibold text-[14.5px]">
                            Preferred response <span className="text-gold-deep">*</span>
                          </span>
                          <div className="flex flex-wrap gap-6 sm:gap-8">
                            {RESPONSE_METHODS.map((method) => (
                              <label
                                key={method}
                                className="flex items-center gap-2.5 cursor-pointer group"
                              >
                                <input
                                  type="radio"
                                  name="preferredResponse"
                                  value={method}
                                  required
                                  checked={preferredResponse === method}
                                  onChange={() => setPreferredResponse(method)}
                                  className="w-4 h-4 text-gold-deep accent-gold-deep border-graphite/30 focus:ring-gold-deep"
                                />
                                <span className="text-[15px] text-graphite group-hover:text-ink transition-colors">
                                  {method}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Submit & Cancel Actions */}
                        <div className="pt-3 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="inline-flex items-center justify-center rounded-[3px] border border-graphite/20 px-6 h-12 font-sans text-sm font-medium text-graphite hover:text-ink hover:border-ink/40 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center justify-center rounded-[3px] bg-gold px-8 h-12 font-sans text-sm font-semibold text-ink hover:bg-gold-deep transition-colors disabled:opacity-60 cursor-pointer"
                          >
                            {submitting ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

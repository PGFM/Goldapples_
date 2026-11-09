"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  contactContent,
  supportOptions,
  responseMethods,
} from "@/content/contact";

const formFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Your full name",
    type: "text",
    required: true,
  },
  {
    name: "organisation",
    label: "Organisation",
    placeholder: "Your organisation or institution",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "Your email address",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone number (optional)",
    placeholder: "Phone number",
    type: "tel",
    required: false,
  },
  {
    name: "interest",
    label: "Area of interest",
    type: "select",
    options: supportOptions,
    required: true,
  },
  {
    name: "challenge",
    label: "What is the communication challenge?",
    placeholder: "Describe what is happening...",
    type: "textarea",
    required: true,
  },
  {
    name: "outcome",
    label: "What would a better outcome look like?",
    placeholder: "Describe what you need to achieve...",
    type: "textarea",
    required: true,
  },
  {
    name: "method",
    label: "Preferred response",
    type: "radio",
    options: responseMethods,
    required: true,
  },
];

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const rawPhone = String(data.get("phone") ?? "").trim();
    const phoneCode = String(data.get("phoneCode") ?? "+234").trim();

    const payload = {
      type: "contact" as const,
      name: String(data.get("name") ?? "").trim(),
      organisation: String(data.get("organisation") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: rawPhone ? `${phoneCode} ${rawPhone}` : "",
      interest: String(data.get("interest") ?? "").trim(),
      challenge: String(data.get("challenge") ?? "").trim(),
      outcome: String(data.get("outcome") ?? "").trim(),
      method: String(data.get("method") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(
          result.error ?? "We couldn't send your brief. Please try again.",
        );
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setErrorMessage(
        "Unable to connect right now. Please try again or email us directly at " +
          contactContent.email +
          ".",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-12 px-4 sm:px-8 text-center flex flex-col items-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-champagne text-gold-deep">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-3xl text-ink">Brief Received</h3>
        <p className="mt-4 text-graphite text-[16.5px] leading-relaxed max-w-[46ch]">
          Thank you for getting in touch. We have received your communication
          brief and will respond through your preferred channel shortly.
        </p>
        <div className="mt-8">
          <Button
            type="button"
            variant="gold"
            onClick={() => {
              setSubmitted(false);
              setErrorMessage(null);
            }}
            className="px-8 h-12 text-sm"
          >
            Send Another Brief
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {errorMessage && (
        <div
          role="alert"
          className="rounded-sm border border-red-600/20 bg-red-50 px-5 py-4 text-[15px] text-red-700"
        >
          {errorMessage}
        </div>
      )}

      {formFields.map((field) => {
        if (field.type === "textarea") {
          return (
            <div key={field.name} className="flex flex-col gap-3">
              <label
                htmlFor={field.name}
                className="text-ink font-semibold text-[15px]"
              >
                {field.label}{" "}
                {field.required && <span className="text-gold-deep">*</span>}
              </label>
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                rows={3}
                className="w-full bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors resize-y"
                placeholder={field.placeholder}
              />
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.name} className="flex flex-col gap-3">
              <label
                htmlFor={field.name}
                className="text-ink font-semibold text-[15px]"
              >
                {field.label}{" "}
                {field.required && <span className="text-gold-deep">*</span>}
              </label>
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue=""
                className="w-full bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors cursor-pointer"
              >
                <option value="" disabled>
                  Select an area of interest
                </option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "radio") {
          return (
            <div key={field.name} className="flex flex-col gap-4">
              <span className="text-ink font-semibold text-[15px]">
                {field.label}{" "}
                {field.required && <span className="text-gold-deep">*</span>}
              </span>
              <div className="flex flex-wrap gap-8">
                {field.options?.map((opt, idx) => (
                  <label
                    key={opt}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name={field.name}
                      value={opt}
                      defaultChecked={idx === 0}
                      required={field.required}
                      className="w-4 h-4 text-gold-deep accent-gold-deep border-graphite/20 focus:ring-gold-deep"
                    />
                    <span className="text-[16px] text-graphite group-hover:text-ink transition-colors">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        }

        if (field.type === "tel") {
          return (
            <div key={field.name} className="flex flex-col gap-3">
              <label
                htmlFor={field.name}
                className="text-ink font-semibold text-[15px]"
              >
                {field.label}{" "}
                {field.required && <span className="text-gold-deep">*</span>}
              </label>
              <div className="flex gap-4">
                <select
                  name={`${field.name}Code`}
                  aria-label="Country code"
                  className="w-[110px] shrink-0 bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors cursor-pointer"
                  defaultValue="+234"
                >
                  <option value="+234">NG (+234)</option>
                  <option value="+1">US (+1)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+27">ZA (+27)</option>
                  <option value="+254">KE (+254)</option>
                  <option value="+233">GH (+233)</option>
                </select>
                <input
                  type="tel"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className="flex-1 min-w-0 bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors"
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          );
        }

        return (
          <div key={field.name} className="flex flex-col gap-3">
            <label
              htmlFor={field.name}
              className="text-ink font-semibold text-[15px]"
            >
              {field.label}{" "}
              {field.required && <span className="text-gold-deep">*</span>}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              className="w-full bg-transparent border-b border-graphite/20 pb-3 pt-1 text-ink text-[16px] focus:outline-none focus:border-gold-deep transition-colors"
              placeholder={field.placeholder}
            />
          </div>
        );
      })}

      <div className="pt-6">
        <Button
          type="submit"
          variant="gold"
          disabled={submitting}
          className="w-full sm:w-auto px-10 h-14 text-base disabled:opacity-60"
        >
          {submitting ? "Sending..." : contactContent.cta}
        </Button>
      </div>
    </form>
  );
}

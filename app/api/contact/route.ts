import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supportOptions, responseMethods } from "@/content/contact";
import { footerContent } from "@/content/site";

type ContactPayload = {
  type?: "contact" | "mentorship";
  name: string;
  organisation?: string;
  email: string;
  phone: string;
  supportType?: string;
  mentorInterest?: string;
  challenge?: string;
  message?: string;
  responseMethod: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return "Name is required.";
  if (!body.email?.trim() || !EMAIL_RE.test(body.email))
    return "A valid email is required.";
  if (!body.phone?.trim()) return "Phone number is required.";

  if (body.type === "mentorship") {
    if (!body.mentorInterest?.trim()) return "Please select a mentor interest.";
    if (!body.responseMethod?.trim())
      return "Please select a preferred response method.";
    return null;
  }

  if (!body.organisation?.trim()) return "Organisation is required.";
  if (!body.supportType || !supportOptions.includes(body.supportType)) {
    return "Please select what you need support with.";
  }
  if (!body.challenge?.trim()) return "Please describe your challenge.";
  if (!body.responseMethod || !responseMethods.includes(body.responseMethod)) {
    return "Please select a preferred response method.";
  }
  return null;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "The contact form is not yet configured. Please email us directly." },
      { status: 503 },
    );
  }

  const {
    type,
    name,
    organisation,
    email,
    phone,
    supportType,
    mentorInterest,
    challenge,
    message,
    responseMethod,
  } = body as ContactPayload;

  const resend = new Resend(apiKey);
  const isMentorship = type === "mentorship";

  try {
    const { error } = await resend.emails.send({
      from: "Goldapples Website <onboarding@resend.dev>",
      to: footerContent.email,
      replyTo: email,
      subject: isMentorship
        ? `New Mentorship Enquiry: ${mentorInterest} — ${name}`
        : `New brief from ${name} (${organisation})`,
      html: isMentorship
        ? `
        <h2>New Mentorship / Executive Advisory Enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Mentor Interest:</strong> ${escapeHtml(mentorInterest || "")}</p>
        <p><strong>Preferred response method:</strong> ${escapeHtml(responseMethod)}</p>
        ${
          message
            ? `<p><strong>Additional message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`
            : ""
        }
      `
        : `
        <h2>New communication brief</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Organisation:</strong> ${escapeHtml(organisation || "")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Support needed:</strong> ${escapeHtml(supportType || "")}</p>
        <p><strong>Preferred response method:</strong> ${escapeHtml(responseMethod)}</p>
        <p><strong>Challenge:</strong></p>
        <p>${escapeHtml(challenge || "").replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your brief. Please try again or email us directly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your brief. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

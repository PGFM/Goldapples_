import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supportOptions, responseMethods } from "@/content/contact";
import { footerContent } from "@/content/site";

type ContactPayload = {
  type?: "contact" | "mentorship";
  name: string;
  organisation?: string;
  email: string;
  phone?: string;
  supportType?: string;
  interest?: string;
  mentorInterest?: string;
  challenge?: string;
  outcome?: string;
  message?: string;
  responseMethod?: string;
  method?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return "Name is required.";
  if (!body.email?.trim() || !EMAIL_RE.test(body.email.trim())) {
    return "A valid email address is required.";
  }

  const preferredMethod = (body.responseMethod || body.method || "").trim();

  if (body.type === "mentorship") {
    if (!body.phone?.trim()) return "Phone number is required.";
    if (!body.mentorInterest?.trim()) return "Please select a mentor interest.";
    if (!preferredMethod) {
      return "Please select a preferred response method.";
    }
    return null;
  }

  if (!body.organisation?.trim()) return "Organisation is required.";
  const selectedInterest = (body.interest || body.supportType || "").trim();
  if (!selectedInterest || !supportOptions.includes(selectedInterest)) {
    return "Please select an area of interest.";
  }
  if (!body.challenge?.trim()) {
    return "Please describe the communication challenge.";
  }
  if (!body.outcome?.trim()) {
    return "Please describe what a better outcome would look like.";
  }
  if (!preferredMethod || !responseMethods.includes(preferredMethod)) {
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

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      {
        error:
          "Email service is not yet configured (missing RESEND_API_KEY). Please email us directly at " +
          footerContent.email +
          ".",
      },
      { status: 503 },
    );
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const phone = body.phone?.trim() || "Not provided";
  const organisation = body.organisation?.trim() || "";
  const selectedInterest = (body.interest || body.supportType || "").trim();
  const mentorInterest = body.mentorInterest?.trim() || "";
  const challenge = body.challenge?.trim() || "";
  const outcome = body.outcome?.trim() || "";
  const message = body.message?.trim() || "";
  const preferredMethod = (body.responseMethod || body.method || "").trim();

  const isMentorship = body.type === "mentorship";
  const resend = new Resend(apiKey);

  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Goldapples Website <onboarding@resend.dev>";
  const toEmail =
    process.env.CONTACT_RECEIVER_EMAIL?.trim() || footerContent.email;

  const subject = isMentorship
    ? `New Mentorship Enquiry: ${mentorInterest} — ${name}`
    : `New Communication Brief from ${name} (${organisation})`;

  const html = isMentorship
    ? `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e0d5; border-radius: 6px; overflow: hidden;">
        <div style="background-color: #121212; padding: 24px 32px; border-bottom: 3px solid #c8a24a;">
          <p style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #c8a24a; margin: 0 0 6px 0;">
            Mentorship &amp; Executive Advisory
          </p>
          <h1 style="font-size: 22px; color: #ffffff; margin: 0; font-weight: normal;">
            New Enquiry: ${escapeHtml(mentorInterest)}
          </h1>
        </div>
        <div style="padding: 28px 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 180px; color: #555;">Name</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Email Address</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(email)}" style="color: #9e7a2b;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Phone Number</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Mentor Interest</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${escapeHtml(mentorInterest)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Preferred Response</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(preferredMethod)}</td>
            </tr>
          </table>
          ${
            message
              ? `
              <div style="margin-top: 20px; background-color: #faf7f0; padding: 16px 20px; border-left: 3px solid #c8a24a; border-radius: 3px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #666;">
                  Additional Message
                </p>
                <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message).replace(/\n/g, "<br />")}</p>
              </div>
              `
              : ""
          }
        </div>
      </div>
    `
    : `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e0d5; border-radius: 6px; overflow: hidden;">
        <div style="background-color: #121212; padding: 24px 32px; border-bottom: 3px solid #c8a24a;">
          <p style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #c8a24a; margin: 0 0 6px 0;">
            Goldapples Media Associates
          </p>
          <h1 style="font-size: 22px; color: #ffffff; margin: 0; font-weight: normal;">
            New Communication Brief
          </h1>
        </div>
        <div style="padding: 28px 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 180px; color: #555;">Name</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Organisation</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(organisation)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Email Address</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(email)}" style="color: #9e7a2b;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Phone Number</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Area of Interest</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${escapeHtml(selectedInterest)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Preferred Response</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(preferredMethod)}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; background-color: #faf7f0; padding: 16px 20px; border-left: 3px solid #c8a24a; border-radius: 3px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #666;">
              What is the communication challenge?
            </p>
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(challenge).replace(/\n/g, "<br />")}</p>
          </div>

          <div style="margin-top: 16px; background-color: #faf7f0; padding: 16px 20px; border-left: 3px solid #c8a24a; border-radius: 3px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #666;">
              What would a better outcome look like?
            </p>
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(outcome).replace(/\n/g, "<br />")}</p>
          </div>
        </div>
      </div>
    `;

  const text = isMentorship
    ? [
        `New Mentorship / Executive Advisory Enquiry`,
        `--------------------------------------------`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Mentor Interest: ${mentorInterest}`,
        `Preferred Response: ${preferredMethod}`,
        message ? `\nAdditional Message:\n${message}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : [
        `New Communication Brief`,
        `-----------------------`,
        `Name: ${name}`,
        `Organisation: ${organisation}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Area of Interest: ${selectedInterest}`,
        `Preferred Response: ${preferredMethod}`,
        `\nWhat is the communication challenge?\n${challenge}`,
        `\nWhat would a better outcome look like?\n${outcome}`,
      ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          error:
            "We couldn't send your submission right now. Please try again or email us directly at " +
            footerContent.email +
            ".",
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't send your submission right now. Please try again or email us directly at " +
          footerContent.email +
          ".",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

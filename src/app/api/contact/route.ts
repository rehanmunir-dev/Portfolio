import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const contactEmail = "rehanmunir034455@gmail.com"; // sender/SMTP identity

function sanitize(value: unknown) {
  return String(value || "").trim();
}

export async function POST(request: Request) {
  const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER || contactEmail;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL || "rehanmunir034455@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || `"Portfolio Inquiry" <${smtpUser}>`;

  if (!smtpPass) {
    return NextResponse.json(
      {
        message:
          "Inquiry email is not configured yet. Please email rehanmunir034455@gmail.com directly.",
      },
      { status: 500 },
    );
  }

  try {
    const payload = await request.json();
    const name = sanitize(payload.name);
    const email = sanitize(payload.email);
    const projectType = sanitize(payload.projectType);
    const message = sanitize(payload.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please fill your name, email, and project details." },
        { status: 400 },
      );
    }

    const subject = `Portfolio Inquiry from ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      projectType ? `Project type: ${projectType}` : "",
      "",
      "Project details:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ message: "Inquiry submitted successfully." });
  } catch (error) {
    console.error("Contact form email failed", {
      code: error instanceof Error && "code" in error ? error.code : undefined,
      command: error instanceof Error && "command" in error ? error.command : undefined,
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json(
      { message: "Inquiry could not be sent right now. Please email rehanmunir034455@gmail.com directly." },
      { status: 500 },
    );
  }
}

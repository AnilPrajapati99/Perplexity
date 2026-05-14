import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

console.log(process.env.BREVO_USER);

export async function sendEmail({ to, subject, html, text }) {
  console.log(to);
  const details = await transporter.sendMail({
    from: `"PromptIQ" <${process.env.BREVO_SENDER}>`,
    to,
    subject,
    html,
    text,
  });
  console.log("Email sent:", details.messageId);
}

import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
});

console.log({
  user: process.env.GOOGLE_USER,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ? "✓ set" : "✗ missing",
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN ? "✓ set" : "✗ missing",
});

transporter
  .verify()
  .then(() => {
    console.log("Email tranporter is ready to send email");
  })
  .catch((err) => {
    console.error("Email transporter verification failed", err.message);
  });

export async function sendEmail({ to, subject, html, text }) {
  const mailOption = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };
  const details = await transporter.sendMail(mailOption);
  console.log("Email details", details);
}

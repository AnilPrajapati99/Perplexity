export async function sendEmail({ to, subject, html, text }) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "PromptIQ", email: process.env.BREVO_SENDER },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Email error:", data);
    throw new Error(data.message || "Email sending failed");
  }

  console.log("Email sent:", data.messageId);
}

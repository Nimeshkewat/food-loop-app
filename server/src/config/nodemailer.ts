import nodemailer from "nodemailer";
import MailMessage from "nodemailer/lib/mailer/mail-message.js";

// Define the shape of Brevo's API recipient object
interface BrevoRecipient {
  email: string;
  name: string;
}

// Custom HTTP transporter to bypass Render's SMTP block with strict TypeScript typing
const brevoHttpTransport = {
  name: "brevo-http",
  version: "1.0.0",
  send: async (
    mail: MailMessage,
    callback: (
      err: Error | null,
      info?: { messageId: string; envelope: unknown },
    ) => void,
  ): Promise<void> => {
    try {
      // Parse the mail envelope information safely
      const addresses = mail.message.getAddresses();
      const toEmails: BrevoRecipient[] = Array.isArray(addresses.to)
        ? addresses.to.map((addr: any) => ({
            email: addr.address,
            name: addr.name || "",
          }))
        : [];

      // Extract raw text or HTML content safely
      const mailData = mail.data as nodemailer.SendMailOptions;
      const htmlContent = mailData.html || mailData.text || "";

      // Handle sender details safely
      const fromAddress =
        typeof mailData.from === "object" &&
        mailData.from !== null &&
        "address" in mailData.from
          ? (mailData.from as { address: string; name?: string })
          : null;

      const headers: Record<string, string> = {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.SMTP_PASS || "",
      };

      const response = await fetch("https://brevo.com", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          sender: {
            email: fromAddress?.address || "your-verified-email@domain.com",
            name: fromAddress?.name || "Your App",
          },
          to: toEmails,
          subject: mailData.subject,
          htmlContent: htmlContent,
        }),
      });

      const data = (await response.json()) as {
        messageId?: string;
        message?: string;
        code?: string;
      };

      if (!response.ok) {
        return callback(new Error(`Brevo API Error: ${JSON.stringify(data)}`));
      }

      // Success payload structure for Nodemailer
      callback(null, {
        messageId: data.messageId || "brevo-api-success",
        envelope: mail.data,
      });
    } catch (error) {
      callback(error instanceof Error ? error : new Error(String(error)));
    }
  },
};

// Create a Nodemailer instance using the HTTP wrapper instead of SMTP
// Cast to 'any' to cleanly bypass Nodemailer's strict internal class validation
const transporter = nodemailer.createTransport(brevoHttpTransport as any);

export default transporter;

import transporter from "../config/nodemailer.js";
import { passwordResetSuccessEmail } from "../email-templates/passwordResetSuccessEmail .js";
import { resetPasswordEmail } from "../email-templates/resetPasswordEmail.js";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Veriy your email",
    text: `your 6-digit verification code: ${verificationToken}`,
    html: `<p>your 6-digit verification code: ${verificationToken}</p>`,
  });
};

export const sendVerificationSuccessEmail = async (email: string) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Email verification successfully",
    html: "<b>Your email is verified</b>",
  });
};

export const sendPasswordResetLinkEmail = async (
  email: string,
  resetLink: string,
) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Reset your password",
    html: resetPasswordEmail(resetLink),
  });
};

export const sendPasswordResetSuccessEmail = async (
  email: string,
  fullname: string,
) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Password reset successfully",
    html: passwordResetSuccessEmail(fullname),
  });
};

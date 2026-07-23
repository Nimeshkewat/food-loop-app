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
    text: `your 6-digiti verification code: ${verificationToken}`,
    html: "<h1>Html body</h1>",
  });
};

export const sendVerificationSuccessEmail = async (email: string) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Your email is verified",
    html: "<b>Html body</b>",
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

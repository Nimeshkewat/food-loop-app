export const passwordResetSuccessEmail = (name: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #111;">Hi ${name},</h2>
      <p style="color: #555; font-size: 14px;">
        Your password has been changed successfully.
      </p>
      <p style="color: #555; font-size: 14px;">
        If you did not make this change, please contact our support team immediately
        or reset your password again right away.
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 24px;">
        This is an automated message, please do not reply to this email.
      </p>
    </div>
  `;
};

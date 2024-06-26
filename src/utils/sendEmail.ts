import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const sendVerifyEmail = async (email: string, token: string) => {
  try {
    const smtpOptions: SMTPTransport.Options = {
      host: process.env.EMAIL_HOST,
      secure: false,
      port: 587,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(smtpOptions);

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Verify your email',
      html: `<a href="http://localhost:8080/api/verify/${token}">Click here to verify your email</a>`,
    });

    console.log('Email envoyé avec succès à', email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  try {
    const smtpOptions: SMTPTransport.Options = {
      host: process.env.EMAIL_HOST,
      secure: false,
      port: 587,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(smtpOptions);

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Reset your password',
      html: `
      <p>Hi,</p>
      <p>To reset your password, please click the following link:</p>
      <a href="http://localhost:5173/reset-password?reset_password_token=${token}">Reset Password</a>
      <p>If you did not request this password reset, please ignore this email.</p>
      `,
    });

    console.log('Email envoyé avec succès à', email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
};

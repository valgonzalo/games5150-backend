import nodemailer from 'nodemailer';
import { ENVIRONMENT } from './environment.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ENVIRONMENT.GMAIL_USER,
    pass: ENVIRONMENT.GMAIL_APP_PASSWORD
  }
});

export const sendVerificationEmail = async (to, token) => {
  const verificationLink = `${ENVIRONMENT.URL_FRONTEND}/verify-email?verification_token=${token}`;
  
  const mailOptions = {
    from: ENVIRONMENT.GMAIL_USER,
    to,
    subject: 'Verifica tu cuenta en Games5150',
    html: `
      <h1>¡Bienvenido a Games5150!</h1>
      <p>Por favor, haz clic en el siguiente enlace para verificar tu cuenta y poder iniciar sesión:</p>
      <a href="${verificationLink}">Verificar Cuenta</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    // In dev environment we might just want to log and ignore if creds are missing
  }
};

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
const NODEMAILER_PORT = process.env.NODEMAILER_PORT;
const NODEMAILER_AUTH_EMAIL = process.env.NODEMAILER_AUTH_EMAIL;
const NODEMAILER_AUTH_PASS = process.env.NODEMAILER_AUTH_PASS;
const CLIENT_URL = process.env.CLIENT_URL;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  // host: NODEMAILER_HOST,
  // port: Number(NODEMAILER_PORT),
  // secure: true,
  auth: {
    user: NODEMAILER_AUTH_EMAIL,
    pass: NODEMAILER_AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    throw new Error(`Error creating nodemailer transporter: ${error}`);
  } else {
    console.log(`Transporter created: ${success}, Ready for messages`);
  }
});

export const sendVerificationEmail = async ({
  id,
  userId,
  email,
}: {
  id: string;
  userId: string;
  email: string;
}) => {
  const mailOptions = {
    from: NODEMAILER_AUTH_EMAIL,
    to: email,
    subject: 'Verify your Email',
    html: `<p>Please verify your email address to complete the registration process and sign in to your account.</p><p>This verification link <b>expires in 6 hours</b>.</p><p>Click <a href=${CLIENT_URL}/verify/${userId}/${id}>here</a> to proceed.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}) => {
  const mailOptions = {
    from: NODEMAILER_AUTH_EMAIL,
    to: email,
    subject: 'Reset your Password',
    html: `<p>You requested to reset your password at Kota Mobil</p><p>If you did not make this request, please ignore this email.</p><p>Click <a href=${CLIENT_URL}/reset-password/${id}>here</a> to reset your password.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

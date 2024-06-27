import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import mustache from 'mustache';
import fs from 'fs';
dotenv.config();

const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
const NODEMAILER_PORT = process.env.NODEMAILER_PORT;
const NODEMAILER_AUTH_EMAIL = process.env.NODEMAILER_AUTH_EMAIL;
const NODEMAILER_AUTH_PASS = process.env.NODEMAILER_AUTH_PASS;
const CLIENT_URL = process.env.CLIENT_URL;

export const sendVerificationEmail = async ({
  id,
  userId,
  email,
  firstName,
}: {
  id: string;
  userId: string;
  email: string;
  firstName: string;
}) => {
  let transporter = nodemailer.createTransport({
    host: NODEMAILER_HOST,
    port: Number(NODEMAILER_PORT),
    secure: true,
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

  const template = fs.readFileSync('./src/lib/templates/verify.html', 'utf8');
  const imageAttachment = fs.readFileSync('./src/assets/kotamobil-light.png');

  const mailOptions = {
    from: NODEMAILER_AUTH_EMAIL,
    to: email,
    subject: 'Verify your Email',
    html: mustache.render(template, {
      firstName: firstName,
      url: CLIENT_URL,
      id: id,
      userId: userId,
    }),
    attachments: [
      {
        filename: 'kotamobil-light.png',
        content: imageAttachment,
        encoding: 'base64',
        cid: 'logo',
      },
    ],
  };
  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async ({
  id,
  email,
  firstName,
}: {
  id: string;
  email: string;
  firstName: string;
}) => {
  let transporter = nodemailer.createTransport({
    host: NODEMAILER_HOST,
    port: Number(NODEMAILER_PORT),
    secure: true,
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

  const template = fs.readFileSync('./src/lib/templates/reset.html', 'utf8');
  const imageAttachment = fs.readFileSync('./src/assets/kotamobil-light.png');

  const mailOptions = {
    from: NODEMAILER_AUTH_EMAIL,
    to: email,
    subject: 'Reset your Password',
    html: mustache.render(template, {
      firstName: firstName,
      url: CLIENT_URL,
      id: id,
    }),
    attachments: [
      {
        filename: 'kotamobil-light.png',
        content: imageAttachment,
        encoding: 'base64',
        cid: 'logo',
      },
    ],
  };
  await transporter.sendMail(mailOptions);
};

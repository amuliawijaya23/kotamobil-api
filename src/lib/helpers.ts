import crypto from 'crypto';

export const randomChar = (len: number) =>
  crypto.randomBytes(len).toString('base64');

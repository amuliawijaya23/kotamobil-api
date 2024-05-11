import _mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL || MONGODB_URL.length === 0) {
  throw new Error('Please add your MongoDB URL to .env file');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached DB connection ');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    cached.promise = connect(MONGODB_URL!, opts)
      .then((mongoose) => {
        console.log('New DB connection established');
        return mongoose;
      })
      .catch((error) => {
        throw new Error('Connection to DB failed');
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}

export default dbConnect;

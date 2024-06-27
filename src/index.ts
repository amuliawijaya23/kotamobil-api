import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import router from './routers';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import dbConnect from './db';
import initializePassport from '~/auth/passport-config';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;
const SESSION_SECRET = process.env.SESSION_SECRET || 'SECRET';
const COOKIE_NAME = process.env.COOKIE_NAME || 'SESSION';
const MONGODB_URL = process.env.MONGODB_URL;
const env = process.env.NODE_ENV || 'development';
const isLocal = env === 'development';

async function startServer() {
  try {
    const api = express();

    api.use(cors({ credentials: true }));
    api.use(morgan('dev'));

    api.use(compression());
    api.use(bodyParser.urlencoded({ extended: true }));
    api.use(bodyParser.json());
    api.use(cookieParser());
    api.use(flash());
    api.use(
      session({
        name: COOKIE_NAME,
        secret: SESSION_SECRET,
        cookie: {
          secure: isLocal ? false : true,
          httpOnly: false,
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: MONGODB_URL,
          collectionName: 'sessions',
          ttl: 24 * 60 * 60,
        }),
      }),
    );
    api.use(passport.initialize());
    api.use(passport.session());

    // passport configuration
    initializePassport();

    api.use(router());
    api.use(express.static('public'));

    await dbConnect();

    const server = http.createServer(api);

    server.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    throw new Error(`Server Error: ${error}`);
  }
}

startServer();

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

import dbConnect from './db';
import initializePassport from '@auth/passport-config';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;
const SESSION_SECRET = process.env.SESSION_SECRET || 'SECRET';

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
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      }),
    );
    api.use(passport.initialize());
    api.use(passport.session());

    // passport configuration
    initializePassport();

    api.use(router());

    const server = http.createServer(api);

    server.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });

    await dbConnect();
  } catch (error) {
    throw new Error(`Server Error: ${error}`);
  }
}

startServer();

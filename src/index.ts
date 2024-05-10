import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  try {
    const PORT = process.env.PORT;

    const api = express();

    api.use(cors({ credentials: true }));
    api.use(morgan('dev'));

    api.use(compression());
    api.use(bodyParser.urlencoded({ extended: true }));
    api.use(bodyParser.json());
    api.use(cookieParser());

    const server = http.createServer(api);

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/`);
    });
  } catch (error) {
    throw new Error(`Server Error: ${error}`);
  }
}

startServer();

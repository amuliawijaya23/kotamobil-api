import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  try {
    const PORT = process.env.PORT;

    const api = express();

    api.use(bodyParser.urlencoded({ extended: true }));
    api.use(bodyParser.json());
    api.use(cors());
    api.use(morgan('dev'));

    const server = http.createServer(api);

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/`);
    });
  } catch (error) {
    throw new Error(`Server Error: ${error}`);
  }
}

startServer();

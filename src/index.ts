import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const App = express();

App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());
App.use(cors());
App.use(morgan('dev'));

App.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

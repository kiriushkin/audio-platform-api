import 'dotenv/config';
import './sequelize.js';
import fs from 'fs';
import cors from 'cors';
import http from 'http';
import https from 'https';
import express from 'express';
import routes from './routes.js';

const { NODE_ENV, SSL_PATH, CLIENT_URL, PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (NODE_ENV === 'production') app.use(cors({ origin: CLIENT_URL }));

if (NODE_ENV === 'development') app.use(cors({ origin: '*' }));

app.use('/api', routes);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  {
    key: fs.readFileSync(`${SSL_PATH}privkey.pem`),
    cert: fs.readFileSync(`${SSL_PATH}fullchain.pem`),
  },
  app
);

if (NODE_ENV === 'production') httpsServer.listen(PORT);

httpServer.listen(PORT);

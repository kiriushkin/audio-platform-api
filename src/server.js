import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes.js';

const { NODE_ENV, CLIENT_URL, PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (NODE_ENV === 'production') app.use(cors({ origin: CLIENT_URL }));

if (NODE_ENV === 'development') app.use(cors({ origin: '*' }));

app.use('/api', routes);

app.listen(PORT);

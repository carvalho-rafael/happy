import express from 'express';
import 'express-async-errors'
import errorHandler from './errors/handler'

import path from 'path';
import 'dotenv/config';
import './database/connection';
import "reflect-metadata";

import cors from 'cors';
import routes from './routes'

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorHandler);

app.listen(process.env.PORT || 3333);
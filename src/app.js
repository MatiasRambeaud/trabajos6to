import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import mocksRouter from './routes/mocks.router.js';
import errorHandler from './middlewares/errorHandler.js';

import __dirname from './utils.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import config from './config/config.js';

const app = express();
const PORT = config.app.PORT;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const connection = mongoose.connect(config.mongo.URL)

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);
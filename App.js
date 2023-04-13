import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRouter from './Routes/users.js';
import problemsRouter from './Routes/problems.js';

export const app = express();

/* MIDDLEWARES */
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('common'));

/* ROUTES */
app.use('/api/v1/users', userRouter);
app.use('/api/v1/problems', problemsRouter);

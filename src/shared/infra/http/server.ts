import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import '@shared/infra/typeorm';
import cors from 'cors';
import { appRouter } from './routes';

dotenv.config();
const app = express();
const _PORT = 3333;

app.use(cors());
app.use(express.json());
app.use(appRouter);
app.listen(process.env.PORT || _PORT, () =>
  console.log(`Server running on PORT:${_PORT}`)
);

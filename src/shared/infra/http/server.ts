import 'reflect-metadata';
import express from 'express';
import '@shared/infra/typeorm';
import cors from 'cors';
import { appRouter } from './routes';

const app = express();
const _PORT = 3333;

app.use(cors());
app.use(express.json());
app.use(appRouter);
app.listen(_PORT, () => console.log(`Server running on PORT:${_PORT}`));

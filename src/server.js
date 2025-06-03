import express from 'express';
import cors from 'cors';
import { envs } from './config/envs.config.js';

const app = express();
import apiRouter from './routers/index.router.js';

//Middlewares de CORS
app.use(cors());
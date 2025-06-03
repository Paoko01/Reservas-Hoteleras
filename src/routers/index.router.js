import { Router } from 'express';
import reservasRouter from './reservas.routes.js';

const router = Router();

router.use('/reservas', reservasRouter);

export default router;
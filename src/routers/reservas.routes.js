import { Router } from 'express';
import { getAllReservas, getReservaById} from '../controllers/Reservas.controller.js';

const router = Router();

router.get('/', getAllReservas);
router.get('/:id', getReservaById);

export default router;


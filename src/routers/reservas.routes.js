import { Router } from 'express';
import { getAllReservas, getReservaById, createReserva, updateReserva, deleteReserva, getReservaByHotel, getReservaByDate, getReservaByRoom, getReservaByState, getReservaByGuest} from '../controllers/Reservas.controller.js';

const router = Router();

router.get('/', getAllReservas);
router.get('/:id', getReservaById);

export default router;


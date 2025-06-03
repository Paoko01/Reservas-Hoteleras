import { getAllReservas, getReservaById, createReserva, updateReserva, deleteReserva} from '../services/Reservas.service.js';
import { response } from '../Utils/templates/response.template.js';



export const getAllReservas = async(req, res, next) => {
    try {
        const reservas = await getAllReservasService();
        response(res, reservas, 200, 'Reservas encontradas con éxito');
    } catch (error) {
        next(error);
    }
};



export const createReserva = async(req, res, next) => {
    try {
        const reservas = await createReserva();
        response(res, reservas, 201, 'Reserva creada con éxito');
    } catch (error) {
        next(error);
    }
};


export const getReservaById;

export const updateReserva;

export const deleteReserva;

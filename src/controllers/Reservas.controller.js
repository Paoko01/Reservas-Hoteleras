import { getAllReservasService, getReservaByIdService, createReservaService, updateReservaService, deleteReservaService} from '../services/Reservas.service.js';
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
        const reservas = await createReservaService();
        response(res, reservas, 201, 'Reserva creada con éxito');
    } catch (error) {
        next(error);
    }
};


export const getReservaById = async(req, res, next) => {
    try {
        const reservas = await getReservaByIdService();
        response(res, reservas, 202, 'Reserva creada con éxito');
    } catch (error) {
        next(error);
    }
};


export const updateReserva = async(req, res, next) => {
    try {
        const reservas = await updateReservaService();
        response(res, reservas, 203, 'Reserva creada con éxito');
    } catch (error) {
        next(error);
    }
};


export const deleteReserva = async(req, res, next) => {
    try {
        const reservas = await deleteReservaService();
        response(res, reservas, 204, 'Reserva creada con éxito');
    } catch (error) {
        next(error);
    }
};
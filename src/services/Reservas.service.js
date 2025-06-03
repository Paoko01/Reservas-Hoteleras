import { v4 as uuidv4 } from 'uuid';

let reservas = []

export const getAllReservas = (filters) => {
    let filteredReservas = [...reservas]; // Copia para trabajar sobre ella

    // Aquí aplicas la lógica de filtrado del controlador
    if (filters.hotel) {
        filteredReservas = filteredReservas.filter(r => r.hotel === filters.hotel);
    }
    if (filters.fecha_inicio) {
        const start = new Date(filters.fecha_inicio);
        filteredReservas = filteredReservas.filter(r => new Date(r.fechaInicio) >= start);
    }
    if (filters.fecha_fin) {
        const end = new Date(filters.fecha_fin);
        filteredReservas = filteredReservas.filter(r => new Date(r.fechaFin) <= end);
    }
    if (filters.tipo_habitacion) {
        filteredReservas = filteredReservas.filter(r => r.tipoHabitacion === filters.tipo_habitacion);
    }
    if (filters.estado) {
        filteredReservas = filteredReservas.filter(r => r.estado === filters.estado);
    }
    if (filters.num_huespedes) {
        const num = parseInt(filters.num_huespedes, 10);
        if (!isNaN(num)) {
            filteredReservas = filteredReservas.filter(r => r.numeroHuespedes === num);
        }
    }
    return filteredReservas;
};


export const createReserva = (reservaData) => {
    const newReserva = {
        id: uuidv4(),
        ...reservaData,
        fechaInicio: new Date(reservaData.fechaInicio),
        fechaFin: new Date(reservaData.fechaFin),
        estado: reservaData.estado || 'pendiente'
    };
    reservas.push(newReserva);
    return newReserva;
};

export const getReservaById = (id) => {
    return reservas.find(reserva => reserva.id === id);
};

export const updateReserva = (id, updateData) => {
    const index = reservas.findIndex(reserva => reserva.id === id);
    if (index === -1) return null;

    // Asegura que las fechas se conviertan a Date si se actualizan
    if (updateData.fechaInicio) updateData.fechaInicio = new Date(updateData.fechaInicio);
    if (updateData.fechaFin) updateData.fechaFin = new Date(updateData.fechaFin);

    reservas[index] = { ...reservas[index], ...updateData };
    return reservas[index];
};

export const deleteReserva = (id) => {
    const initialLength = reservas.length;
    reservas = reservas.filter(reserva => reserva.id !== id);
    return reservas.length < initialLength; // Retorna true si se eliminó algo
};
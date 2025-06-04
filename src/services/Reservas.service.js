import { v4 as uuidv4 } from 'uuid';
import reservaStructure from '../models/reservaSchema.json' with { type: 'json' };

// --- AÑADE ESTOS CONSOLE.LOGS JUSTO AQUÍ ---
console.log('--- Depuración del Schema ---');
console.log('Valor de reservaStructure al importar:', reservaStructure);
console.log('Valor de reservaStructure.properties al importar:', reservaStructure ? reservaStructure.properties : 'reservaStructure es nulo/undefined');
console.log('-----------------------------');
// -------------------------------------------

let reservas = [
    { 
    id: uuidv4(),
        hotel: "Hotel Prueba Importado",
        fechaInicio: "2025-07-20T14:00:00Z",
        fechaFin: "2025-07-25T12:00:00Z",
        tipoHabitacion: "Suite",
        estado: "Confirmada",
        numeroHuespedes: 3,
        nombreCliente: "Juan Ejemplo",
        emailCliente: "juan@ejemplo.com"
}];


export const getAllReservasService = (filters = {}) => { 
    let filteredReservas = [...reservas];

    if (filters.hotel) {
        filteredReservas = filteredReservas.filter(r => r && r.hotel === filters.hotel);
    }
    if (filters.fechaInicio) { 
        const start = new Date(filters.fechaInicio);
        filteredReservas = filteredReservas.filter(r => r && r.fechaInicio && new Date(r.fechaInicio) >= start);
    }
    if (filters.fechaFin) { 
        const end = new Date(filters.fechaFin);
        filteredReservas = filteredReservas.filter(r => r && r.fechaFin && new Date(r.fechaFin) <= end);
    }
    if (filters.tipoHabitacion) { 
        filteredReservas = filteredReservas.filter(r => r && r.tipoHabitacion === filters.tipoHabitacion);
    }
    if (filters.estado) {
        filteredReservas = filteredReservas.filter(r => r && r.estado === filters.estado);
    }
    if (filters.numeroHuespedes) { 
        const num = parseInt(filters.numeroHuespedes, 10);
        if (!isNaN(num)) {
            filteredReservas = filteredReservas.filter(r => r && r.numeroHuespedes === num);
        }
    }
    return filteredReservas;
};


export const createReservaService = (newReservaData) => {
    // Aseguramos que newReservaData sea un objeto para evitar errores
    newReservaData = newReservaData || {};

    if (!reservaStructure || !reservaStructure.properties) {
        console.error("Error crítico: reservaStructure o sus propiedades no están definidas.");
        throw new Error("No se pudo cargar la definición del esquema de reserva. Error interno.");
    }

    const newReserva = {
        id: uuidv4(), // Siempre generamos el ID primero
    };

    // Itera sobre las propiedades que ESPERAS de newReservaData (las del schema, excluyendo 'id')
    // Y asígnale el valor, o un valor por defecto si no existe en newReservaData.
    for (const key in reservaStructure.properties) {
        if (key === 'id') {
            continue; // Saltamos 'id' porque ya lo generamos
        }
        // Este es un patrón más seguro que el map anidado si tienes problemas de undefined
        newReserva[key] = newReservaData[key] !== undefined ? newReservaData[key] : null;

        // Si quieres valores por defecto más significativos:
        if (newReserva[key] === null) {
            switch (key) {
                case 'hotel': newReserva[key] = 'Sin Nombre de Hotel'; break;
                case 'fechaInicio': newReserva[key] = new Date().toISOString().split('T')[0]; break;
                case 'fechaFin': newReserva[key] = new Date().toISOString().split('T')[0]; break;
                case 'tipoHabitacion': newReserva[key] = 'Estándar'; break;
                case 'estado': newReserva[key] = 'Pendiente'; break;
                case 'numeroHuespedes': newReserva[key] = 1; break;
            }
        }
    }

    // Aquí puedes añadir validaciones obligatorias que te lanzarían un error si faltan:
    if (!newReserva.hotel || !newReserva.fechaInicio || !newReserva.fechaFin || !newReserva.numeroHuespedes) {
        throw new Error("Datos de reserva incompletos. Faltan hotel, fecha de inicio, fecha de fin o número de huéspedes.");
    }


    reservas.push(newReserva);
    return newReserva;
};


export const getReservaByIdService = (id) => {
    return reservas.find(reserva => reserva.id === id);
};

export const updateReservaService = (id, updateData) => {
    const index = reservas.findIndex(reserva => reserva.id === id);
    if (index === -1) return null;

    // Asegura que las fechas se conviertan a Date si se actualizan
    if (updateData.fechaInicio) updateData.fechaInicio = new Date(updateData.fechaInicio);
    if (updateData.fechaFin) updateData.fechaFin = new Date(updateData.fechaFin);

    reservas[index] = { ...reservas[index], ...updateData };
    return reservas[index];
};

export const deleteReservaService = (id) => {
    const initialLength = reservas.length;
    reservas = reservas.filter(reserva => reserva.id !== id);
    return reservas.length < initialLength; // Retorna true si se eliminó algo
};


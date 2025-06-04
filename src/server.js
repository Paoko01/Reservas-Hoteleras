import express from 'express';
import cors from 'cors';
import { envs } from './config/envs.config.js';

const app = express();
app.use(express.json());

import apiRouter from './routers/index.router.js';


//Middlewares de CORS
app.use(cors());

//Middlewares de rutas
app.use('/api/v1', apiRouter);

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend de Reservas Hoteleras! El servidor está funcionando.');
});

app.listen(envs.port, () => {
    console.log(`Servidor corriendo de pana en el puerto ${envs.port} 👻`) 
});
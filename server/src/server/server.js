import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import routes from '../routes/routes.js';

import { userEventListener } from '../events/user/eventListener.js';
import { channelEventListener } from '../events/channel/eventListener.js';

const PING_TIME_OUT = 10000;

const server = express();
server.use(cors());
server.use(routes);

const httpServer = createServer(server);

const io = new Server(httpServer, {
    // si queremos setear cual es el máximo de espera para considerar la desconexión
    pingTimeout: Number(PING_TIME_OUT),
    // para poder acceder desde la app hecha en react
    cors: {
        origin: [
            "http://localhost:8080",
            "http://localhost:3000"
        ],
    },
});

/*
    Escuchar eventos de conexión del cliente con el servidor y luego los
    eventos/mensajes que lleguen mediante el socket.
*/
io.on('connect', (socket) => {
    userEventListener(io, socket);
    channelEventListener(io, socket);
});

export default httpServer;
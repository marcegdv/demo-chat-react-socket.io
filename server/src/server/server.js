import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import routes from '../routes/routes.js';
import * as userEvents from '../events/user.js'
import * as channelEvents from '../events/channel.js';

import { USER_EVENT } from '../events/user.js';
import { CHANNEL_EVENT } from '../events/channel.js';

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
        origin: "http://localhost:8080",
    },
});

// Escuchar eventos de conexión y luego los eventos/mensajes que envíe el socket
io.on('connect', (socket) => {
    userEvents.connection(socket);

    socket.on(USER_EVENT.setName, (name) => userEvents.setName(io, socket, name));
    socket.on(USER_EVENT.createSingle, (name) => userEvents.createChat(io, socket, name));
    socket.on(USER_EVENT.message, (user, message) => userEvents.message(io, socket, user, message));
    socket.on(USER_EVENT.singleRename, (oldName, newName, userNameTarget) => userEvents.singleRename(io, socket, oldName, newName, userNameTarget));

    socket.on(CHANNEL_EVENT.list, () => channelEvents.list(io, socket));
    socket.on(CHANNEL_EVENT.join, (channelName) => channelEvents.join(io, socket, channelName));
    socket.on(CHANNEL_EVENT.history, (channel) => channelEvents.history(socket, channel));
    socket.on(CHANNEL_EVENT.message, (channelName, message) => channelEvents.message(io, channelName, message));
    socket.on(CHANNEL_EVENT.userRename, (channelName, oldName, newName) => channelEvents.userRename(io, channelName, oldName, newName));
    socket.on(CHANNEL_EVENT.leave, (channel) => channelEvents.leave(io, socket, channel));
    socket.on(CHANNEL_EVENT.create, (channel) => channelEvents.create(socket, channel));

    socket.on('disconnect', () => userEvents.disconnection(io, socket));
});

export default httpServer;
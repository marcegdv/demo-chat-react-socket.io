import * as events from './user.js'
import { USER_EVENT } from "./user.js";

export const userEventListener = (io, socket) => {
    events.connection(socket);
    socket.on(USER_EVENT.setName, (name) => events.setName(io, socket, name));
    socket.on(USER_EVENT.createSingle, (name) => events.createChat(io, socket, name));
    socket.on(USER_EVENT.message, (user, message) => events.message(io, socket, user, message));
    socket.on(USER_EVENT.singleRename, (oldName, newName, userNameTarget) => events.singleRename(io, socket, oldName, newName, userNameTarget));
    socket.on('disconnect', () => events.disconnection(io, socket));
};
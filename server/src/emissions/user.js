import { clog } from "../utils/logger.js";

export const USER_EMIT = {
    disconnect: 'user disconnect',
    nameSaved: 'name saved',
    invalidName: 'invalid user name',
    userId: 'user id',
    userNotFound: 'user not found',
    singleChat: 'single chat',
    openSingleChat: 'open single chat',
    message: 'message from single',
    nameChanged: 'name changed',
};

export const userDisconnect = (io, socket) => {
    io.sockets.emit(USER_EMIT.disconnect, socket.data.user.id, socket.data.user.name);
    clog(`Socket.id: ${socket.id} User id: "${socket.data.user.id}" User name: "${socket.data.user.name}" desconentado.`);
};

export const user = (socket, user) => {
    socket.emit(USER_EMIT.userId, user);
    clog(`${socket.id} User ID set "${user.id}"`);
};

export const saved = (io, socket, name) => {
    socket.emit(USER_EMIT.nameSaved, socket.data.user.name, name);
    clog(`${socket.id} User set name to "${socket.data.user.name}" (Prev: "${name}")`);
};
// export const saved = (io, socket, oldName) => {
//     if (!!oldName) {
//         clog(`User change name from ${oldName} to ${socket.data.user.name}`);
//         io.emit('name changed', oldName, socket.data.user.name);
//     } else {
//         clog(`User set name to ${socket.data.user.name}`);
//     };
//     socket.emit('name saved', socket.data.user.name);
// };

export const singleRename = (io, socket, oldName, newName, socketTarget) => {
    clog(`Notify to "${socketTarget.data.user.name}" for updated user name from "${oldName}" to "${newName}"`);
    io.to(socketTarget.id).emit(USER_EMIT.nameChanged, socket.data.user.id, oldName, newName)
};
export const singleRenameError = () => {
    
};

export const invalid = (socket, name) => {
    socket.emit(USER_EMIT.invalidName);
    clog(`${socket.id} falla al intentar usar el nombre "${name}"`);
};

export const notFound = (socket, userName) => {
    socket.emit(USER_EMIT.userNotFound, userName);
    clog(`Usuario "${socket.data.user.name}" falla al crear chat con usuario "${userName}" porque no existe`);
};

export const singleChat = (socket, socketTarget) => {
    const myUser = socket.data.user;
    const targetUser = socketTarget.data.user;
    socket.emit(USER_EMIT.singleChat, targetUser);
    socketTarget.emit(USER_EMIT.openSingleChat, myUser);
    clog(`Usuario "${myUser.name}" crea chat con usuario "${targetUser.name}"`);
};

export const message = (io, socket, targetSocket, message) => {
    io.to(targetSocket.id).emit(USER_EMIT.message, message);
    socket.emit(USER_EMIT.message, message, targetSocket.data.user);
    clog(`User "${message.user.name}" send to user "${targetSocket.data.user.name}" the message "${message.text}"`);
};
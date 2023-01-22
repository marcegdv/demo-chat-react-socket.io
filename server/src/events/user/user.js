import * as userEmit from '../../emissions/user.js';
import { clog } from '../../utils/logger.js';
import { validateUserName } from '../../utils/user.js';

export const USER_EVENT = {
    setName: 'set name',
    createSingle: 'create single chat',
    leaveSingle: 'leave single chat',
    message: 'message to single',
    singleRename: 'name changed',
};

export const connection = (socket) => {
    clog(`Nuevo socket.id = ${socket.id}`);
    const user = {
        id: Date.now().toString(),
        name: ''
    };
    socket.data.user = user;
    userEmit.user(socket, user);
};

export const disconnection = (io, socket) => {
    userEmit.userDisconnect(io, socket);
};

export const setName = (io, socket, name) => {
    const validName = String(name).trim();
    if (!!validName) {
        const oldName = socket.data.user.name;
        socket.data.user.name = validName;
        userEmit.saved(io, socket, oldName);
    } else {
        userEmit.invalid(socket, name);
    };
};

export const singleRename = async (io, socket, oldName, newName, userNameTarget) => {
    const isValidName =
        validateUserName(oldName) &&
        validateUserName(newName) &&
        validateUserName(userNameTarget);
    if (isValidName) {
        const list = await io.fetchSockets();
        const socketTarget = Array.from(list).find(skt => skt?.data?.user?.name === userNameTarget);
        if (!!socketTarget) {
            userEmit.singleRename(io, socket, oldName, newName, socketTarget);
        } else {
            userEmit.singleRenameError();
        };
    };
};

export const createChat = async (io, socket, userName) => {
    const list = await io.fetchSockets();
    const socketTarget = Array.from(list).find(skt => skt?.data?.user?.name === userName);
    if (!!!socketTarget) {
        userEmit.notFound(socket, userName);
    } else {
        const myName = socket.data.user.name;
        if (userName !== myName) {
            userEmit.singleChat(socket, socketTarget);
        };
    };
};

export const message = async (io, socket, user, message) => {
    const list = await io.fetchSockets();
    const targetSocket = Array.from(list).find(skt => skt?.data?.user?.id === user.id);
    if (!!!targetSocket) {
        userEmit.notFound(socket, user);
    } else {
        const myId = socket.data.user.id;
        if (user.id !== myId) {
            userEmit.message(io, socket, targetSocket, message);
        };
    };
};
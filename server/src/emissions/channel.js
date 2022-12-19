import * as channelRepo from '../repositories/channel.js';
import { clog } from '../utils/logger.js';

export const CHANNEL_EMIT = {
    list: 'channel list',
    joined: 'channel joined',
    notJoined: 'not joined',
    history: 'channel history',
    left: 'channel left',
    message: 'message from channel',
    rename: 'channel rename user',
    created: 'channel created',
    invalidName: 'invalid channel name',
};

export const list = (io, socket) => {
    const target = !!socket.data?.user?.name ? socket.data.user.name : socket.id;
    io.to(socket.id).emit(CHANNEL_EMIT.list, channelRepo.getChannels());
    clog(`${socket.id} Sending list of channels to ${target}`);
};

export const joined = (io, socket, channelName, userName) => {
    io.to(channelName).emit(CHANNEL_EMIT.joined, channelName, userName);
    clog(`${socket.id} User "${userName}" joined channel "${channelName}"`);
};

export const notJoined = (io, socket, channel) => {
    io.to(socket.id).emit(CHANNEL_EMIT.notJoined, channel);
    clog(`${socket.id} Socket ${socket.id} failed to join channel "${channel}". User name undefined.`);
};

export const history = (socket, channel, history) => {
    socket.emit(CHANNEL_EMIT.history, history);
    clog(`${socket.id} request message history of "${channel}"`);
};

export const left = (io, socket, channel, userName) => {
    io.to(channel).emit(CHANNEL_EMIT.left, channel, userName);
    clog(`${socket.id} User "${userName}" left channel "${channel}"`);
};

export const message = (io, channelName, message) => {
    io.to(channelName).emit(CHANNEL_EMIT.message, channelName, message);
    clog(`To channel "${channelName}", user "${message.user.name}" send "${message.text}"`);
};

export const userRename = (io, channelName, oldName, newName) => {
    io.to(channelName).emit(CHANNEL_EMIT.rename, oldName, newName);
    clog(`To channel "${channelName}", user "${oldName}" set name as "${newName}"`);
};

export const created = (socket, channelName) => {
    socket.emit(CHANNEL_EMIT.created, channelName, channelRepo.getChannelData(channelName));
    clog(`Channel "${channelName}" has been created`);
};

export const invalidName = (socket, channelName) => {
    socket.emit(CHANNEL_EMIT.invalidName, channelName);
};
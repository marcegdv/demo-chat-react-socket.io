import * as events from './channel.js'
import { CHANNEL_EVENT } from "./channel.js";

export const channelEventListener = (io, socket) => {
    socket.on(CHANNEL_EVENT.list, () => events.list(io, socket));
    socket.on(CHANNEL_EVENT.join, (channelName) => events.join(io, socket, channelName));
    socket.on(CHANNEL_EVENT.history, (channel) => events.history(socket, channel));
    socket.on(CHANNEL_EVENT.message, (channelName, message) => events.message(io, channelName, message));
    socket.on(CHANNEL_EVENT.userRename, (channelName, oldName, newName) => events.userRename(io, channelName, oldName, newName));
    socket.on(CHANNEL_EVENT.leave, (channel) => events.leave(io, socket, channel));
    socket.on(CHANNEL_EVENT.create, (channel) => events.create(socket, channel));
};
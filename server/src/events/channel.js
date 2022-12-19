import * as channelEmit from '../emissions/channel.js';
import * as channelRepo from '../repositories/channel.js';

export const CHANNEL_EVENT = {
    list: 'channel list',
    join: 'join channel',
    history: 'channel history',
    message: 'message to channel',
    userRename: 'channel rename user',
    leave: 'leave channel',
    create: 'create channel',
};

export const list = (io, socket) => {
    channelEmit.list(io, socket);
};

export const join = (io, socket, channelName) => {
    const userName = socket.data?.user?.name;
    if (!!userName) {
        const user = { id: '', name: '' };
        const msg = { user: user, text: `- ${userName} se unió al canal -` };
        socket.join(channelName);
        message(io, channelName, msg)
        channelEmit.joined(io, socket, channelName, userName);
    } else {
        channelEmit.notJoined(io, socket, channelName);
    };
};

export const history = (socket, channelName) => {
    const history = channelRepo.getChannelHistory(channelName);
    if (history) {
        channelEmit.history(socket, channelName, history);
    };
};

export const leave = (io, socket, channelName) => {
    const userName = socket.data?.user?.name;
    if (!!userName) {
        const user = { id: '', name: '' };
        const msg = { user: user, text: `- ${userName} dejó el canal -` };
        socket.leave(channelName);
        message(io, channelName, msg)
        channelEmit.left(io, socket, channelName, userName);
    };
};

export const message = (io, channelName, message) => {
    if (channelRepo.addMessageToChannel(channelName, message)) {
        channelEmit.message(io, channelName, message);
    };
};

export const userRename = (io, channelName, oldName, newName) => {
    const user = { id: '', name: '' };
    const msg = { user: user, text: `- ${oldName} ahora se llama ${newName} -` };
    message(io, channelName, msg)
    channelEmit.userRename(io, channelName, oldName, newName);
};

export const create = (socket, channelName) => {
    if (!!channelName) {
        if (channelRepo.addChannel(channelName)) {
            channelEmit.created(socket, channelName);
        } else {
            channelEmit.invalidName(socket, channelName);
        };
    } else {
        channelEmit.invalidName(socket, channelName);
    };
};
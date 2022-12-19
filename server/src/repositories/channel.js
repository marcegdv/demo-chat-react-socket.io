import { validateChannelName } from "../utils/channel.js";

export const DB_CHANNELS = {
    '#General': {
        name: '#General',
        id: '1',
        messages: [
            {
                user: { id: '111', name: '@admin' },
                text: 'Canal de temas diversos y de la libre expresión.',
            },
        ],
    },
    '#Ayuda': {
        name: '#Ayuda',
        id: '2',
        messages: [
            {
                user: { id: '222', name: '@helpdesk' },
                text: 'Canal de consultas sobre la app de chat.',
            },
            {
                user: { id: '222', name: '@helpdesk' },
                text: 'No se responden otro tipo de consultas.',
            },
        ],
    },
};

export const getChannels = () => DB_CHANNELS;

export const getChannelData = (channelName) => {
    if (Object.keys(DB_CHANNELS).includes(channelName)) {
        return DB_CHANNELS[channelName];
    } else {
        return null;
    };
};

export const existsChannel = (channelName) => {
    if (!validateChannelName(channelName)) return false;
    return Object.keys(DB_CHANNELS).includes(channelName);
};

export const addChannel = (channelName) => {
    const validName = validateChannelName(channelName);
    if (!!validName) {
        DB_CHANNELS[channelName] = {
            name: channelName,
            id: '#' + Date.now().toString(),
            messages: [],
        };
        return true;
    };
    return false;
};

export const getChannelHistory = (channelName) => {
    if (Object.keys(DB_CHANNELS).includes(channelName)) {
        return DB_CHANNELS[channelName].messages;
    };
    return null;
};

export const addMessageToChannel = (channelName, message) => {
    if (Object.keys(DB_CHANNELS).includes(channelName)) {
        DB_CHANNELS[channelName].messages.push(message);
        return true;
    };
    return false;
};
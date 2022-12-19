export const channelNamesList = (io) => {
    const channels = io.sockets.adapter.rooms;
    const channelNames = [];
    channels.forEach((value, key) => {
        const members = [];
        value.forEach((value) => members.push(value));
        channelNames.push({ name: key, members: members });
    });
    return channelNames;
};

export const validateChannelName = (channelName) => {
    if (typeof channelName !== 'string') return '';
    let name = channelName;
    if (String(name).trim().length < 1) return '';
    if (String(name).substring(0,1) !== '#') name = '#' + name;
    return name;
};
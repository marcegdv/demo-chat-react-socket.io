export const VALID_CHARS = {
    user: 'abcdefghijklmnopqrstuvwxyzñáéíóúü ',
    channel: '#abcdefghijklmnopqrstuvwxyzñáéíóúü1234567890 -_',
};

export const isChannel = (chatName) => {
    return chatName &&
        typeof chatName === 'string' &&
        chatName.length > 1 &&
        chatName.substring(0, 1) === '#';
};

export const sanitizeName = (name, availableChars = VALID_CHARS.user) => {
    let response = '';
    Array.from(name).forEach(char => {
        if (availableChars.includes(String(char).toLowerCase())) {
            response += char;
        };
    });
    return response;
};

export const getChannels = (channelsObject) => {
    return Object.keys(channelsObject).filter(key => isChannel(key)) || [];
};

export const getSingles = (singlesObject) => {
    return Object.keys(singlesObject).filter(key => !isChannel(key)) || [];
};

export const existsChat = (list, chatName) => Object.keys(list).includes(chatName);

export const newInfoMessage = (message) => {
    return { user: { id: '', name: '' }, text: message };
};

export const newSingleChat = (singles, user, message = '') => {
    const newMessage = message || newInfoMessage(`- Chat privado con ${user.name} -`);
    singles[user.id] = {
        name: user.name,
        messages: [newMessage],
    };
};

export const addMessageToSingleChat = (singles, targetUser, message) => {
    singles[targetUser.id].messages.push(message);
};
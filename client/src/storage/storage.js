const wss = window.sessionStorage;
const wls = window.localStorage;

export const storage = (isLocal = false) => {
    const ws = isLocal ? wls : wss;
    return {
        setOnline: (online) => ws.setItem('online', online),
        setUser: (user) => ws.setItem('user', JSON.stringify(user)),
        setMyId: (myName) => ws.setItem('myId', myName),
        setMyName: (myName) => ws.setItem('myName', myName),
        setChannels: (channels) => ws.setItem('channels', JSON.stringify(channels)),
        setTarget: (target) => ws.setItem('target', JSON.stringify(target)),
        setMessages: (messages) => ws.setItem('messages', JSON.stringify(messages)),
        setMessage: (message) => ws.setItem('message', message),
        setSingles: (singles) => ws.setItem('singles', JSON.stringify(singles)),

        getOnline: () => ws.getItem('online'),
        getUser: () => JSON.parse(ws.getItem('user')),
        getMyId: () => ws.getItem('myId'),
        getMyName: () => ws.getItem('myName'),
        getChannels: () => JSON.parse(ws.getItem('channels')),
        getTarget: () => JSON.parse(ws.getItem('target')),
        getMessages: () => JSON.parse(ws.getItem('messages')),
        getMessage: () => ws.getItem('message'),
        getSingles: () => JSON.parse(ws.getItem('singles')),

        set: (obj) => ws.setItem('CHATAPP', JSON.stringify(obj)),
        get: () => JSON.parse(ws.getItem('CHATAPP')),
    };
};
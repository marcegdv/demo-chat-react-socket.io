import { storage } from "../storage/storage";

export const getStorageState = () => {
    return {
        online: storage().getOnline(),
        user: {
            id: storage().getMyId(),
            name: storage().getMyName(),
        },
        channels: storage().getChannels(),
        target: storage().getTarget(),
        messages: storage().getMessages(),
        message: storage().getMessage(),
        singles: storage().getSingles(),
    };
};

export const reducerActionMap = {
    setOnline: 'set online',
    setMyId: 'set my id',
    setMyName: 'set my name',
    setUser: 'set user',
    setChannels: 'set channels',
    setTarget: 'set target',
    setMessages: 'set messages',
    setMessage: 'set message',
    setSingles: 'set single',
};

export const appReducer = (state, action) => {
    const { type, payload } = action;

    const setOnline = (booleanValue) => storage().setOnline(booleanValue);
    const setMyId = (stringValue) => storage().setMyId(stringValue);
    const setMyName = (stringValue) => storage().setMyName(stringValue);
    const setUser = (user) => storage().setUser(user);
    const setChannels = (channels) => storage().setChannels(channels);
    const setTarget = (target) => storage().setTarget(target);
    const setMessages = (messages) => storage().setMessages(messages);
    const setMessage = (message) => storage().setMessage(message);
    const setSingles = (singles) => storage().setSingles(singles);

    switch (type) {
        case reducerActionMap.setOnline:
            setOnline(payload);
            return { ...state, online: payload };
        case reducerActionMap.setMyId:
            setMyId(payload);
            return { ...state, user: { ...state.user, id: payload } };
        case reducerActionMap.setMyName:
            setMyName(payload);
            return { ...state, ser: { ...state.user, name: payload } };
        case reducerActionMap.setUser:
            setUser(payload);
            return { ...state, user: payload };
        case reducerActionMap.setChannels:
            setChannels(payload);
            return { ...state, channels: payload };
        case reducerActionMap.setTarget:
            setTarget(payload);
            return { ...state, target: payload };
        case reducerActionMap.setMessages:
            setMessages(payload);
            return { ...state, messages: payload };
        case reducerActionMap.setMessage:
            setMessage(payload);
            return { ...state, message: payload };
        case reducerActionMap.setSingles:
            setSingles(payload);
            return { ...state, singles: payload };
        default:
            return state;
    };
};
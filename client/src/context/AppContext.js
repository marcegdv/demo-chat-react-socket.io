import { createContext } from 'react';

export const INIT_CONTEXT = {
    online: false,
    user: {
        id: '',
        name: '',
    },
    channels: {},
    target: {
        id: '',
        name: ''
    },
    messages: [],
    message: '',
    singles: {},
};
export const AppContext = createContext(INIT_CONTEXT);
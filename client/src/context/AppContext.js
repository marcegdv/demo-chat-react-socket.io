import React, { createContext, useState } from 'react';

const AppContext = createContext();
export default AppContext;

export const AppContextProvider = (props) => {
    const context = {
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
    const [appState, setAppState] = useState(context);

    return (
        <AppContext.Provider value={[appState, setAppState]}>
            {props.children}
        </AppContext.Provider>
    );
};
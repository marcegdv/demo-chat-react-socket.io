import { useReducer } from "react";
import { AppContext, INIT_CONTEXT } from "./AppContext";
import { appReducer } from "./AppReducer";

export const AppContextProvider = (props) => {
    const [appState, dispatch] = useReducer(appReducer, INIT_CONTEXT);

    return (
        <AppContext.Provider value={{ appState, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
};
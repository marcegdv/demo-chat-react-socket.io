import React from 'react';
import ReactDOM from 'react-dom/client';
import { connect } from 'socket.io-client';
import './styles/index.css';
import { AppContextProvider } from './context/AppContext';
import App from './main/App';

const SOCKET_IO_SERVER = 'http://localhost:5000';

const socket = connect(SOCKET_IO_SERVER);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppContextProvider>
            <App socket={socket} />
        </AppContextProvider>
    </React.StrictMode>
);
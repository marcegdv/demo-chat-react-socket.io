import React, { useContext } from 'react';

import AppContext from '../context/AppContext';

const Message = (props) => {
    const { message } = props;
    const [appState] = useContext(AppContext);

    const myId = appState.user.id

    let htmlElementP;

    if (!!message.user.name) {
        let messageStyles = (message.user.id === myId) ? styles.own : styles.other;
        htmlElementP = <p style={messageStyles}>{message.user.name}: {message.text}</p>
    } else {
        htmlElementP = <p style={styles.server}>{message.text}</p>
    };
    return htmlElementP;
};

export default Message;

const styles = {
    own: {
        color: '#7bf',
    },
    other: {
        color: '#ccc',
    },
    server: {
        color: '#777',
    },
};
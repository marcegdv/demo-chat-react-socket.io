import { useEffect, useRef, useContext } from "react";
import Message from "./Message";
import AppContext from "../context/AppContext";
import { isChannel } from "../utils/functions";

const Messages = () => {
    const [appState] = useContext(AppContext);
    const { target, singles } = appState;

    const getMessages = () => {
        if (isChannel(target.name)) {
            return appState.messages;
        };
        return singles[target.id].messages;
    };

    const messages = getMessages();

    //autoscroll cuando llega un mensage
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(() => {
        scrollToBottom();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages.length]);

    return (
        <div style={styles.container}>
            <div>
                {messages.map(
                    (message, index) => <Message message={message} key={`msgIdx${index}`} />
                )}
            </div>
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default Messages;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#222',
        color: '#ddd',
        padding: '8px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#ddd',
        overflow: 'auto',
        height: '100%',
        minHeight: '261px',
    },
};
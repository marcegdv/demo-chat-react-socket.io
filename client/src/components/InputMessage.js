import { useState } from "react";

const InputMessage = (props) => {
    const { message, onClick } = props;
    const [value, setValue] = useState(message);

    const disableSend = String(value).trim().length === 0;

    const sendMessage = (messageToSend) => {
        onClick(messageToSend);
        setValue(prev => '');
    };

    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter' && !disableSend) {
            sendMessage(value);
        };
    };

    return (
        <div style={styles.container}>
            <input
                style={styles.input}
                type="text"
                placeholder="Escribe tu mensaje..."
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => handleOnKeyDown(event)}
                contentEditable={true}
            />
            <button
                style={styles.button}
                onClick={() => sendMessage(value)}
                disabled={disableSend}
            >
                💬
            </button>
        </div>
    );
};

export default InputMessage;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        backgroundColor: '#111',
        color: '#ddd',
        padding: '8px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#ddd',
    },
    input: {
        padding: '8px 12px',
        width: `calc(100% - 28px)`,
        borderRadius: '16px',
        border: '2px solid #777',
    },
    button: {
        backgroundColor: '#19e',
        fontWeight: 'bold',
        color: '#000',
        border: 'none',
        padding: '8px',
        borderRadius: '32px',
        cursor: 'pointer',
    },
};
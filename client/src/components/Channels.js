import { useState } from "react";
import Channel from "./Channel";
import Name from "./Name";

const ChannelsArea = (props) => {
    const { channels, onClickChat, selected, createNewChat, onClickRefreshChannels } = props;

    const [name, setName] = useState('');

    const handleCreateNewChat = (chatName) => {
        if (!!createNewChat) {
            setName(chatName);
            createNewChat(chatName);
        };
    };

    return (
        <div style={styles.container}>
            <div style={styles.listContainer}>
                <div style={styles.title} onClick={onClickRefreshChannels}>
                    Chats
                </div>
                <div style={styles.list}>
                    {Object.keys(channels).map(
                        (channel, index) =>
                            <div
                                style={styles.itemWrapper}
                                key={`chnl${index}`}
                                onClick={() => onClickChat(channel)}
                            >
                                <Channel
                                    key={`chni${index}`}
                                    name={channel}
                                    active={selected === channel}
                                />
                            </div>
                    )}
                </div>
            </div>
            <div style={styles.newChannel}>
                <div style={styles.title}>
                    Crear chat
                </div>
                <Name
                    name={name}
                    setName={handleCreateNewChat}
                    label='Nuevo chat:'
                    placeholder='Nombre del canal o usuario...'
                    buttonLabel='Crear'
                    highlight={false}
                    validateCharacters='channel'
                />
            </div>
        </div>
    );
};

export default ChannelsArea;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        gap: '8px',
        backgroundColor: '#333',
        color: '#ddd',
        padding: '8px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#ddd',
        minHeight: '324px',
        width: '320px',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        backgroundColor: '#444',
        color: '#ddd',
        padding: '8px',
        borderRadius: '4px',
        width: 'calc(100% - 16px)',
    },
    title: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#f90',
        width: '100%',
        borderBottom: '1px solid #777',
        paddingBottom: '8px',
        cursor: 'pointer',
    },
    list: {
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px',
    },
    itemWrapper: {
        cursor: 'pointer',
    },
    newChannel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        gap: '8px',
        backgroundColor: '#555',
        color: '#ddd',
        padding: '8px',
        borderRadius: '4px',
        width: 'calc(100% - 16px)',
    },
};
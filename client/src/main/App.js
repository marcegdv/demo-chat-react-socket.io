import { useEffect, useState, useContext } from "react";
import ChannelsArea from "../components/Channels";
import ChatArea from "../components/ChatArea";
import Dialog from "../components/Dialog";
import InputMessage from "../components/InputMessage";
import Messages from "../components/Messages";
import Name from "../components/Name";

import AppContext from "../context/AppContext";

import { EMISSIONS } from "../socket.io/emissions";
import { EVENTS } from "../socket.io/events";
import { storage } from "../storage/storage";
import { addMessageToSingleChat, existsChat, getSingles, isChannel, newSingleChat } from "../utils/functions";

const session = storage();

const App = (props) => {
    const { socket } = props;

    const [modal, setModal] = useState({
        show: false,
        topBar: '',
        children: null,
    });
    const [appState, setAppState] = useContext(AppContext);
    const [message, setMessage] = useState('');

    session.set(appState);
    session.setOnline(appState.online);
    session.setUser(appState.user);
    session.setMyId(appState.user.id);
    session.setMyName(appState.user.name);
    session.setChannels(appState.channels);
    session.setTarget(appState.target);
    session.setMessages(appState.messages);
    session.setMessage(appState.message);
    session.setSingles(appState.singles);

    //Escuchar los eventos del servidor
    useEffect(() => {
        const eventList = socketEvents(socket, EVENTS, EMISSIONS);
        return () => eventList.forEach(eventName => socket.off(eventName));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Buscar historial si cambio de canal
    useEffect(() => {
        session.setTarget(appState.target);
        if (isChannel(appState.target.name)) {
            socket.emit(EMISSIONS.channelHistory, appState.target.name);
        } else {
            //fix ? switch to single chat ?
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appState.target.name]);

    // Donde se procesan todos los eventos/mensajes que envía el servidor
    const socketEvents = (socket, events, emissions) => {
        socket.on(events.connect, () => {
            setAppState(p => ({ ...p, online: true }));
            socket.emit(emissions.channelList);
        });
        socket.on(events.disconnect, () => {
            setAppState(p => ({ ...p, online: false }));
        });

        socket.on(events.userId, (user) => {
            setAppState(p => ({ ...p, user }));
        });

        socket.on(events.channelList, (list) => {
            const channels = list;
            const singles = session.getSingles();
            Object.keys(singles).forEach(key => {
                channels[singles[key].name] = singles[key];
            });
            setAppState(p => ({ ...p, channels: { ...channels } }));
        });

        //eventos de usuario
        socket.on(events.userDisconnect, (id, name) => {
            const singles = session.getSingles();
            if (singles[id]) {
                const channels = session.getChannels();
                delete singles[id];
                delete channels[name];
                const target = session.getTarget();
                const retarget = target.id === id ? { id: '', name: '' } : target;
                setAppState(p => ({
                    ...p,
                    target: retarget,
                    channels: { ...channels },
                    singles: { ...singles },
                }));
            };
        });
        socket.on(events.nameSaved, (newName, oldName) => {
            const user = session.getUser();
            user.name = newName;
            setAppState(p => ({ ...p, user }));
            const singles = session.getSingles();
            const singlesKeys = getSingles(session.getSingles());
            singlesKeys.forEach(id => {
                socket.emit(emissions.singleRename, oldName, newName, singles[id].name)
            });
        });
        socket.on(events.invalidUserName, () => {
            setModal({
                show: true,
                topBar: 'Error',
                children: <p>{`¡No definiste tu nombre o apodo!`}</p>
            })
        });
        socket.on(events.userNotFound, (user) => {
            setModal({
                show: true,
                topBar: 'Error',
                children: <p>{`¡Usuario "${user}" no existe!`}</p>
            })
        });
        socket.on(events.singleChat, (user) => {
            handleLeaveTarget();
            const singles = session.getSingles();
            if (!singles[user.id]) {  //fix ? no va
                newSingleChat(singles, user);
                const channels = session.getChannels();
                channels[user.name] = user;
                setAppState(p => ({
                    ...p,
                    channels: { ...channels },
                    target: user,
                    singles: { ...singles },
                }));
            };  //fix ? no va
        });
        socket.on(events.openSingleChat, (user) => {
            const singles = session.getSingles();
            if (!singles[user.id]) {
                newSingleChat(singles, user);
                const channels = session.getChannels();
                channels[user.name] = user;
                setAppState(p => ({
                    ...p,
                    channels: { ...channels },
                    singles: { ...singles },
                }));
            };
        });
        socket.on(events.messageFromSingle, (message, userSender) => {
            const singles = session.getSingles();
            const id = userSender?.id ?? message.user.id;
            const name = userSender?.name ?? message.user.name;
            if (!singles[id]) {
                newSingleChat(singles, { id: id, name: name }, message);
                setAppState(p => ({
                    ...p,
                    channels: [...p.channels, name],
                    singles: { ...singles },
                }));
            } else {
                singles[id].messages = [...singles[id].messages, message];
                setAppState(p => ({ ...p, singles: { ...singles } }));
            };
        });
        socket.on(events.nameChanged, (id, oldName, newName) => {
            const singles = session.getSingles();
            if (singles[id].name === oldName) {
                singles[id].name = newName;
                const user = {
                    id: id,
                    name: newName,
                };
                const message = {
                    user: { id: '', name: '' },
                    text: `- ${oldName} ahora se llama ${newName} -`,
                };
                addMessageToSingleChat(singles, user, message);
                const channels = session.getChannels();
                const newChannel = channels[oldName];
                delete channels[oldName];
                channels[newName] = newChannel;
                let retarget = session.getTarget();
                if (retarget.name === oldName) {
                    retarget.name = newName;
                };
                setAppState(p => ({
                    ...p,
                    target: retarget,
                    channels: { ...channels },
                    singles: { ...singles },
                }));
            };
        })

        //eventos de canales
        socket.on(events.channelJoined, (channelName, userName) => {
            if (session.getMyName() === userName) {
                setAppState(p => ({ ...p, target: { id: '', name: channelName } }));
            };
        });
        socket.on(events.notJoined, (channel) => {
            setModal({
                show: true,
                topBar: 'Error',
                children: <p>{`Para chatear en ${channel} primero define tu nombre o apodo.`}</p>
            })
        })
        socket.on(events.channelHistory, (history) => {
            setAppState(p => ({ ...p, messages: [...history] }));
        });
        socket.on(events.messageFromChannel, (channelName, newMessage) => {
            const messages = session.getMessages();
            setAppState(p => ({ ...p, messages: [...messages, newMessage] }));
        });
        socket.on(events.leaveChannel, (channelName, userName) => {
            if (appState.user.name === userName) {
                setAppState(p => ({ ...p, target: { id: '', name: '' } }));
            };
        });
        socket.on(events.channelCreated, (channelName, channelData) => {
            const channels = session.getChannels();
            channels[channelName] = channelData;
            setAppState(p => ({
                ...p,
                channels: { ...channels },
            }))
            handleOnClickChat(channelName);
        });
        socket.on(events.invalidChannelName, (channelName) => {
            setModal({
                show: true,
                topBar: 'Error',
                children: <p>{`El nombre para el canal no es válido.\n"${channelName}"`}</p>
            })
        });

        return Object.values(events);
    };

    const handleClickSetName = (newName) => {
        if (appState.user.name !== newName) {
            socket.emit(EMISSIONS.setName, newName);
            if (isChannel(appState.target.name)) {
                socket.emit(EMISSIONS.rename, appState.target.name, appState.user.name, newName);
            } else {
                socket.emit(EMISSIONS.namec)
            };
        };
    };
    const handleClickRefreshChannels = () => {
        socket.emit(EMISSIONS.channelList);
    };
    const handleLeaveTarget = (chatName = appState.target.name) => {
        if (isChannel(chatName)) {
            socket.emit(EMISSIONS.leaveChannel, chatName);
        } else {
            socket.emit(EMISSIONS.leaveSingle, chatName); //fix: no such server event
        };
    };
    const handleOnClickChat = (chatName) => {
        const target = session.getTarget();
        if (target.name !== chatName) {
            if (isChannel(target.name)) {
                socket.emit(EMISSIONS.leaveChannel, target.name);
            };
            if (isChannel(chatName)) {
                socket.emit(EMISSIONS.joinChannel, chatName);
            } else {
                const singles = session.getSingles();
                const singlesIds = Object.keys(singles);
                const singlesData = Object.values(singles);
                const index = singlesData.findIndex(data => data.name === chatName);
                if (index >= 0) {
                    const newTarget = {
                        id: singlesIds[index],
                        name: singlesData[index].name,
                    };
                    setAppState(p => ({ ...p, target: newTarget }));
                };
            };
        };
    };
    const handleCreateChat = (chatName) => {
        if (existsChat(appState.channels, chatName)) {
            let alertMessage = `Ya estas chateando con ${chatName}`;
            if (isChannel(chatName)) {
                alertMessage = `¡El canal ${chatName} ya existe!`;
            };
            setModal({
                show: true,
                topBar: 'Error',
                children: <p>{alertMessage}</p>
            })
        } else {
            if (isChannel(chatName)) {
                socket.emit(EMISSIONS.createChannel, chatName);
            } else {
                socket.emit(EMISSIONS.createSingle, chatName);
            };
        };
    };
    const handleClickSendMessage = (messageToSend) => {
        const newMessage = {
            user: appState.user,
            text: messageToSend,
        };
        if (isChannel(appState.target.name)) {
            socket.emit(EMISSIONS.messageToChannel, appState.target.name, newMessage);
        } else {
            socket.emit(EMISSIONS.messageToSingle, appState.target, newMessage);
        };
        setMessage(p => '');
    };

    if (!appState.online) return (
        <div style={styles.offline}>
            <h2>Esperando servidor... </h2>
            <img src='/loading-50.webp' width='40px' height='40px' alt='' />
        </div>
    );
    return (
        <>
            <div style={styles.container}>
                <Name
                    name={appState.user.name}
                    setName={handleClickSetName}
                    label='Mi nombre (solo letras y espacio):'
                    placeholder={appState.user.name ? `Tu nombre actual es: ${appState.user.name}` : 'Ingresa tu nombre o apodo...'}
                    buttonLabel='Aplicar'
                    highlight={true}
                    validateCharacters='user'
                />
                {!!appState.user.name && <div style={styles.main}>
                    <ChannelsArea
                        channels={appState.channels}
                        onClickRefreshChannels={handleClickRefreshChannels}
                        onClickChat={handleOnClickChat}
                        selected={appState.target.name}
                        createNewChat={handleCreateChat}
                    />
                    <ChatArea hide={!!!appState.target.name}>
                        <Messages />
                        <InputMessage message={message} onClick={handleClickSendMessage} />
                    </ChatArea>
                </div>}
            </div>
            {modal.show &&
                <Dialog topBar={modal.topBar} onClick={() => setModal({ ...modal, show: false })}>
                    {modal.children}
                </Dialog>
            }
        </>
    );
};

export default App;

const styles = {
    offline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#dd0',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px',
        height: 'calc(100vh - 16px)',
    },
    main: {
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        height: 'calc(100% - 150px)',
    },
};
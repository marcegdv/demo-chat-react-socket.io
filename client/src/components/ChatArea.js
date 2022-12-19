const ChatArea = (props) => {

    const { hide, children } = props;

    return (
        <>
            {!hide && <div style={styles.container}>
                {children ?? ''}
            </div>}
        </>
    );
};

export default ChatArea;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minHeight: '324px',
        width: 'calc(100% - 320px)',
        minWidth: '320px',
    },
};
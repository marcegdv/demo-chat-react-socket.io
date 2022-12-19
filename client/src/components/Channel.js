const Channel = (props) => {
    const { name, active } = props
    const finalStyle = active ? styles.selected : styles.container;

    return (
        <div style={finalStyle}>
            {String(name).trim()}
        </div>
    );
};

export default Channel;

const styles = {
    normal: {
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#222',
    },
    selected: {
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#ff7',
        fontWeight: 'bold',
        color: '#111'
    },
};
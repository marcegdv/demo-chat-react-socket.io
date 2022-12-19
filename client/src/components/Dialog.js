import React, { useEffect, useState } from 'react';
import useFocus from '../hooks/useFocus';

/**
 *  @topBar dialog title
 *  @onClick Function
 *  @children React.ReactNode
 */
const Dialog = (props) => {
    const { topBar, onClick, children } = props;

    const [scrollY, setScrollY] = useState(0);
    const [scrollX, setScrollX] = useState(0);

    const [buttonRef, setFocusButton] = useFocus();

    const focusOnButton = (event) => {
        console.log('Tecla:', event.key);
        if (event.key === 'Tab' || event.key === 'Shift') {
            event.preventDefault();
        };
    };
    const handleDocumentKeyDown = () => {
        setFocusButton();
        document.addEventListener('keydown', focusOnButton);
    };

    useEffect(() => {
        setScrollY(window.scrollY);
        setScrollX(window.scrollX);
        document.body.style.overflow = 'hidden';

        handleDocumentKeyDown();
        return () => {
            document.removeEventListener('keydown', focusOnButton);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = () => {
        document.body.style.overflow = 'visible';
        window.scrollTo(scrollX, scrollY);
        onClick();
    };

    return (
        <div style={styles.backGround}>
            <div style={styles.container}>
                {topBar && <div style={styles.topBar}>
                    {topBar}
                </div>}
                <div style={styles.content}>
                    {children}
                </div>
                <div style={styles.buttons}>
                    <button onClick={handleClick} ref={buttonRef}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;

const styles = {
    backGround: {
        zIndex: 1,
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(127, 0, 0, 0.5)',
        top: '0',
        left: '0',
    },
    container: {
        zIndex: 2,
        borderRadius: '8px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#222',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#fff',
        padding: '16px',
        maxWidth: '640px',
        maxHeight: '480px',
        width: 'fit-content',
        height: 'fit-content',
        minHeight: '240px',
        minWidth: '320px',
        boxShadow: '10px 10px 10px 0px rgba(0, 0, 0, 0.3)',
    },
    topBar: {
        display: 'flex',
        borderRadius: '4px',
        alignItems: 'center',
        backgroundColor: '#f33',
        position: 'relative',
        width: 'calc(100% - 6px)',
        minWidth: 'fit-content - 50px)',
        minHeight: '34px',
        height: 'fit-content',
        paddingLeft: '8px',
        fontFamily: 'Verdana',
        color: '#fff',
        cursor: 'normal',
        userSelect: 'none',
    },
    content: {
        borderRadius: '4px',
        padding: '8px',
        position: 'absolute',
        top: '66px',
        left: '16px',
        bottom: '80px',
        right: '16px',
        overflowY: 'auto',
        backgroundColor: '#777',
    },
    buttons: {
        position: 'absolute',
        bottom: '16px',
        right: '16px',
    },
};
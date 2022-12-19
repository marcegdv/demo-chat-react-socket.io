import { useState } from "react";
import useFocus from "../hooks/useFocus";
import { sanitizeName } from "../utils/functions";
import { VALID_CHARS } from "../utils/functions";

const Name = (props) => {
    const { name, setName, label, placeholder, buttonLabel, highlight, id, validateCharacters, minLength = 2, maxLength  = 16} = props;
    const [value, setValue] = useState(name);
    const [inputRef, setInputFocus] = useFocus();

    const disableSet = String(value).trim().length === 0;

    const handleClickMyName = () => {
        setValue(name);
        setInputFocus();
    };

    const handleKeyDown = (key) => {
        if ( key === 'Enter') {
            handleSetName();
        };
    };

    const handleSetName = () => {
        if (validateCharacters) {
            setName(sanitizeName(value, VALID_CHARS[validateCharacters]));
        } else {
            setName(value);
        };
        setValue(p => '');
    };

    const buttonIsEnabled = (name !== value) || (String(value).length > 0);

    return (
        <div style={styles.container}>
            {highlight && <div style={styles.name}>
                <div>
                    {label}
                </div>
                <div style={styles.myName} onClick={handleClickMyName} htmlFor={id ?? 'inputText'}>
                    {name}
                </div>
            </div>}
            <input
                id={id ?? 'inputText'}
                ref={inputRef}
                type='text'
                name='name'
                placeholder={placeholder}
                value={value}
                minLength={minLength}
                maxLength={maxLength}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event.key)}
                style={styles.input}
            />
            {buttonIsEnabled && <button
                style={styles.button}
                onClick={handleSetName}
                disabled={disableSet}
            >
                {buttonLabel}
            </button>}
        </div>
    );
};

export default Name;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        backgroundColor: '#444',
        color: '#ddd',
        padding: '16px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#ddd',
        width: 'auto',
        maxHeight: 'fit-content',
    },
    name: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    myName: {
        color: '#7bf',
        fontWeight: '500',
        cursor: 'pointer',
    },
    input: {
        padding: '8px 16px',
        width: `calc(100% - 8px)`,
        backgroundColor: '#ddd',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '16px',
        border: '2px solid #aaa',
        borderRadius: '32px',
    },
    button: {
        backgroundColor: '#19e',
        fontWeight: 'bold',
        color: '#000',
        border: 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};
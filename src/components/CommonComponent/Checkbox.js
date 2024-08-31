import React from 'react';
const Checkbox = ({ checked, onChange, styles = {} }) => {
    const defaultStyles = {
        container: {
            display: 'inline-block',
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none',
        },
        checkbox: {
            position: 'absolute',
            opacity: 0,
            cursor: 'pointer',
            height: 0,
            width: 0,
        },
        checkmark: {
            width: '20px',
            height: '20px',
            backgroundColor: checked ? '#2196F3' : '#fff',
            border: '2px solid #ccc',
            display: 'inline-block',
            verticalAlign: 'middle',
            lineHeight: '20px',
            textAlign: 'center',
            color: 'white',
            transition: 'background-color 0.3s, border-color 0.3s',
        },
        checkmarkChecked: {
            borderColor: '#299fac',
            backgroundColor: '#299fac',
        },
        checkmarkUnchecked: {
            borderColor: '#ccc',
            backgroundColor: '#fff',
        },
        checkmarkAfter: {
            content: '""',
            position: 'absolute',
            left: '8px',
            top: '4px',
            width: '5px',
            height: '9px',
            border: 'solid white',
            borderWidth: '0 2px 2px 0',
            transform: 'rotate(45deg)',
            display: checked ? 'block' : 'none',
        },
    };

    // Merge default styles with custom styles passed as props
    const mergedStyles = {
        container: { ...defaultStyles.container, ...styles.container },
        checkbox: { ...defaultStyles.checkbox, ...styles.checkbox },
        checkmark: {
            ...defaultStyles.checkmark,
            ...styles.checkmark,
            ...(checked
                ? defaultStyles.checkmarkChecked
                : defaultStyles.checkmarkUnchecked),
        },
        checkmarkAfter: { ...defaultStyles.checkmarkAfter, ...styles.checkmarkAfter },
    };

    return (
        <label style={mergedStyles.container}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                style={mergedStyles.checkbox}
            />
            <span style={mergedStyles.checkmark}>
                <span style={mergedStyles.checkmarkAfter}></span>
            </span>
        </label>
    );
};

export default Checkbox;

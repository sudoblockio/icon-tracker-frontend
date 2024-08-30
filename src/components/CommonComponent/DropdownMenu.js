import React from 'react';
import Select from 'react-select';

export default function DropdownMenu({ customStyles, value, ...props }) {
    const defaultStyles = {
        container: (styles, { isFocused }) => ({
            ...styles,
            width: "15.55em",
            borderRadius: "20px !important",
            cursor: "pointer !important",

        }),
        valueContainer: (base) => ({
            ...base,
            height: "40px !important",
        }),
        control: (styles, { isFocused }) => ({
            ...styles,
            boxShadow: "unset !important",
            borderColor: "rgba(1,1,1,0.2) !important",
            backgroundColor: "white",
            width: "100%",
            cursor: "pointer !important",
            borderRadius: "5px",


        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                cursor: "pointer !important",
                height: "40px !important",
                backgroundColor: isSelected ? '#299fac' : isFocused ? '#299fac90' : 'white',
                color: isSelected ? 'white' : isFocused ? 'white' : 'black',
            };
        },
        input: (styles) => ({
            ...styles,
            color: "transparent",
            cursor: "pointer !important",

        }),
        menu: (styles) => ({
            ...styles,
            cursor: "pointer !important",
        }),
    };

    const mergedStyles = customStyles
        ? { ...defaultStyles, ...customStyles }
        : defaultStyles;


    return <Select
        value={value}
        styles={mergedStyles} {...props}
    />;
};

import React from 'react';
import Select from 'react-select';

export default function DropdownMenu({ customStyles, ...props }) {
    const defaultStyles = {
        container: (styles, { isFocused }) => ({
            ...styles,
            width: "12em",
            height: "35px",
            borderRadius: "20px !important",
            cursor: "pointer !important",
        }),
        control: (styles, { isFocused }) => ({
            ...styles,
            boxShadow: "unset !important",
            borderColor: "rgba(1,1,1,0.2) !important",

            backgroundColor: "white",
            width: "100%",
            minHeight: "0px",
            cursor: "pointer !important",
            borderRadius: "5px",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,

                backgroundColor: isSelected ? "#a34791" : "white",
                cursor: "pointer !important",
                "&:hover": {
                    backgroundColor: "rgba(1,1,1,0.1)",
                },
            };
        },
        input: (styles) => ({
            ...styles,
            color: "transparent",
            height: "35px !important",
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


    return <Select styles={mergedStyles} {...props} />;
};


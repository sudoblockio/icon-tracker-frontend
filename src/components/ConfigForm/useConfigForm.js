import { useState } from 'react';

export const useConfigForm = () => {
    const [values, setValues] = useState({
        nid: '',
        apiEndpoint: '',
        rpcEndpoint: '',
    });

    const handleInputChange = (field, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', values);
    };

    return {
        values,
        handleInputChange,
        handleSubmit,
    };
};

import React from 'react';
import { Link } from 'react-router-dom';

const TokenLink = ({ label, to }) => {
    return (
        <Link className="on" to={'/token/' + to}>{label || to}</Link>
    )
}

export default TokenLink;

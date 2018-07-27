import React from 'react';
import { Link } from 'react-router-dom';

const ContractLink = ({ label, to }) => {
    return (
        <Link className="on" to={'/contract/' + to}>{label || to}</Link>
    )
}

export default ContractLink;

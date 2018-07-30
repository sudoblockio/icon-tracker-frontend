import React from 'react';
import { Link } from 'react-router-dom';

const LinkCell = ({ pageType, to, label, aClassName, onClick }) => {
    return (
        <Link
            className={aClassName}
            to={`/${pageType}/${to}`}
            onClick={() => { if (typeof onClick === 'function') { onClick() } }}            
            title={to}
        >
            {label || to}
        </Link>
    )
}

export default LinkCell;

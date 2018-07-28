import React from 'react';
import { Link } from 'react-router-dom';

const LinkToPage = ({ aClassName, to, label, noSpan, spanClassName, onClick, pageType }) => {
    if (noSpan) {
        return (
            <Link
                className={aClassName}
                to={`/${pageType}/${to}`}
                onClick={() => { if (typeof onClick === 'function') { onClick() } }}
            >
                {label || to}
            </Link>
        )
    }
    else {
        return (
            <Link
                className={aClassName}
                to={`/${pageType}/${to}`}
                onClick={() => { if (typeof onClick === 'function') { onClick() } }}
            >
                <span className={spanClassName ? spanClassName : 'ellipsis'}>
                    {label || to}
                </span>
            </Link >
        )
    }
}

export default LinkToPage;

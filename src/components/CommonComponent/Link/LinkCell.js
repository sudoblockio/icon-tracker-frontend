import React from 'react'
import { Link } from 'react-router-dom'

const LinkCell = ({ pageType, to, label, aClassName, onClick, onClickTab }) => {
    function handleOnClick() {
        // This block changes the current tab to the first one (Transaction)
        // tab once the address link is clicked
        if (typeof onClickTab === 'function') {
            onClickTab(0)
        }
        if (typeof onClick === 'function') {
            onClick()
        }
    }
    return (
        <Link className={aClassName} to={`/${pageType}/${to}`} onClick={handleOnClick} title={to}>
            {label || to}
        </Link>
    )
}

export default LinkCell

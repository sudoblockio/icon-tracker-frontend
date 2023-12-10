import React from 'react'
import LinkCell from './LinkCell'

const TokenLink = ({ to, label }) => {
    return <LinkCell pageType="token" aClassName="on" to={to} label={label} />
}

export default TokenLink

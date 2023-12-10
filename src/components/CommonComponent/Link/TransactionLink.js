import React from 'react'
import LinkCell from './LinkCell'

const TransactionLink = ({ to, label, onClick }) => {
    return <LinkCell pageType="transaction" to={to} label={label} onClick={onClick} />
}

export default TransactionLink

import React from 'react';
import LinkCell from './LinkCell'

const TransactionLink = ({  to, label, spanClassName, onClick }) => {
  return (
    <LinkCell
      pageType="transaction"
      to={to}
      label={label}
      spanClassName={spanClassName}
      onClick={onClick}
    />
  )
}

export default TransactionLink;
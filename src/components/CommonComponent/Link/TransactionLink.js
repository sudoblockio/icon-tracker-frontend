import React from 'react';
import LinkToPage from './LinkToPage'

const TransactionLink = ({  to, label, noSpan, spanClassName, onClick }) => {
  return (
    <LinkToPage
      noSpan={noSpan}
      spanClassName={spanClassName}
      to={to}
      label={label}
      pageType="transaction"
      onClick={onClick}
    />
  )
}

export default TransactionLink;
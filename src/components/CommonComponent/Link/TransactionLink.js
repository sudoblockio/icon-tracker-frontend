import React from 'react';
import LinkToPage from './LinkToPage'

const TransactionLink = ({  to, label, noSpan, spanClassName, onClick }) => {
  return (
    <LinkToPage
      pageType="transaction"
      to={to}
      label={label}
      noSpan={noSpan}
      spanClassName={spanClassName}
      onClick={onClick}
    />
  )
}

export default TransactionLink;
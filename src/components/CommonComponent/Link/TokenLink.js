import React from 'react';
import LinkCell from './LinkCell'

const TokenLink = ({ to, label, spanClassName }) => {
  return (
    <LinkCell
      pageType="token"
      aClassName="on"
      to={to}
      label={label}
      spanClassName={spanClassName}
    />
  )
}

export default TokenLink;
import React from 'react';
import LinkToPage from './LinkToPage'

const TokenLink = ({ to, label, noSpan, spanClassName }) => {
  return (
    <LinkToPage
      pageType="token"
      aClassName="on"
      to={to}
      label={label}
      noSpan={noSpan}
      spanClassName={spanClassName}
    />
  )
}

export default TokenLink;
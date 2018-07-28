import React from 'react';
import LinkToPage from './LinkToPage'

const TokenLink = ({ to, label }) => {
  return (
    <LinkToPage
      noSpan
      aClassName="on"
      to={to}
      label={label}
      pageType="token"
    />
  )
}

export default TokenLink;
import React from 'react';
import LinkToPage from './LinkToPage'

const BlockLink = ({ to, label, isEllipsis }) => {
  return (
    <LinkToPage
      pageType="block"
      aClassName={`on ${isEllipsis ? 'ellipsis' : ''}`}
      to={to}
      label={label}
      noSpan
    />
  )
}

export default BlockLink;
import React from 'react';
import LinkToPage from './LinkToPage'

const BlockLink = ({ to, label, isEllipsis }) => {
  return (
    <LinkToPage
      noSpan
      aClassName={`on ${isEllipsis ? 'ellipsis' : ''}`}
      to={to}
      label={label}
      pageType="block"
    />
  )
}

export default BlockLink;
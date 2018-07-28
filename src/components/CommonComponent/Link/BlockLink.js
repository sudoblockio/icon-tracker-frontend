import React from 'react';
import LinkToPage from './LinkToPage'

const BlockLink = ({ to, label, ellipsis }) => {
  return (
    <LinkToPage
      pageType="block"
      aClassName={`on ${ellipsis ? 'ellipsis' : ''}`}
      to={to}
      label={label}
      noSpan
    />
  )
}

export default BlockLink;
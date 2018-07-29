import React from 'react';
import LinkCell from './LinkCell'

const BlockLink = ({ to, label, ellipsis }) => {
  return (
    <LinkCell
      pageType="block"
      aClassName={`on ${ellipsis ? 'ellipsis' : ''}`}
      to={to}
      label={label}
    />
  )
}

export default BlockLink;
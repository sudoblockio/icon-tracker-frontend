import React from 'react';
import { Link } from 'react-router-dom';

const BlockLink = ({to, label = '', isEllipsis}) => {
  return (
    <Link className={`on ${isEllipsis ? 'ellipsis' : ''}`} to={'/block/' + to}>{ label || to }</Link>
  )
}

export default BlockLink;

import React from 'react';
import { Link } from 'react-router-dom';

const BlockLink = ({to, label = ''}) => {
  return (
    <Link className="on" to={'/block/' + to}>{ label || to }</Link>
  )
}

export default BlockLink;

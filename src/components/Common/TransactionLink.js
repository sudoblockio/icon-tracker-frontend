import React from 'react';
import { Link } from 'react-router-dom';

const TransactionLink = ({ to, label = '', spanClass }) => {
  return (
    <Link to={'/transaction/' + to}><span className={spanClass ? spanClass : 'ellipsis'}>{ label || to }</span></Link>
  )
}

export default TransactionLink;

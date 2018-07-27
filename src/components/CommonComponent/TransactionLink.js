import React from 'react';
import { Link } from 'react-router-dom';

const TransactionLink = ({ to, label = '', noSpan, spanClass }) => {
  if (noSpan) {
    return <Link to={`/transaction/${to}`}>{ label || to }</Link>      
  }
  else {
    return <Link to={`/transaction/${to}`}><span className={spanClass ? spanClass : 'ellipsis'}>{ label || to }</span></Link>  
  }
}

export default TransactionLink;

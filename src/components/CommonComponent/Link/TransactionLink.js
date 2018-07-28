import React from 'react';
import { Link } from 'react-router-dom';

const TransactionLink = ({ to, label = '', noSpan, spanClassName, onClick }) => {
  if (noSpan) {
    return <Link onClick={() => {
      if (typeof onClick === 'function') { onClick() }
    }} to={`/transaction/${to}`}>{label || to}</Link>
  }
  else {
    return <Link onClick={() => {
      if (typeof onClick === 'function') { onClick() }
    }} to={`/transaction/${to}`}><span className={spanClassName ? spanClassName : 'ellipsis'}>{label || to}</span></Link>
  }
}

export default TransactionLink;

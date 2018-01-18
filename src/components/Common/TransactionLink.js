import React from 'react';
import { Link } from 'react-router-dom';

// const TransactionLink = ({ to, from = window.location.pathname }) => {
//   return (
//     <Link className="on" to={'/transaction/' + to}>{ to }</Link>
//   )
// }

const TransactionLink = ({ to, label = '' }) => {
  return (
    <Link className="on" to={'/transaction/' + to}>{ label || to }</Link>
  )
}

export default TransactionLink;

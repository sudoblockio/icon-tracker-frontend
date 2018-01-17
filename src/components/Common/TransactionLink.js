import React from 'react';
import { Link } from 'react-router-dom';

const TransactionLink = ({to}) => {
  return (
    <Link className="on" to={'/transaction/' + to}>{ to }</Link>
  )
}

export default TransactionLink;

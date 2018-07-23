import React from 'react';
import { Link } from 'react-router-dom';

const WalletLink = ({to}) => {
  return (
    <Link className="on" to={`/address/${to}`}>{to}</Link>
  )
}

export default WalletLink;

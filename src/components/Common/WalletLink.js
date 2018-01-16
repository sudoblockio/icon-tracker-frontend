import React from 'react';
import { Link } from 'react-router-dom';

const WalletLink = ({to}) => {
  return (
    <Link className="on" to={'/wallet/' + to}>{to}</Link>
  )
}

export default WalletLink;

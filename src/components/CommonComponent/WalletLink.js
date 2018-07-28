import React from 'react';
import { Link } from 'react-router-dom';
import {
  isContractAddress
} from 'utils/utils'

const AddressLink = ({to}) => {
  return (
    <Link className="on" to={`/${isContractAddress(to) ? 'contract' : 'address'}/${to}`}>{to}</Link>
  )
}

export default AddressLink;

import React from 'react';
import LinkCell from './LinkCell'
import {
  isContractAddress
} from 'utils/utils'

const AddressLink = ({to, label, onClick}) => {
  return (
    <LinkCell
      pageType={isContractAddress(to) ? 'contract' : 'address'}
      aClassName="on"
      to={to}
      label={label}
      onClick={onClick}
    />
  )
}

export default AddressLink;

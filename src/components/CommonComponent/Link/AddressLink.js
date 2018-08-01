import React from 'react';
import LinkCell from './LinkCell'
import {
  isContractAddress
} from 'utils/utils'

const AddressLink = ({to, label}) => {
  return (
    <LinkCell
      pageType={isContractAddress(to) ? 'contract' : 'address'}
      aClassName="on"
      to={to}
      label={label}
    />
  )
}

export default AddressLink;

import React from 'react';
import LinkCell from './LinkCell'
import {
  isContractAddress
} from 'utils/utils'

const AddressLink = ({to}) => {
  return (
    <LinkCell
      pageType={isContractAddress(to) ? 'contract' : 'address'}
      aClassName="on"
      to={to}
    />
  )
}

export default AddressLink;

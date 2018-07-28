import React from 'react';
import LinkToPage from './LinkToPage'
import {
  isContractAddress
} from 'utils/utils'

const AddressLink = ({to}) => {
  return (
    <LinkToPage
      noSpan 
      aClassName="on"
      to={to}
      pageType={isContractAddress(to) ? 'contract' : 'address'}
    />
  )
}

export default AddressLink;

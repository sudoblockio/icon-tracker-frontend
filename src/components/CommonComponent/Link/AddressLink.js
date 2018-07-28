import React from 'react';
import LinkToPage from './LinkToPage'
import {
  isContractAddress
} from 'utils/utils'

const AddressLink = ({to}) => {
  return (
    <LinkToPage
      pageType={isContractAddress(to) ? 'contract' : 'address'}
      aClassName="on"
      to={to}
      noSpan 
    />
  )
}

export default AddressLink;

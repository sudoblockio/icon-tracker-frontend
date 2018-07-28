import React from 'react';
import LinkToPage from './LinkToPage'
import {
  isContractAddress
} from '../../../utils/utils'

const WalletLink = ({to}) => {
  return (
    <LinkToPage
      npSpan 
      aClassName="on"
      to={to}
      pageType={isContractAddress(to) ? 'contract' : 'address'}
    />
  )
}

export default WalletLink;

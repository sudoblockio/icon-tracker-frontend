import React from 'react';
import LinkCell from './LinkCell'
import {
  isContractAddress
} from '../../../utils/utils'

const AddressLink = ({to, label, onClick, onClickTab}) => {
  return (
    <LinkCell
      pageType={isContractAddress(to) ? 'contract' : 'address'}
      aClassName="on"
      to={to}
      label={label}
      onClick={onClick}
      onClickTab={onClickTab}
    />
  )
}

export default AddressLink;

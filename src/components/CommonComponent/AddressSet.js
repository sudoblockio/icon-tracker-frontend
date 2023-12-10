import React from 'react'
import { AddressCell } from '../../components'

const SignCell = ({ address, fromAddr, toAddr, targetContractAddr }) => {
    let signItem,
        className = 'table-sign'
    if (fromAddr === address) {
        signItem = <span>OUT</span>
        className += ' out'
    } else if (toAddr === address || address === targetContractAddr) {
        signItem = <span>IN</span>
    } else {
        signItem = <i className="img"></i>
    }
    return <td className={className}>{signItem}</td>
}

const AddressSet = ({ fromAddr, toAddr, address, txType, targetContractAddr }) => {
    return [
        <AddressCell
            key="from"
            targetAddr={fromAddr}
            address={address}
            txType={txType}
            targetContractAddr={targetContractAddr}
            isFrom
        />,
        <SignCell
            key="sign"
            fromAddr={fromAddr}
            toAddr={toAddr}
            address={address}
            targetContractAddr={targetContractAddr}
        />,
        <AddressCell
            key="to"
            targetAddr={toAddr}
            address={address}
            txType={txType}
            targetContractAddr={targetContractAddr}
        />,
    ]
}

export default AddressSet

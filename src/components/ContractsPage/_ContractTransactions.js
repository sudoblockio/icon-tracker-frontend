import React, { Component } from 'react';
import { 
    TxBottom
} from '../../components'
import { 
    TX_TYPE_DATA
 } from '../../utils/const'

class ContractTransactions extends Component {
    render() {
        const { 
            contractTx, 
            goAllTx,
            txType
        } = this.props
        
        const tableClassName = 
            TX_TYPE_DATA[txType] ? 
            TX_TYPE_DATA[txType]['className'] : ''
        const noBoxText = 
            TX_TYPE_DATA[txType] ? 
            TX_TYPE_DATA[txType]['noBoxText'] : ''
        
        return (
            <TxBottom 
                txData={contractTx}
                goAllTx={goAllTx}
                txType={txType}
                address={undefined}
                tableClassName={tableClassName}
                noBoxText={noBoxText}
                totalText='Transactions'
            />        
        )
    }
}

export default ContractTransactions
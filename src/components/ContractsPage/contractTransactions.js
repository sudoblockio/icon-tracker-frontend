import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
        const noDataText = 
            TX_TYPE_DATA[txType] ? 
            TX_TYPE_DATA[txType]['noDataText'] : ''
        
        return (
            <TxBottom 
                txData={contractTx}
                goAllTx={goAllTx}
                txType={txType}
                address={undefined}
                tableClassName={tableClassName}
                noDataText={noDataText}
                totalText='Transactions'
            />        
        )
    }
}

export default withRouter(ContractTransactions);

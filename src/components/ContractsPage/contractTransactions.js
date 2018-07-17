import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { 
    TxBottom
} from '../../components'
import { 
    TX_TYPE,
    TX_TYPE_DATA
 } from '../../utils/const'

class ContractTransactions extends Component {
    render() {
        const { contractTx, goAllTx } = this.props
        const tableClassName = 
            TX_TYPE_DATA[TX_TYPE.CONTRACT_TX] ? 
            TX_TYPE_DATA[TX_TYPE.CONTRACT_TX]['className'] : ''
        const noDataText = 
            TX_TYPE_DATA[TX_TYPE.CONTRACT_TX] ? 
            TX_TYPE_DATA[TX_TYPE.CONTRACT_TX]['noDataText'] : ''
        return (
            <TxBottom 
                txData={contractTx}
                goAllTx={goAllTx}
                txType={TX_TYPE.CONTRACT_TX}
                address={undefined}
                tableClassName={tableClassName}
                noDataText={noDataText}
                totalText='Transactions'
            />        
        )
    }
}

export default withRouter(ContractTransactions);

import React, { Component } from 'react';
import { 
    TxBottom
} from '../../components'
import { 
    TX_TYPE,
    TX_TYPE_DATA
} from '../../utils/const'

class ContractTokenTransfers extends Component {
    render() {
        const { contractTokenTx, goAllTx } = this.props
        const tableClassName = 
            TX_TYPE_DATA[TX_TYPE.CONTRACT_TOKEN_TX] ? 
            TX_TYPE_DATA[TX_TYPE.CONTRACT_TOKEN_TX]['className'] : ''        
        const noBoxText = 
            TX_TYPE_DATA[TX_TYPE.CONTRACT_TOKEN_TX] ? 
            TX_TYPE_DATA[TX_TYPE.CONTRACT_TOKEN_TX]['noBoxText'] : ''
        return (
            <TxBottom 
                txData={contractTokenTx}
                goAllTx={goAllTx}
                txType={TX_TYPE.CONTRACT_TOKEN_TX}
                address={undefined}
                tableClassName={tableClassName}
                noBoxText={noBoxText}
                totalText='Transactions'
            />        
        )
    }
}

export default ContractTokenTransfers;

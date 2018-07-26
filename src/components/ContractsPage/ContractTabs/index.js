import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    TX_TYPE,
    CONTRACT_TABS,
} from '../../../utils/const'
import {
    NoBox,
    ContractTransactions,
    ContractTokenTransfers,
    ContractCode,
    ContractRead,
    ContractEvents,
    TabTable
} from '../../../components'

class ContractTabs extends Component {

    render() {
        const { on, contract, contractTx, contractTokenTx, contractEvents, contractAbi, contractReadInfo } = this.props
        const { loading, data } = contract
        const { address } = data
        return (
            <TabTable
                {...this.props}
                TABS={CONTRACT_TABS}
                on={on}
                loading={loading}
                TableContents={on => {
                    switch (on) {
                        case 0:
                            return (
                                <ContractTransactions 
                                    txData={contractTx}
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.CONTRACT_TX}/${address}`)}} 
                                    txType={TX_TYPE.CONTRACT_TX}
                                    address={address}
                                />
                            )
                        case 1:
                            return (
                                <ContractTokenTransfers 
                                    txData={contractTokenTx}
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.CONTRACT_TOKEN_TX}/${address}`)}} 
                                    txType={TX_TYPE.CONTRACT_TOKEN_TX}
                                    address={address}
                                />
                            )
                        case 2:
                            return (
                                <ContractCode 
                                    contract={contract} 
                                    contractAbi={contractAbi}
                                />
                            )
                        case 3:
                            return (
                                <ContractRead
                                    contract={contract}                            
                                    contractReadInfo={contractReadInfo}
                                    icxCall={this.props.icxCall}
                                />
                            )
                        case 4:
                            return (
                                <ContractEvents
                                    txData={contractEvents}                            
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.CONTRACT_EVENTS}/${address}`)}} 
                                    txType={TX_TYPE.CONTRACT_EVENTS}
                                />
                            )
                        default:
                            return <NoBox text="No Data" />
                    }}
                }
            />
        )
    }
}

export default withRouter(ContractTabs);



import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ContractTransactions from './ContractTransactions'
import ContractInternalTransactions from './ContractInternalTransactions'
import ContractTokenTransfers from './ContractTokenTransfers'
import ContractCode from './ContractCode'
import ContractRead from './ContractRead'
import ContractEvents from './ContractEvents'
import {
    NoBox,
    TabTable
} from 'components'
import {
    TX_TYPE,
    CONTRACT_TABS,
} from 'utils/const'


class ContractTabs extends Component {

    render() {
        const { on, contract, contractTx, contractInternalTx, contractTokenTx, contractEvents, contractAbi, contractReadInfo } = this.props
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
                                <ContractInternalTransactions 
                                    txData={contractInternalTx}
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.CONTRACT_INTERNAL_TX}/${address}`)}} 
                                    txType={TX_TYPE.CONTRACT_INTERNAL_TX}
                                    address={address}
                                />
                            )
                        case 2:
                            return (
                                <ContractTokenTransfers 
                                    txData={contractTokenTx}
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.CONTRACT_TOKEN_TX}/${address}`)}} 
                                    txType={TX_TYPE.CONTRACT_TOKEN_TX}
                                    address={address}
                                />
                            )
                        case 3:
                            return (
                                <ContractCode 
                                    contract={contract} 
                                    contractAbi={contractAbi}
                                />
                            )
                        case 4:
                            return (
                                <ContractRead
                                    contract={contract}                            
                                    contractReadInfo={contractReadInfo}
                                    icxCall={this.props.icxCall}
                                />
                            )
                        case 5:
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



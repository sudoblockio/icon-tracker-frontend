import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    TX_TYPE,
    WALLET_TABS,
} from '../../../utils/const'
import {
    NoBox,
    WalletTransactions,
    WalletTokenTransfers,
    TabTable
} from '../../../components'

class WalletTabs extends Component {

    render() {
        const { on, wallet, walletTx, walletTokenTx } = this.props
        const { loading, data } = wallet
        const { address } = data
        return (
            <TabTable
                {...this.props}
                TABS={WALLET_TABS}
                on={on}
                loading={loading}
                TableContents={on => {
                    switch (on) {
                        case 0:
                            return (
                                <WalletTransactions 
                                    txData={walletTx} 
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.ADDRESS_TX}/${address}`)}} 
                                    txType={TX_TYPE.ADDRESS_TX} 
                                    address={address} 
                                />
                            )
                        case 1:
                            return (
                                <WalletTokenTransfers 
                                    txData={walletTokenTx} 
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.ADDRESS_TOKEN_TX}/${address}`)}} 
                                    txType={TX_TYPE.ADDRESS_TOKEN_TX} 
                                    address={address} 
                                />
                            )
                        default:
                            return <NoBox text="No Data"/>
                    }
                }}
            />
        )
    }
}

export default withRouter(WalletTabs);

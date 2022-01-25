import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AddressTransactions from './AddressTransactions'
import AddressInternalTransactions from './AddressInternalTransactions'
import AddressTokenTransfers from './AddressTokenTransfers'
import AddressDelegation from './AddressDelegation'
import AddressVoted from './AddressVoted'
import AddressReward from './AddressReward'
import AddressBonded from './AddressBonded'
import {
    TX_TYPE,
    ADDRESS_TABS,
} from '../../../../utils/const'
import {
    NoBox,
    TabTable
} from '../../../../components'

class WalletTabs extends Component {
    render() {
        const { on, wallet, walletTx, addressInternalTx, walletTokenTx, addressDelegation, addressVoted, hasDelegations, isPrep, addressReward } = this.props
        const { loading, data } = wallet
        const { public_key, tokenList, transaction_count, iscore, internalTxCount, is_prep, claimIScoreCount, log_count } = data
        

        console.log(this.props, "wallet tabs data")

        const TABS = []
        TABS.push(ADDRESS_TABS[0])
        if (log_count && Number(log_count) !== 0) {
            TABS.push(ADDRESS_TABS[1])
        }
        if (data !== 0) {
            TABS.push(ADDRESS_TABS[2])
        }
        if (hasDelegations) {
            TABS.push(ADDRESS_TABS[3])
        }
        if (is_prep) {
            TABS.push(ADDRESS_TABS[6])
            TABS.push(ADDRESS_TABS[4])
        }
        if (data) {
            TABS.push(ADDRESS_TABS[5])
        }

            

        return (
            <TabTable
                {...this.props}
                
                TABS={TABS}
                on={on}
                loading={loading}
                TableContents={on => {
                    switch (TABS[on]) {
                        case ADDRESS_TABS[0]:
                            return (
                                <AddressTransactions
                                    txData={walletTx}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.ADDRESS_TX}/${public_key}`) }}
                                    txType={TX_TYPE.ADDRESS_TX}
                                    address={public_key}
                                />
                            )
                        case ADDRESS_TABS[1]:
                            return (
                                <AddressInternalTransactions
                                    txData={addressInternalTx}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.ADDRESS_INTERNAL_TX}/${public_key}`) }}
                                    txType={TX_TYPE.ADDRESS_INTERNAL_TX}
                                    address={public_key}
                                />
                            )
                        case ADDRESS_TABS[2]:
                            return (
                                <AddressTokenTransfers
                                    txData={walletTokenTx}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.ADDRESS_TOKEN_TX}/${public_key}`) }}
                                    txType={TX_TYPE.ADDRESS_TOKEN_TX}
                                    address={public_key}
                                />
                            )
                        case ADDRESS_TABS[3]:
                            return (
                                <AddressDelegation
                                    txData={addressDelegation}
                                    txType={TX_TYPE.ADDRESS_DELEGATION}
                                    address={public_key}
                                />
                            )
                        case ADDRESS_TABS[4]:

                            return (
                                <AddressVoted
                                    txData={addressVoted}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.ADDRESS_VOTED}/${public_key}`) }}
                                    txType={TX_TYPE.ADDRESS_VOTED}
                                    address={public_key}
                                />
                            )
                        case ADDRESS_TABS[5]:
                            return (
                                <AddressReward
                                    txData={addressReward}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.ADDRESS_REWARD}/${public_key}`) }}
                                    txType={TX_TYPE.ADDRESS_REWARD}
                                    address={public_key}
                                />
                            )
                            case ADDRESS_TABS[6]:
                                return (
                                    <AddressBonded
                                        txData={addressReward}
                                        goAllTx={() => { this.props.history.push(`/${TX_TYPE.ADDRESS_REWARD}/${public_key}`) }}
                                        txType={TX_TYPE.ADDRESS_BONDED}
                                        address={public_key}
                                    />
                                )
                        default:
                            return <NoBox text="No Data" />
                    }
                }}
            />
        )
    }
}

export default withRouter(WalletTabs);

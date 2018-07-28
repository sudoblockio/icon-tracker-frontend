import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TokenTransfers from './TokenTransfers'
import TokenHolders from './TokenHolders'
import TokenContractRead from './TokenContractRead'
import {
    NoBox,
    TabTable
} from 'components'
import {
    TX_TYPE,
    TOKEN_TABS,
} from 'utils/const'

class TokenTabs extends Component {

    render() {
        const { on, token, tokenTransfers, tokenHolders, contractReadInfo } = this.props
        const { loading, data } = token
        const { contract } = data
        return (
            <TabTable
                {...this.props}
                TABS={TOKEN_TABS}
                on={on}
                loading={loading}
                TableContents={on => {
                    switch (on) {
                        case 0:
                            return (
                                <TokenTransfers
                                    txData={tokenTransfers}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.TOKEN_TX}/${contract}`) }}
                                    txType={TX_TYPE.TOKEN_TX}
                                />
                            )
                        case 1:
                            return (
                                <TokenHolders
                                    txData={tokenHolders}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.TOKEN_TX}/${contract}`) }}
                                    txType={TX_TYPE.TOKEN_HOLDERS}
                                />
                            )
                        case 2:
                            return (
                                <TokenContractRead
                                    contract={{ data: { address: contract } }}
                                    contractReadInfo={contractReadInfo}
                                    icxCall={this.props.icxCall}
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

export default withRouter(TokenTabs);
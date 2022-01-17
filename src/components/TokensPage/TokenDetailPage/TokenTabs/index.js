import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TokenTransfers from './TokenTransfers'
import TokenHolders from './TokenHolders'
import TokenContractRead from './TokenContractRead'
import {
    NoBox,
    TabTable
} from '../../../../components'
import {
    TX_TYPE,
    TOKEN_TABS,
} from '../../../../utils/const'
import {getTokenTotalSupply} from '../../../../redux/store/iiss'

class TokenTabs extends Component {
    total = async () => {
        const res = await getTokenTotalSupply(this.props.match.params.tokenId)
        return res;
    }
    render() {
        const { on, token, tokenTransfers, tokenHolders, contractReadInfo } = this.props
        const { loading, data } = token
        const { contract } = data
        this.theTokenTotal = this.total()        
        this.theTokenTotal.then(result => this.tokenTotalSupply = result).catch(error => console.log(error, "the promise error"))
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
                            {console.log(this.tokenTotalSupply, "this token's total")}
                            const tokenTotal = this.tokenTotalSupply
                            return (
                                <TokenHolders
                                    txData={tokenHolders}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.TOKEN_HOLDERS}/${contract}`) }}
                                    txType={TX_TYPE.TOKEN_HOLDERS}
                                    tokenTotal={tokenTotal}
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
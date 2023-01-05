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
import {getTokenDecimals, getTokenTotalSupply} from '../../../../redux/store/iiss'
// import {tokenHoldersList, tokenTransfersList} from "../../../../redux/api/restV3";

class TokenTabs extends Component {

    async componentDidMount(){
        // this.transferCount = await tokenTransfersList({contractAddr: this.props.match.params.tokenId})
        // this.holdersCount = await tokenHoldersList({contractAddr: this.props.match.params.tokenId})
        // this.transferCount = this.transferCount.headers["x-total-count"]
        // this.holdersCount = this.holdersCount.headers["x-total-count"]
        // this.setState({hC: this.holdersCount})
        this.tokenDecimals = await getTokenDecimals(this.props.match.params.tokenId)
        this.tokenTotalSupply = await getTokenTotalSupply(this.props.match.params.tokenId) / Math.pow(10, this.tokenDecimals)
    }

    render() {
        const { on, token, tokenTransfers, tokenHolders, contractReadInfo } = this.props
        const { loading, data } = token
        const { address } = data
        return (
            <TabTable
                {...this.props}
                onClickTab={this.props.changeTab}
                TABS={TOKEN_TABS}
                on={on}
                loading={loading}
                TableContents={on => {
                    switch (on) {
                        case 0:
                            return (
                                <TokenTransfers
                                    txData={tokenTransfers}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.TOKEN_TX}/${address}`) }}
                                    txType={TX_TYPE.TOKEN_TX}
                                />
                            )
                        case 1:
                            const tokenTotal = this.tokenTotalSupply
                            return (
                                <TokenHolders
                                    txData={tokenHolders}
                                    goAllTx={() => { this.props.history.push(`/${TX_TYPE.TOKEN_HOLDERS}/${address}`) }}
                                    txType={TX_TYPE.TOKEN_HOLDERS}
                                    tokenTotal={tokenTotal}
                                />
                            )
                        case 2:
                            return (
                                <TokenContractRead
                                    contract={{ data: { address } }}
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
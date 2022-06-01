import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BlockTransactions from './BlockTransactions'
import {
    TX_TYPE,
    BLOCK_TABS,
} from '../../../../utils/const'
import {
    NoBox,
    TabTable
} from '../../../../components'
import TransactionInternalTransactions
    from "../../../TransactionsPage/TransactionDetailPage/TransactionTabs/TransactionInternalTransactions";

class BlockTabs extends Component {

    render() {
        const { on, block, blockTx } = this.props
        console.log(this.props, "tx detail props")
        const { loading, data } = block
        console.log(block, "tx detail data")
        const { number } = data
        return (
            <TabTable
                {...this.props}
                TABS={BLOCK_TABS}
                on={on}
                loading={loading}
                TableContents={on => {
                    switch (on) {
                        case 0:
                            return (
                                <BlockTransactions
                                    txData={blockTx}
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.BLOCK_TX}/${number}`)}}
                                    txType={TX_TYPE.BLOCK_TX}
                                />
                            )
                        case 1:
                            return (
                                <TransactionInternalTransactions
                                    txData={blockTx}
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.TRANSACTION_INTERNAL_TX}/${number}`)}}
                                    txType={TX_TYPE.TRANSACTION_INTERNAL_TX}
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

export default withRouter(BlockTabs);


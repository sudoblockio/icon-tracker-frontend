import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BlockTransactions from './BlockTransactions'
import {
    TX_TYPE,
    BLOCK_TABS,
} from 'utils/const'
import {
    NoBox,
    TabTable
} from 'components'

class BlockTabs extends Component {

    render() {
        const { on, block, blockTx } = this.props
        const { loading, data } = block
        const { height } = data
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
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.BLOCK_TX}/${height}`)}} 
                                    txType={TX_TYPE.BLOCK_TX} 
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


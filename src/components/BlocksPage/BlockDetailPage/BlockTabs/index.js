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

class BlockTabs extends Component {

    render() {
        const { on, block, blockTx, blockIntTx } = this.props
        console.log(this.props, "tx detail props")
        const { loading, data } = block
        console.log(block, "tx detail data")
        const { number } = data
        let BlockTabs = BLOCK_TABS;
        if(blockIntTx && blockIntTx.data && blockIntTx.data.length === 0) {
            BlockTabs = [BlockTabs[0]];
        }
        return (
            <TabTable
                {...this.props}
                TABS={BlockTabs}
                onClickTab={this.props.changeTab}
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
                                <BlockTransactions 
                                    txData={blockIntTx} 
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.BLOCK_INTTX}/${number}`)}} 
                                    txType={TX_TYPE.BLOCK_INTTX} 
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


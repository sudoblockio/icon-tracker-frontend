import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    TX_TYPE,
    BLOCK_TABS,
} from '../../utils/const'
import {
    LoadingComponent,
    NoBox,
    BlockTransactions,
} from '../../components'

class BlockTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: this.props.initialTab || 0
        }
    }

    setTab = (index) => {
        const { block } = this.props
        const { data } = block
        const { height } = data
        this.setState({ on: index }, () => {
            switch (index) {
                case 0:
                    this.props.blockTxList({ height, page: 1, count: 10 })
                    break
                default:
            }
        })
    }

    goAllTx = () => {
        const { on } = this.state
        const { block } = this.props
        const { data } = block
        const { height } = data
        switch (on) {
            case 0:
                this.props.history.push(`/${TX_TYPE.BLOCK_TX}/${height}`);
                break
            default:
        }
    }

    render() {
        const { on } = this.state
        const { block, blockTx } = this.props
        const { loading } = block
        
        const TableContents = () => {
            switch (on) {
                case 0:
                    return (
                        <BlockTransactions
                            txData={blockTx} 
                            goAllTx={this.goAllTx} 
                            txType={TX_TYPE.BLOCK_TX} 
                        />
                    )
                default:
                    return <NoBox text="No Data" />
            }
        }
        const Contents = () => {
            if (loading) {
                return (
                    <LoadingComponent height='513px' />
                )
            }
            else {
                return (
                    <div className="screen1">
                        <div className="wrap-holder">
                            <div className="tab-holder">
                                <ul>
                                    {
                                        BLOCK_TABS.map((tab, index) => (
                                            <li key={index} className={on === index ? 'on' : ''} onClick={() => { this.setTab(index) }}>{tab}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {TableContents()}
                        </div>
                    </div>
                )
            }
        }
        return Contents()
    }
}

export default withRouter(BlockTabs);

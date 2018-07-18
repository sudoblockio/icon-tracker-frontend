import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    TX_TYPE,
    WALLET_TABS,
} from '../../utils/const'
import {
    LoadingComponent,
    NoBox,
    WalletTransactions,
    WalletTokenTransfers,
} from '../../components'

class WalletTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: 0
        }
    }

    setTab = (index) => {
        const { wallet } = this.props
        const { data } = wallet
        const { address } = data
        this.setState({ on: index }, () => {
            switch (index) {
                case 0:
                    this.props.addressTxList({ address, page: 1, count: 10 })
                    break
                case 1:
                    this.props.addressTokenTxList({ address, page: 1, count: 10 })
                    break
                default:
            }
        })
    }

    goAllTx = () => {
        const { on } = this.state
        const { wallet } = this.props
        const { data } = wallet
        const { address } = data
        switch (on) {
            case 0:
                this.props.history.push(`/${TX_TYPE.ADDRESS_TX}/${address}`);
                break
            case 1:
                this.props.history.push(`/${TX_TYPE.ADDRESS_TOKEN_TX}/${address}`);
                break
            default:
        }
    }

    render() {
        const { on } = this.state
        const { wallet, walletTx, walletTokenTx } = this.props
        const { loading, data } = wallet
        const { address } = data
        
        const TableContents = () => {
            switch (on) {
                case 0:
                    return (
                        <WalletTransactions 
                            txData={walletTx} 
                            goAllTx={this.goAllTx} 
                            txType={TX_TYPE.ADDRESS_TX} 
                            address={address} 
                        />
                    )
                case 1:
                    return (
                        <WalletTokenTransfers 
                            txData={walletTokenTx} 
                            goAllTx={this.goAllTx} 
                            txType={TX_TYPE.ADDRESS_TOKEN_TX} 
                            address={address} 
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
                                        WALLET_TABS.map((tab, index) => (
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

export default withRouter(WalletTabs);

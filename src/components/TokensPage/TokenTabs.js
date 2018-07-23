import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    TX_TYPE,
    TOKEN_TABS
} from '../../utils/const'
import {
    LoadingComponent,
    TokenTransfers,
    TokenHolders,
    NoBox,
    ContractRead
} from '../../components'

class TokenTabs extends Component {

    goAllTx = () => {
        const { on, token } = this.props
        const { data } = token
        const { contract } = data
        switch (on) {
            case 0:
                this.props.history.push(`/${TX_TYPE.TOKEN_TX}/${contract}`);
                break
            case 1:
                this.props.history.push(`/${TX_TYPE.TOKEN_HOLDERS}/${contract}`);
                break
            case 2:
            default:
        }
    }

    render() {
        const { on, token, tokenTransfers, tokenHolders, contractReadInfo } = this.props
        const { loading, data } = token
        const { contract } = data

        const TableContents = () => {
            switch (on) {
                case 0:
                    return (
                        <TokenTransfers
                            txData={tokenTransfers}
                            goAllTx={this.goAllTx}
                            txType={TX_TYPE.TOKEN_TX}
                        />
                    )
                case 1:
                    return (
                        <TokenHolders
                            txData={tokenHolders}
                            goAllTx={this.goAllTx}
                            txType={TX_TYPE.TOKEN_HOLDERS}
                        />
                    )
                case 2:
                    return (
                        <ContractRead
                            contract={{ data: { address: contract } }}
                            contractReadInfo={contractReadInfo}
                            icxCall={this.props.icxCall}
                        />
                    )
                default:
                    return <NoBox text="No Data" />
            }
        }
        const Contents = () => {
            if (loading) {
                return <LoadingComponent height='513px'/>
            }
            else {
                return (
                    <div className="screen1">
                        <div className="wrap-holder">
                            <div className="tab-holder">
                                <ul>
                                    {
                                        TOKEN_TABS.map((tab, index) => (
                                            <li key={index} className={on === index ? 'on' : ''} onClick={() => { this.props.setTab(index) }}>{tab}</li>
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

export default withRouter(TokenTabs);

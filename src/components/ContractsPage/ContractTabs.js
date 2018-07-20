import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    LoadingComponent,
    NoBox,
    ContractTransactions,
    ContractTokenTransfers,
    ContractCode,
    ContractRead
} from '../../components'
import {
    TX_TYPE,
    CONTRACT_TABS,
} from '../../utils/const'

class ContractTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: 0
        }
    }

    setTab = (index) => {
        const { contract } = this.props
        const { data } = contract
        const { address } = data
        const addr = address
        this.setState({ on: index }, () => {
            switch (index) {
                case 0:
                    this.props.contractTxList({ addr, page: 1, count: 10 })
                    break
                case 1:
                    this.props.contractTokenTxList({ addr, page: 1, count: 10 })
                    break
                case 2:
                    this.props.icxGetScore({ address })
                    break
                case 3:
                    this.props.readContractInformation({ address })
                    break
                case 4:
                default:
            }
        })
    }

    goAllTx = () => {
        const { on } = this.state
        const { contract } = this.props
        const { data } = contract
        const { address } = data
        switch (on) {
            case 0:
                this.props.history.push(`/${TX_TYPE.CONTRACT_TX}/${address}`);
                break
            case 1:
                this.props.history.push(`/${TX_TYPE.CONTRACT_TOKEN_TX}/${address}`);
                break
            case 2:
            case 3:
            case 4:
            default:
        }
    }

    render() {
        const { on } = this.state
        const { contract, contractTx, contractTokenTx, contractAbi, contractReadInfo } = this.props
        const { loading } = contract

        const TableContents = () => {
            switch (on) {
                case 0:
                    return (
                        <ContractTransactions 
                            txData={contractTx}
                            goAllTx={this.goAllTx} 
                            txType={TX_TYPE.CONTRACT_TX}
                        />
                    )
                case 1:
                    return (
                        <ContractTokenTransfers 
                            txData={contractTokenTx}
                            goAllTx={this.goAllTx} 
                            txType={TX_TYPE.CONTRACT_TOKEN_TX}
                        />
                    )
                case 2:
                    return (
                        <ContractCode 
                            contract={contract} 
                            contractAbi={contractAbi}
                        />
                    )
                case 3:
                    return (
                        <ContractRead 
                            contractReadInfo={contractReadInfo}
                        />
                    )
                case 4:
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
                                        CONTRACT_TABS.map((tab, index) => (
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

export default withRouter(ContractTabs);

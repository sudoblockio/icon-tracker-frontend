import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    LoadingComponent,
    NoBox,
    ContractTransactions,
    ContractTokenTransfers,
    ContractCode,
    ContractRead,
    ContractEvents
} from '../../../components'
import {
    TX_TYPE,
    CONTRACT_TABS,
} from '../../../utils/const'

class ContractTabs extends Component {

    goAllTx = () => {
        const { on, contract } = this.props
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
                break
            case 3:
                break
            case 4:
                this.props.history.push(`/${TX_TYPE.CONTRACT_EVENTS}/${address}`);
                break
            default:
        }
    }

    render() {
        const { on, contract, contractTx, contractTokenTx, contractEvents, contractAbi, contractReadInfo } = this.props
        const { loading, data } = contract
        const { address } = data

        const TableContents = () => {
            switch (on) {
                case 0:
                    return (
                        <ContractTransactions 
                            txData={contractTx}
                            goAllTx={this.goAllTx} 
                            txType={TX_TYPE.CONTRACT_TX}
                            address={address}
                        />
                    )
                case 1:
                    return (
                        <ContractTokenTransfers 
                            txData={contractTokenTx}
                            goAllTx={this.goAllTx} 
                            txType={TX_TYPE.CONTRACT_TOKEN_TX}
                            address={address}
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
                            contract={contract}                            
                            contractReadInfo={contractReadInfo}
                            icxCall={this.props.icxCall}
                        />
                    )
                case 4:
                    return (
                        <ContractEvents
                            txData={contractEvents}                            
                            goAllTx={this.goAllTx} 
                            txType={TX_TYPE.CONTRACT_EVENTS}
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
                                        CONTRACT_TABS.map((tab, index) => (
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

export default withRouter(ContractTabs);

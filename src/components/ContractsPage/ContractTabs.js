import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { 
    LoadingComponent, 
    NoBox
} from '../../components'
import { TX_TYPE } from '../../utils/const'

const Tabs = ['Transactions', 'Token Transfers', 'Code', 'Read Contract', 'Events']

class ContractTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: 0
        }
    }

    setTab = (index) => {
        const { addr } = this.props
        this.setState({ on: index }, () => {
            switch (index) {
                case 0:
                    this.props.selectContractTransactionList({ addr, page: 1, count: 10 })
                    break
                case 1:
                    this.props.selectContractTokenTransferList({ addr, page: 1, count: 10 })
                    break
                case 2:                                
                case 3:                                
                case 4:                                
                default:       
            }
            
        })
    }

    goAllTx = () => {
        const { on } = this.state
        const { addr } = this.props
        switch (on) {
            case 0:
                this.props.history.push(`/${TX_TYPE.CONTRACT_TX}/${addr}`);
                break
            case 1:
                this.props.history.push(`/${TX_TYPE.CONTRACT_TOKEN_TX}/${addr}`);
                break
            case 2:
            case 3:                                
            case 4:                                
            default:
        }
    }

    render() {
        const { on } = this.state
        const { loading, contractTx, contractTokenTx } = this.props

        const TableContents = (_on) => {
            switch(_on) {
                case 0:
                    // return <TokenTransfers contractTx={contractTx} goAllTx={this.goAllTx}/>
                case 1:
                    // return <TokenHolders contractTokenTx={contractTokenTx} goAllTx={this.goAllTx}/>
                case 2:                                
                case 3:                                
                case 4:                                
                default:
                    return <NoBox text="No Data"/>
            }
        }

        return (
            <div className="screen1">
            {
                loading ?
                <LoadingComponent height='513px'/>
                :
                <div className="wrap-holder">
                    <div className="tab-holder">
                        <ul>
                        {
                            Tabs.map((tab, index) => (
                                <li key={index} className={on === index ? 'on' : ''} 
                                    onClick={() => {this.setTab(index)}}
                                >
                                    {tab}
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                    {TableContents(on)}
                </div>
            }        
            </div>
        )
    }
}

export default withRouter(ContractTabs);

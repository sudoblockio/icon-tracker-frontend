import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { 
    LoadingComponent, 
    TokenTransfers,
    TokenHolders,
    NoBox
} from '../../components'
import { TX_TYPE } from '../../utils/const'

const Tabs = ['Token Transfer', 'Token Holders', 'Read Contract']

class TokenTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: 0
        }
    }

    setTab = (index) => {
        const { contractAddr } = this.props
        this.setState({ on: index }, () => {
            switch (index) {
                case 0:
                    this.props.tokenGetTokenTransfers({ contractAddr, page: 1, count: 10 })
                    break
                case 1:
                    this.props.tokenGetTokenHolders({ contractAddr, page: 1, count: 10 })
                    break
                case 2:                                
                default:       
            }
            
        })
    }

    goAllTx = () => {
        const { on } = this.state
        const { contractAddr } = this.props
        switch (on) {
            case 0:
                this.props.history.push(`/${TX_TYPE.TOKEN_TX}/${contractAddr}`);
                break
            case 1:
                this.props.history.push(`/${TX_TYPE.TOKEN_HOLDERS}/${contractAddr}`);
                break
            case 2:                                
            default:
        }
    }

    render() {
        const { on } = this.state
        const { loading, tokenTransfers, tokenHolders } = this.props

        const TableContents = (_on) => {
            switch(_on) {
                case 0:
                    return <TokenTransfers tokenTransfers={tokenTransfers} goAllTx={this.goAllTx}/>
                case 1:
                    return <TokenHolders tokenHolders={tokenHolders} goAllTx={this.goAllTx}/>
                case 2:                                
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

export default withRouter(TokenTabs);

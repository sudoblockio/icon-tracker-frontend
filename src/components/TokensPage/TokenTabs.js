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
    NoBox
} from '../../components'

class TokenTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: 0
        }
    }

    setTab = (index) => {
        const { token } = this.props
        const { data } = token
        const { contract } = data
        const contractAddr = contract
        this.setState({ on: index }, () => {
            switch (index) {
                case 0:
                    this.props.tokenTransfersList({ contractAddr, page: 1, count: 10 })
                    break
                case 1:
                    this.props.tokenHoldersList({ contractAddr, page: 1, count: 10 })
                    break
                case 2:                                
                default:       
            }
            
        })
    }

    // TODO 컴포넌트 안으로
    goAllTx = () => {
        const { on } = this.state
        const { token } = this.props
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
        const { on } = this.state
        const { token, tokenTransfers, tokenHolders } = this.props
        const { loading } = token

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
                                        TOKEN_TABS.map((tab, index) => (
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

export default withRouter(TokenTabs);

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SearchBox } from '../../components'
import { Connect } from '../../components'
import { withRouter } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <div className="header-wrap">
                <div className="wrap-holder">
                    <div className="content">
                        <Link to="/">
                            <span className="logo" />
                        </Link>
                        <div className="link">
                            <ul>
                                <li>
                                    <span>
                                        Address
                                        <em className="img" />
                                    </span>
                                    <ol className="sub-menu">
                                        <li
                                            onClick={() => {
                                                this.props.history.push('/addresses')
                                            }}>
                                            <span>Addresses List</span>
                                        </li>
                                        <li
                                            onClick={() => {
                                                this.props.history.push('/contracts')
                                            }}>
                                            <span>Contracts List</span>
                                        </li>
                                    </ol>
                                </li>
                                <li
                                    onClick={() => {
                                        this.props.history.push('/blocks')
                                    }}>
                                    <span>Block</span>
                                </li>
                                <li
                                    onClick={() => {
                                        this.props.history.push('/transactions')
                                    }}>
                                    <span>Transaction</span>
                                </li>
                                <li>
                                    <span>
                                        Token
                                        <em className="img" />
                                    </span>
                                    <ol className="sub-menu">
                                        <li
                                            onClick={() => {
                                                this.props.history.push('/tokens')
                                            }}>
                                            <span>Tokens List</span>
                                        </li>
                                        <li
                                            onClick={() => {
                                                this.props.history.push('/tokentransfers')
                                            }}>
                                            <span>Token Transfers List</span>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <span>
                                        Governance
                                        <em className="img" />
                                    </span>
                                    <ol className="sub-menu">
                                        <li
                                            onClick={() => {
                                                this.props.history.push('/governance')
                                            }}>
                                            <span>P-Rep List</span>
                                        </li>
                                        <li
                                            onClick={() => {
                                                this.props.history.push('/proposal-list')
                                            }}>
                                            <span>Network Proposal</span>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <span>
                                        Tools
                                        <em className="img" />
                                    </span>
                                    <ol className="sub-menu">
                                        <li className="sub-sub-menu-toggle">
                                            <span>API Docs</span>
                                            <ol className="sub-menu sub-sub-menu">
                                                <li
                                                    onClick={() => {
                                                        window.open(
                                                            'https://tracker.icon.community/api/v1/docs/index.html'
                                                        )
                                                    }}>
                                                    <span>Main</span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        window.open(
                                                            'https://tracker.icon.community/api/v1/governance/docs'
                                                        )
                                                    }}>
                                                    <span>Governance</span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        window.open(
                                                            'https://tracker.icon.community/api/v1/contracts/docs'
                                                        )
                                                    }}>
                                                    <span>Contracts</span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        window.open(
                                                            'https://tracker.icon.community/api/v1/statistics/docs'
                                                        )
                                                    }}>
                                                    <span>Stats</span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        window.open(
                                                            'https://balanced.icon.community/api/v1/docs'
                                                        )
                                                    }}>
                                                    <span>Balanced</span>
                                                </li>
                                            </ol>
                                        </li>
                                        <li
                                            onClick={() => {
                                                this.props.history.push('/contracts/tool')
                                            }}>
                                            <span>Contracts</span>
                                        </li>
                                        <li
                                            onClick={() => {
                                                window.open(
                                                    // TODO: Update for testnets
                                                    // mainnet -> https://xcallscan.xyz/
                                                    // berlin -> https://testnet.xcallscan.xyz/
                                                    // lisbon -> Greyed out
                                                    'https://xcallscan.xyz/',
                                                    '_blank'
                                                )
                                            }}>
                                            <span>BTP Explorer</span>
                                        </li>
                                        <li className="sub-sub-menu-toggle">
                                            <span>Monitors</span>
                                            <ol className="sub-menu sub-sub-menu">
                                                <li
                                                    // TODO: Update for testnets
                                                    // mainnet -> ?
                                                    // berlin -> https://testnet.btp2.24x365.online/
                                                    // lisbon -> Greyed out
                                                    onClick={() => {
                                                        window.open(
                                                            'https://testnet.btp2.24x365.online/',
                                                        )
                                                    }}>
                                                    <span>BTP</span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        // TODO: Grey out for both lisbon and berlin
                                                        window.open(
                                                            'https://icon2.mon.solidwallet.io/',
                                                        )
                                                    }}>
                                                    <span>Validators</span>
                                                </li>
                                                <li>
                                                    <span>Metrics (Coming)</span>
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <span>Stats (Coming)</span>
                                        </li>
                                        <li>
                                            <span>Explorer (Coming)</span>
                                        </li>
                                    </ol>
                                </li>
                            </ul>
                            <div className="link-right">
                                <SearchBox {...this.props} />
                                <Connect {...this.props} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SearchBox } from '../../components'
import { Connect } from '../../components'
import { withRouter } from 'react-router-dom'

import config from '../../config'
import clsx from 'clsx'

class Header extends Component {
    state = {
        isHiddenApiDocs: true,
        isHiddenMonitors: true,
    }

    handleHoverSubmenu(submenu) {
        const key = submenu === 'docs' ? 'isHiddenApiDocs' : 'isHiddenMonitors'
        const counterKey = submenu === 'docs' ? 'isHiddenMonitors' : 'isHiddenApiDocs'
        this.setState((prev) => ({ ...prev, [key]: false, [counterKey]: true }))
    }

    render() {
        const { network } = config

        function getBTPExplorer() {
            switch (network.toLowerCase()) {
                case 'lisbon':
                    return { isLocked: true, link: null }
                case 'berlin':
                    return { isLocked: true, link: 'https://testnet.xcallscan.xyz/' }
                case 'mainnet':
                    return { isLocked: false, link: 'https://xcallscan.xyz/' }
                default:
                    return { isLocked: true, link: null }
            }
        }
        const { isLocked: isBtpLocked, link: btpLink } = getBTPExplorer()

        function getMonitorsBtp() {
            switch (network.toLowerCase()) {
                case 'lisbon':
                    return { isLocked: true, link: null }
                case 'berlin':
                    return { isLocked: false, link: 'https://testnet.btp2.24x365.online/' }
                case 'mainnet':
                    return { isLocked: false, link: 'https://btp-mainnet-monitor.icon.community/' }
                default:
                    return { isLocked: true, link: null }
            }
        }
        const { isLocked: isMonitorBtpLocked, link: monitorBtpLink } = getMonitorsBtp()

        function getMonitorsValidator() {
            switch (network.toLowerCase()) {
                case 'lisbon':
                    return { isLocked: true, link: null }
                case 'berlin':
                    return { isLocked: true, link: null }
                case 'mainnet':
                    return { isLocked: false, link: 'https://icon2.mon.solidwallet.io/' }
                default:
                    return { isLocked: true, link: null }
            }
        }
        const { isLocked: isMonitorValidatorLocked, link: monitorValidatorLink } =
            getMonitorsValidator()
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
                                        <li
                                            onClick={() => {
                                                this.props.history.push('/contracts/tool')
                                            }}>
                                            <span>Contracts</span>
                                        </li>
                                        <li
                                            className={clsx(isBtpLocked && 'sub-sub-menu-locked')}
                                            onClick={() => {
                                                window.open(btpLink)
                                            }}>
                                            <span>GMP Tracker</span>
                                        </li>
                                        <li
                                            onMouseEnter={() => {
                                                this.handleHoverSubmenu('docs')
                                            }}
                                            className="sub-sub-menu-toggle">
                                            <span>API Docs</span>
                                            <ol
                                                style={{
                                                    visibility: this.state.isHiddenApiDocs
                                                        ? 'hidden'
                                                        : 'visible',
                                                }}
                                                className="sub-menu sub-sub-menu">
                                                <li
                                                    onClick={() => {
                                                        window.open(
                                                            `${config.apiEndpoint}/api/v1/docs/index.html`
                                                        )
                                                    }}>
                                                    <span>Main</span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        window.open(
                                                            `${config.apiEndpoint}/api/v1/governance/docs`
                                                        )
                                                    }}>
                                                    <span>Governance</span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        window.open(
                                                            `${config.apiEndpoint}/api/v1/contracts/docs`
                                                        )
                                                    }}>
                                                    <span>Contracts</span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        window.open(
                                                            `${config.apiEndpoint}/api/v1/statistics/docs`
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
                                            onMouseEnter={() => {
                                                this.handleHoverSubmenu('monitor')
                                            }}
                                            className="sub-sub-menu-toggle">
                                            <span>Monitors</span>
                                            <ol
                                                style={{
                                                    visibility: this.state.isHiddenMonitors
                                                        ? 'hidden'
                                                        : 'visible',
                                                }}
                                                className="sub-menu sub-sub-menu">
                                                <li
                                                    className={clsx(
                                                        isMonitorBtpLocked && 'sub-sub-menu-locked'
                                                    )}
                                                    onClick={() => {
                                                        window.open(monitorBtpLink)
                                                    }}>
                                                    <span>BTP</span>
                                                </li>
                                                <li
                                                    className={clsx(
                                                        isMonitorValidatorLocked &&
                                                        'sub-sub-menu-locked'
                                                    )}
                                                    onClick={() => {
                                                        window.open(monitorValidatorLink)
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

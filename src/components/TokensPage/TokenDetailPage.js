import React, { Component } from 'react';
import {
    startsWith,
    findTabIndex
} from '../../utils/utils'
import {
    TOKEN_TABS
} from '../../utils/const'
import {
    NotFound,
    TokenSummary,
    TokenTabs
} from '../../components'

class TokenDetailPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            on: 0
        }
    }

    componentWillMount() {
        const { pathname, hash } = this.props.url
        this.setState({ on: findTabIndex(TOKEN_TABS, hash) },
            () => {
                this.allDetailInfo(pathname)
            }
        )
    }

    componentWillReceiveProps(nextProps) {
        const { pathname: current } = this.props.url
        const { pathname: next } = nextProps.url
        if (current !== next && startsWith(next, '/token')) {
            this.allDetailInfo(next)
        }
    }

    allDetailInfo = (pathname) => {
        const contractAddr = pathname.split("/")[2]
        if (contractAddr) {
            this.props.tokenSummary({ contractAddr })
            this.setTab(this.state.on)
        }
    }

    setTab = (index) => {
        const { pathname } = this.props.url
        const contractAddr = pathname.split("/")[2]
        const address = contractAddr
        this.setState({ on: index }, () => {
            switch (index) {
                case 0:
                    this.props.tokenTransfersList({ contractAddr, page: 1, count: 10 })
                    break
                case 1:
                    this.props.tokenHoldersList({ contractAddr, page: 1, count: 10 })
                    break
                case 2:
                    this.props.readContractInformation({ address })
                    break
                default:
            }
        })
    }

    render() {
        const { token } = this.props;
        const { loading, error } = token

        const Content = () => {
            if (!loading && error) {
                return (
                    <NotFound error={error} />
                )
            }
            else {
                return (
                    <div className="content-wrap">
                        <TokenSummary token={token} />
                        <TokenTabs {...this.props} {...this.state} setTab={this.setTab} />
                    </div>
                )
            }
        }

        return Content();
    }
}

export default TokenDetailPage;

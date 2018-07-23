import React, { Component } from 'react';
import {
    startsWith,
    findTabIndex,
    noSpaceLowerCase
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
        this.contractAddr = ''
        this.state = {
            on: 0
        }
    }

    componentWillMount() {
        const { pathname, hash } = this.props.url
        const index = findTabIndex(TOKEN_TABS, hash)
        this.setState({ on: index },
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
        this.contractAddr = pathname.split("/")[2]
        const { contractAddr } = this
        if (contractAddr) {
            this.props.tokenSummary({ contractAddr })
            this.setTab(this.state.on)
        }
    }

    setTab = (index) => {
        window.location.hash = noSpaceLowerCase(TOKEN_TABS[index])
        this.setState({ on: index }, () => {
            const { contractAddr } = this
            switch (index) {
                case 0:
                    this.props.tokenTransfersList({ contractAddr, page: 1, count: 10 })
                    break
                case 1:
                    this.props.tokenHoldersList({ contractAddr, page: 1, count: 10 })
                    break
                case 2:
                    this.props.readContractInformation({ address: contractAddr })
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

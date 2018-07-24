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
        this.state = {
            on: 0
        }
    }

    componentWillMount() {
        this.allDetailInfo(this.props.url)
    }

    componentWillReceiveProps(nextProps) {
        const { pathname: currentPath } = this.props.url
        const { pathname: nextPath } = nextProps.url
        if (currentPath !== nextPath && startsWith(nextPath, '/token')) {
            this.allDetailInfo(nextProps.url)
            return
        }

        const { hash: currentHash } = this.props.url
        const { hash: nextHash } = nextProps.url
        if (currentHash !== nextHash) {
            this.setTab(findTabIndex(TOKEN_TABS, nextHash))
        }
    }

    allDetailInfo = (url) => {
        const contractAddr = url.pathname.split("/")[2]
        if (contractAddr) {
            this.props.tokenSummary({ contractAddr })
            this.setTab(findTabIndex(TOKEN_TABS, url.hash), contractAddr)
        }
    }


    setTab = (_index, _contractAddr) => {
        if (_index !== -1) {
            window.location.hash = noSpaceLowerCase(TOKEN_TABS[_index])
        }
        const index = _index !== -1 ? _index : 0
        this.setState({ on: index }, () => {
            const contractAddr = _contractAddr ? _contractAddr : this.props.url.pathname.split("/")[2]
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

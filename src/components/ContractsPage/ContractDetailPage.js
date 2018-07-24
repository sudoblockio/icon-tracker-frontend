import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    startsWith,
    findTabIndex,
    noSpaceLowerCase
} from '../../utils/utils'
import {
    CONTRACT_TABS
} from '../../utils/const'
import {
    NotFound,
    ContractInfo,
    ContractTabs
} from '../../components'

class ContractDetailPage extends Component {

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
        if (currentPath !== nextPath && startsWith(nextPath, '/contract')) {
            this.allDetailInfo(nextProps.url)
            return
        }

        const { hash: currentHash } = this.props.url
        const { hash: nextHash } = nextProps.url
        if (currentHash !== nextHash) {
            this.setTab(findTabIndex(CONTRACT_TABS, nextHash))
        }
    }

    allDetailInfo = (url) => {
        const addr = url.pathname.split("/")[2]
        if (addr) {
            this.props.contractInfo({ addr })
            this.setTab(findTabIndex(CONTRACT_TABS, url.hash), addr)
        }
    }

    setTab = (_index, _addr) => {
        if (_index !== -1) {
            window.location.hash = noSpaceLowerCase(CONTRACT_TABS[_index])
        }
        const index = _index !== -1 ? _index : 0
        this.setState({ on: index }, () => {
            const addr = _addr ? _addr : this.props.url.pathname.split("/")[2]
			const page = 1, count = 10
            switch (index) {
                case 0:
                    this.props.contractTxList({ addr, page, count })
                    break
                case 1:
                    this.props.contractTokenTxList({ addr, page, count })
                    break
                case 2:
                    this.props.icxGetScore({ address: addr })
                    break
                case 3:
                    this.props.readContractInformation({ address: addr })
                    break
                case 4:
                    this.props.contractEventLogList({ address: addr, page, count })
                    break
                default:
            }
        })
    }

    render() {
        const { contract } = this.props
        const { loading, error } = contract

        const Content = () => {
            if (!loading && error) {
                return <NotFound error={error} />
            }
            else {
                return (
                    <div className="content-wrap">
                        <ContractInfo contract={contract} />
                        <ContractTabs {...this.props} {...this.state} setTab={this.setTab} />
                    </div>
                )
            }
        }

        return Content();
    }
}

export default withRouter(ContractDetailPage);

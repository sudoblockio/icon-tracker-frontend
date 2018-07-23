import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    startsWith,
    findTabIndex
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
            initialTab: 0
        }
    }

    componentWillMount() {
        const { pathname, hash } = this.props.url
        this.allDetailInfo(pathname)
        this.setState({ initialTab: findTabIndex(CONTRACT_TABS, hash) })
    }

    componentWillReceiveProps(nextProps) {
        const { pathname: current } = this.props.url
        const { pathname: next } = nextProps.url
        if (current !== next && startsWith(next, '/contract')) {
            this.allDetailInfo(next)
        }
    }

    allDetailInfo = (pathname) => {
        const addr = pathname.split("/")[2]
        if (addr) {
            this.props.contractInfo({ addr })
            this.props.contractTxList({ addr, page: 1, count: 10 })
        }
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
                        <ContractTabs {...this.props} {...this.state} />
                    </div>
                )
            }
        }

        return Content();
    }
}

export default withRouter(ContractDetailPage);

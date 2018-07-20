import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { startsWith } from '../../utils/utils'
import {
    NotFound,
    ContractInfo,
    ContractTabs
} from '../../components'

class ContractDetailPage extends Component {
    componentWillMount() {
        this.allDetailInfo(this.props.url.pathname)
    }

    componentWillReceiveProps(nextProps) {
        const current = this.props.url.pathname
        const next = nextProps.url.pathname
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
        const {
            contract,
            contractTx,
            contractTokenTx
        } = this.props

        const {
            loading,
            error
        } = contract

        const Content = () => {
            if (!loading && error) {
                return (
                    <NotFound error={error} />
                )
            }
            else {
                return (
                    <div className="content-wrap">
                        <ContractInfo contract={contract}/>
                        <ContractTabs {...this.props}/>
                    </div>
                )
            }
        }

        return Content();
    }
}

export default withRouter(ContractDetailPage);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { startsWith } from '../../utils/utils'
import {
    NotFound,
    ContractInfo,
    ContractTabs
} from '../../components'

// TODO Notfound 추가
class ContractDetailPage extends Component {
    componentWillMount() {
        this.allContractInfo(this.props.url.pathname)
    }

    componentWillReceiveProps(nextProps) {
        const current = this.props.url.pathname
        const next = nextProps.url.pathname
        if (current !== next && startsWith(next, '/contract')) {
            this.allContractInfo(next)
        }
    }

    allContractInfo = (pathname) => {
        const addr = pathname.split("/")[2]
        this.props.contractInfo({ addr })
        this.props.contractTxList({ addr, page: 1, count: 10 })
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
                        <ContractInfo 
                            contract={contract} 
                        />
                        <ContractTabs
                            contract={contract}
                            contractTx={contractTx}
                            contractTokenTx={contractTokenTx}
                            contractTxList={this.props.contractTxList}
                            contractTokenTxList={this.props.contractTokenTxList}
                            icxGetScore={this.props.icxGetScore}
                        />
                    </div>
                )
            }
        }

        return Content();
    }
}

export default withRouter(ContractDetailPage);

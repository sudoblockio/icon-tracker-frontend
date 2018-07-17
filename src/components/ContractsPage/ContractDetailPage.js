import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { startsWith } from '../../utils/utils'
import {
    ContractInfo,
    ContractTabs
} from '../../components'

class ContractDetailPage extends Component {
    constructor(props) {
        super(props)
        this.addr = ''
    }

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
        this.addr = pathname.split("/")[2]
        const { addr } = this
        this.props.contractInfo({ addr })
        this.props.contractTxList({ addr, page: 1, count: 10 })
    }

    render() {
        const { addr } = this
        const { contract, contractTx, contractTokenTx } = this.props
        return (
            <div className="content-wrap">
				<ContractInfo contract={contract}/>
                <ContractTabs
                    contract={contract}
                    addr={addr}
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

export default withRouter(ContractDetailPage);

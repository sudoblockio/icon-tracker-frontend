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
        this.props.selectContractInfo({ addr })
    }

    render() {
        const { addr } = this
        const { contract, contractTx, contractTokenTx } = this.props
        return (
            <div className="content-wrap">
				<ContractInfo contract={contract}/>
                <ContractTabs
                    loading={contract.loading}
                    addr={addr}
                    contractTx={contractTx}
                    contractTokenTx={contractTokenTx}
                    selectContractTransactionList={this.props.selectContractTransactionList}
                    selectContractTokenTransferList={this.props.selectContractTokenTransferList}
                />   
            </div>
        )
    }
}

export default withRouter(ContractDetailPage);

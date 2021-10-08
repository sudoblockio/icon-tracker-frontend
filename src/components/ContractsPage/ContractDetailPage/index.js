import React, { Component } from 'react';
import ContractInfo from './ContractInfo'
import ContractTabs from './ContractTabs'
import {
    DetailPage
} from '../../../components';
import {
    CONTRACT_TABS
} from '../../../utils/const'

class ContractDetailPage extends Component {

    render() {
        const { contract } = this.props;
        console.log(this.props, "cx det index props")
        const { loading, error, address } = contract
        console.log(contract, "cs props")

        return (
            <DetailPage
            {...this.props}
            loading={loading}
            error={error}
            TABS={CONTRACT_TABS}
            ROUTE="/contract"
            getInfo={address => { 
                console.log(address, "addr2day")
                console.log(this.props.contractInfo, "cx info")
                console.log(this.props, "?")
                this.props.contractInfo({ address}) }}
            getList={[
                addr => {
                        console.log(this.props.contractInfo(addr), "from contract container")
                        this.props.contractTxList({ addr, page: 1, count: 10 })
                    },
                    addr => {
                        this.props.contractInternalTxList({ addr, page: 1, count: 10 })
                    },
                    addr => {
                        this.props.contractTokenTxList({ addr, page: 1, count: 10 })
                    },
                    address => {
                        this.props.icxGetScore({ address })
                    },
                    address => {
                        this.props.readContractInformation({ address  })
                    },
                    contractAddr => {
                        this.props.contractEventLogList({ contractAddr, page: 1, count: 10 })
                    },
                ]}
                InfoComponent={ContractInfo}
                TabsComponent={ContractTabs}
            />
        )
    }
}

export default ContractDetailPage;

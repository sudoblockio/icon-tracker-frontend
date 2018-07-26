import React, { Component } from 'react';
import {
    CONTRACT_TABS
} from '../../utils/const'
import {
    ContractInfo,
    ContractTabs,
    DetailPage
} from '../../components/';

class ContractDetailPage extends Component {

    render() {
        const { contract } = this.props;
        const { loading, error } = contract

        return (
            <DetailPage
                {...this.props}
                loading={loading}
                error={error}
                TABS={CONTRACT_TABS}
                ROUTE="/contract"
                getInfo={addr => { this.props.contractInfo({ addr }) }}
                getList={[
                    addr => {
                        this.props.contractTxList({ addr, page: 1, count: 10 })
                    },
                    addr => {
                        this.props.contractTokenTxList({ addr, page: 1, count: 10 })
                    },
                    address => {
                        this.props.icxGetScore({ address  })
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

import React, { Component } from 'react';
import TokenSummary from './TokenSummary'
import TokenTabs from './TokenTabs'
import {
    DetailPage
} from 'components';
import {
    TOKEN_TABS
} from 'utils/const'

class TokenDetailPage extends Component {

    render() {
        const { token } = this.props;
        const { loading, error } = token

        return (
            <DetailPage
                {...this.props}
                loading={loading}
                error={error}
                TABS={TOKEN_TABS}
                ROUTE="/token"
                getInfo={contractAddr => { this.props.tokenSummary({ contractAddr }) }}
                getList={[
                    contractAddr => {
                        this.props.tokenTransfersList({ contractAddr, page: 1, count: 10 })
                    },
                    contractAddr => {
                        this.props.tokenHoldersList({ contractAddr, page: 1, count: 10 })
                    },
                    address => {
                        this.props.readContractInformation({ address  })
                    }
                ]}
                InfoComponent={TokenSummary}
                TabsComponent={TokenTabs}
            />
        )
    }
}

export default TokenDetailPage;

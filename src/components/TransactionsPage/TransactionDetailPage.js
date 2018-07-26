import React, { Component } from 'react';
import {
    TRANSACTION_TABS
} from '../../utils/const'
import {
    TransactionInfo,
    TransactionTabs,
    DetailPage
} from '../../components/';

class TransactionDetailPage extends Component {

    render() {
        const { transaction } = this.props;
        const { loading, error } = transaction

        return (
            <DetailPage
                {...this.props}
                loading={loading}
                error={error}
                TABS={TRANSACTION_TABS}
                ROUTE="/transaction"
                getInfo={txHash => { this.props.transactionTxDetail({ txHash }) }}
                getList={[
                    txHash => {
                        this.props.transactionEventLogList({ txHash, page: 1, count: 10 })
                    }
                ]}
                InfoComponent={TransactionInfo}
                TabsComponent={TransactionTabs}
            />
        )
    }
}

export default TransactionDetailPage;

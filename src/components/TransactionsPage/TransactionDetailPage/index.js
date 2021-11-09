import React, { Component } from 'react';
import TransactionInfo from './TransactionInfo'
import TransactionTabs from './TransactionTabs'
import {
    DetailPage
} from '../../../components';
import {
    TRANSACTION_TABS
} from '../../../utils/const'

class TransactionDetailPage extends Component {

    render() {
        const { transaction } = this.props;
        const { loading, error, pending } = transaction

        return (
            <DetailPage
                {...this.props}
                loading={loading}
                pending={pending}
                error={error}
                TABS={TRANSACTION_TABS}
                ROUTE="/transaction"
                getInfo={txHash => { this.props.transactionTxDetail({ txHash }) }}
                getList={[
                    txHash => {
                        this.props.transactionInternalTxList({ txHash, page: 1, count: 10 })
                    },                    
                    txHash => {
                        this.props.transactionEventLogListAction({ txHash, page: 1, count: 10 })
                    }
                ]}
                InfoComponent={TransactionInfo}
                TabsComponent={TransactionTabs}
            />
        )
    }
}

export default TransactionDetailPage;

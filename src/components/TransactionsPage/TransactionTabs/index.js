import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    TX_TYPE,
    TRANSACTION_TABS,
} from '../../../utils/const'
import {
    NoBox,
    TransactionEvents,
    TabTable
} from '../../../components'

class TransactionTabs extends Component {

    render() {
        const { on, transaction, transactionEvents } = this.props
        const { loading, data } = transaction
        const { txHash } = data
        return (
            <TabTable
                {...this.props}
                TABS={TRANSACTION_TABS}
                on={on}
                loading={loading}
                TableContents={on => {
                    switch (on) {
                        case 0:
                            return (
                                <TransactionEvents
                                    txData={transactionEvents}
                                    goAllTx={() => {this.props.history.push(`/${TX_TYPE.TRANSACTION_EVENTS}/${txHash}`)}}
                                    txType={TX_TYPE.TRANSACTION_EVENTS}
                                />
                            )
                        default:
                            return <NoBox text="No Data"/>
                    }
                }
                }
            />
        )
    }
}

export default withRouter(TransactionTabs);
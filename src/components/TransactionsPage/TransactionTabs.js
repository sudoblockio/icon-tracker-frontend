import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    LoadingComponent,
    NoBox,
    TransactionEvents
} from '../../components'
import {
    TX_TYPE,
    TRANSACTIONS_TABS,
} from '../../utils/const'

class TransactionTabs extends Component {

    goAllTx = () => {
        const { on, transaction } = this.props
        const { data } = transaction
        const { txHash } = data
        switch (on) {
            case 0:
                this.props.history.push(`/${TX_TYPE.TRANSACTION_EVENTS}/${txHash}`);
                break

            default:
        }
    }

    render() {
        const { on, transaction, transactionEvents } = this.props
        const { loading } = transaction

        const TableContents = () => {
            switch (on) {
                case 0:
                    return (
                        <TransactionEvents
                            txData={transactionEvents}
                            goAllTx={this.goAllTx}
                            txType={TX_TYPE.TRANSACTION_EVENTS}
                        />
                    )
                default:
                    return <NoBox text="No Data" />
            }
        }
        const Contents = () => {
            if (loading) {
                return <LoadingComponent height='513px' />
            }
            else {
                return (
                    <div className="screen1">
                        <div className="wrap-holder">
                            <div className="tab-holder">
                                <ul>
                                    {
                                        TRANSACTIONS_TABS.map((tab, index) => (
                                            <li key={index} className={on === index ? 'on' : ''} onClick={() => { this.props.setTab(index) }}>{tab}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {TableContents()}
                        </div>
                    </div>
                )
            }
        }
        return Contents()
    }
}

export default withRouter(TransactionTabs);

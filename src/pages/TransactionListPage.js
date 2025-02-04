import React, { Component } from 'react';
import { TransactionListPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class TransactionListPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Transactions" />
                <TransactionListPageContainer />
            </>
        );
    }
}

export default TransactionListPage;

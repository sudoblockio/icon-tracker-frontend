import React, { Component } from 'react';
import { TransactionDetailPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class TransactionDetailPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Transaction" />
                <TransactionDetailPageContainer />
            </>
        );
    }
}

export default TransactionDetailPage;

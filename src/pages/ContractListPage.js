import React, { Component } from 'react';
import { ContractListPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class ContractListPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Contracts" />
                <ContractListPageContainer />
            </>
        );
    }
}

export default ContractListPage;
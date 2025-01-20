import React, { Component } from 'react';
import { ContractsPageSelectorContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class ContractsPageSelector extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Contract" />
                <ContractsPageSelectorContainer />
            </>
        );
    }
}

export default ContractsPageSelector;

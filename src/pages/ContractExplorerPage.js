import React from 'react';
import { ContractDetailPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

const ContractExplorerPage = () => {
    return (
        <>
            <PageHelmet title="Contract Name" />
            <ContractDetailPageContainer />
        </>
    );
};

export default ContractExplorerPage;
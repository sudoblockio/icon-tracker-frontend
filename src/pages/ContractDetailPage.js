import React from 'react';
import { ContractDetailPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

const ContractDetailPage = () => {
    return (
        <>
            <PageHelmet title="Contract" />
            <ContractDetailPageContainer />
        </>
    );
};

export default ContractDetailPage;

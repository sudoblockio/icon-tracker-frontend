import React, { Component } from 'react';
import { ProposalListPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class ProposalListPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Proposals" />
                <ProposalListPageContainer />
            </>
        );
    }
}

export default ProposalListPage;

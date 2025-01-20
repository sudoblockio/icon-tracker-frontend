import React, { Component } from 'react';
import { ProposalDetailPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class ProposalDetailPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Proposal" />
                <ProposalDetailPageContainer />
            </>
        );
    }
}

export default ProposalDetailPage;

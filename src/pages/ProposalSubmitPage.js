import React, { Component } from 'react';
import { ProposalSubmitPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class ProposalSubmitPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Submit Proposal" />
                <ProposalSubmitPageContainer />
            </>
        );
    }
}

export default ProposalSubmitPage;

import React, { Component } from 'react';
import { VotingPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class VotingPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Voting" />
                <VotingPageContainer />
            </>
        );
    }
}

export default VotingPage;

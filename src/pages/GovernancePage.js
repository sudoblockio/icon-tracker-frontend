import React, { Component } from 'react';
import { GovernancePageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class GovernancePage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Governance" />
                <GovernancePageContainer />
            </>
        );
    }
}

export default GovernancePage;

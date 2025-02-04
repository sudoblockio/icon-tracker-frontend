import React, { Component } from 'react';
import { TokenListPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';
class TokenListPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Tokens" />
                <TokenListPageContainer />
            </>
        );
    }
}

export default TokenListPage;

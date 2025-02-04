import React, { Component } from 'react';
import { TokenDetailPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class TokenDetailPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Token" />
                <TokenDetailPageContainer />
            </>
        );
    }
}

export default TokenDetailPage;

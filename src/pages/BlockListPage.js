import React, { Component } from 'react';
import { BlockListPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class BlockListPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Blocks" />
                <BlockListPageContainer />
            </>
        );
    }
}

export default BlockListPage;
import React, { Component } from 'react';
import { BlockDetailPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class BlockDetailPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Block" />
                <BlockDetailPageContainer />
            </>
        );
    }
}

export default BlockDetailPage;

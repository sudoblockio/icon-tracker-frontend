import React, { Component } from 'react';
import { NotFoundPageContainer } from '../containers';
import PageHelmet from '../components/PageHelmet';

class NotFoundPage extends Component {
    render() {
        return (
            <>
                <PageHelmet title="Page Not Found" />
                <NotFoundPageContainer />
            </>
        );
    }
}

export default NotFoundPage;

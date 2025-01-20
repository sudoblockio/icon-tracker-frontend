import React, { Component } from 'react'
import { AddressDetailPageContainer } from '../containers'
import PageHelmet from '../components/PageHelmet';

class AddressDetailPage extends Component {
    render() {
        return <>
            <PageHelmet title="Address" />
            <AddressDetailPageContainer />
        </>
    }
}

export default AddressDetailPage

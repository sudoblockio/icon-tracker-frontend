import React, { Component } from 'react'
import { AddressListPageContainer } from '../containers'
import PageHelmet from '../components/PageHelmet';
class AddressListPage extends Component {
    render() {
        return <>
            <PageHelmet title="Addresses" />
            <AddressListPageContainer />
        </>
    }
}

export default AddressListPage

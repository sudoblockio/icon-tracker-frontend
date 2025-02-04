import React, { Component } from 'react'
import { MainPageContainer } from '../containers'
import PageHelmet from '../components/PageHelmet';

class MainPage extends Component {
    render() {
        return <>
            <PageHelmet title="Home" />
            <MainPageContainer />
        </>
    }
}

export default MainPage

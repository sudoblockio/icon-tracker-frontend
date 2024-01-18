import React, { Component } from 'react'
import { SearchPage } from '../../../components'

class TokenListPage extends Component {
    render() {
        return <SearchPage {...this.props} type="token" />
    }
}
export default TokenListPage

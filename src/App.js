import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store, history } from './redux/store/store'
import Routes from './Routes.js'
import { ConnectedRouter } from 'react-router-redux'
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default App

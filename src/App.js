import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './redux/store';
import { history } from './redux/store/store'
import Routes from './Routes.js'
import { ConnectedRouter } from 'connected-react-router'

const store = configureStore();

class App extends Component {
    render() {
        return (
            <ReduxProvider store={store}>
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
            </ReduxProvider>
        )
    }
}

export default App

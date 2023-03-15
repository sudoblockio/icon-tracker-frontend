import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store, history } from './redux/store/store'
import IconTrackerRoutes from './Routes.js'
import { ConnectedRouter } from 'react-router-redux'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <IconTrackerRoutes />
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default App

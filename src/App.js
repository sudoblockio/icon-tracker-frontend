import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, history } from './redux/store/store';
import { Header, Footer } from './components/';
import { RoutesContainer } from './containers/';
import MainPage from './pages/MainPage';
import AddressesPage from './pages/AddressesPage';
import AddressDetailPage from './pages/AddressDetailPage';
import TransactionsPage from './pages/TransactionsPage';
import BlocksPage from './pages/BlocksPage';
import BlockDetailPage from './pages/BlockDetailPage';
import { ConnectedRouter } from 'react-router-redux'

class App extends Component {

  render() {
    console.log(window.location.pathname)
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RoutesContainer />  
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

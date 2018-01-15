import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { Header, Footer } from './components/';
import MainPage from './pages/MainPage';
import AddressesPage from './pages/AddressesPage';
import AddressDetailPage from './pages/AddressDetailPage';
import TransactionsPage from './pages/TransactionsPage';
import BlocksPage from './pages/BlocksPage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="app-root">
          <div className="root">
            <div className={`wrap ${window.location.pathname === '/' ? 'home' : 'sub'}`}>
              <Header />
              <Route onEnter={window.scroll(0, 0)} exact path='/' component={MainPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/wallet' component={AddressesPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/wallet-detail' component={AddressDetailPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/transactions' component={TransactionsPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/blocks' component={BlocksPage}/>
            </div>
            <div className="blank"></div>
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;

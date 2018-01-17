import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { store, history } from './redux/store/store';
import { Header, Footer } from './components/';
import MainPage from './pages/MainPage';
import AddressesPage from './pages/AddressesPage';
import AddressDetailPage from './pages/AddressDetailPage';
import TransactionsPage from './pages/TransactionsPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import BlocksPage from './pages/BlocksPage';
import BlockDetailPage from './pages/BlockDetailPage';

class Routes extends Component {

  render() {
    return (
        <div id="app-root">
          <div className="root">
            <div className={`wrap ${window.location.pathname === '/' ? 'home' : 'sub'}`}>
              <Header />
              <Route onEnter={window.scroll(0, 0)} exact path='/' component={MainPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/wallets' component={AddressesPage} exact />
              <Route onEnter={window.scroll(0, 0)} path='/wallets/:pageId' component={AddressesPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/wallet/:addressId' component={AddressDetailPage} exact/>
              <Route onEnter={window.scroll(0, 0)} path='/wallet/:addressId/:pageId' component={AddressDetailPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/transactions' component={TransactionsPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/transaction/:txHash' component={TransactionDetailPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/blocks' component={BlocksPage} exact />
              <Route onEnter={window.scroll(0, 0)} path='/blocks/:pageId' component={BlocksPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/block/:blockId' component={BlockDetailPage} exact />
              <Route onEnter={window.scroll(0, 0)} path='/block/:blockId/:pageId' component={BlockDetailPage}/>
            </div>
            <div className="blank"></div>
          </div>
          <Footer />
        </div>
    );
  }
}

export default Routes;

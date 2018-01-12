import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { Header, Footer } from './components/';
import MainPage from './pages/MainPage';
import WalletPage from './pages/WalletPage';
import TransactionsPage from './pages/TransactionsPage';
import BlocksPage from './pages/BlocksPage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div className="root">
            <div className={`wrap ${window.location.pathname === '/' ? 'home' : 'sub'}`}>
              <Header />
              <Route exact path='/' component={MainPage}/>
              <Route path='/wallet' component={WalletPage}/>
              <Route path='/transactions' component={TransactionsPage}/>
              <Route path='/blocks' component={BlocksPage}/>
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

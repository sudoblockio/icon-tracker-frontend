import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, history } from './redux/store/store';
import Routes from './Routes.js';
import { ConnectedRouter } from 'react-router-redux'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
<<<<<<< HEAD
        <div id="app-root">
          <div className="root">
            <div className={`wrap ${window.location.pathname === '/' ? 'home' : 'sub'}`}>
              <Header />
              <Route onEnter={window.scroll(0, 0)} exact path='/' component={MainPage}/>
              <Route onEnter={window.scroll(0, 0)} exact path='/wallet/:pageId' component={AddressesPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/wallet/:addressId/:pageId' component={AddressDetailPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/transactions' component={TransactionsPage} exact/>
              <Route onEnter={window.scroll(0, 0)} path='/transactions/:pageId' component={TransactionsPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/blocks' component={BlocksPage} exact />
              <Route onEnter={window.scroll(0, 0)} path='/blocks/:pageId' component={BlocksPage}/>
              <Route onEnter={window.scroll(0, 0)} path='/block/:id' component={BlockDetailPage} exact />
              <Route onEnter={window.scroll(0, 0)} path='/block/:id/:pageId' component={BlockDetailPage}/>
            </div>
            <div className="blank"></div>
          </div>
          <Footer />
        </div>
=======
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
>>>>>>> origin/development
      </Provider>
    );
  }
}

export default App;

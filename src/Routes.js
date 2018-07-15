import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Footer } from './components/';
import { HeaderContainer } from './containers/'
import MainPage from './pages/MainPage';
import AddressesPage from './pages/AddressesPage';
import AddressDetailPage from './pages/AddressDetailPage';
import ContractsPage from './pages/ContractsPage'
import BlocksPage from './pages/BlocksPage';
import BlockDetailPage from './pages/BlockDetailPage';
import TransactionsPage from './pages/TransactionsPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AddressTotalTxListPage from './pages/AddressTotalTxListPage'
import TokenListPage from './pages/TokenListPage'

class Routes extends Component {

  render() {
    return (
        <div id="app-root">
          <div className="root">
            <div className={`wrap ${window.location.pathname === '/' ? 'home' : 'sub'}`}>
              <HeaderContainer />
              <Switch>
                <Route onEnter={window.scroll(0, 0)} exact path='/' component={MainPage}/>
                
                <Route onEnter={window.scroll(0, 0)} exact path='/addresses' component={AddressesPage} />
                <Route onEnter={window.scroll(0, 0)} path='/addresses/:pageId' component={AddressesPage}/>
                <Route onEnter={window.scroll(0, 0)} exact path='/address/:addressId' component={AddressDetailPage}/>
                
                <Route onEnter={window.scroll(0, 0)} exact path='/blocks' component={BlocksPage} />
                <Route onEnter={window.scroll(0, 0)} path='/blocks/:pageId' component={BlocksPage}/>
                <Route onEnter={window.scroll(0, 0)} exact path='/block/:blockId' component={BlockDetailPage}/>

                {/* <Route onEnter={window.scroll(0, 0)} exact path='/transactions' component={TransactionsPage}/>
                <Route onEnter={window.scroll(0, 0)} path='/transactions/:pageId' component={TransactionsPage}/> */}
                <Route onEnter={window.scroll(0, 0)} exact path='/transaction/:txHash' component={TransactionDetailPage}/>

                <Route onEnter={window.scroll(0, 0)} exact path='/contracts' component={ContractsPage} />

                <Route onEnter={window.scroll(0, 0)} exact path='/addresstx/:addressId/' component={AddressTotalTxListPage}/>
                <Route onEnter={window.scroll(0, 0)} path='/addresstx/:addressId/:pageId' component={AddressTotalTxListPage}/>
                <Route onEnter={window.scroll(0, 0)} exact path='/addresstokentx/:addressId/' component={AddressTotalTxListPage}/>
                <Route onEnter={window.scroll(0, 0)} path='/addresstokentx/:addressId/:pageId' component={AddressTotalTxListPage}/>
                <Route onEnter={window.scroll(0, 0)} exact path='/blocktx/:heightId/' component={AddressTotalTxListPage}/>
                <Route onEnter={window.scroll(0, 0)} path='/blocktx/:heightId/:pageId' component={AddressTotalTxListPage}/>
                <Route onEnter={window.scroll(0, 0)} exact path='/transactions' component={AddressTotalTxListPage}/>
                <Route onEnter={window.scroll(0, 0)} path='/transactions/:pageId' component={AddressTotalTxListPage}/>
                <Route onEnter={window.scroll(0, 0)} exact path='/tokentransfers' component={AddressTotalTxListPage}/>
                <Route onEnter={window.scroll(0, 0)} path='/tokentransfers/:pageId' component={AddressTotalTxListPage}/>

                <Route onEnter={window.scroll(0, 0)} exact path='/tokens' component={TokenListPage}/>

                <Route onEnter={window.scroll(0, 0)} path='/notfound' component={NotFoundPage}/>
                <Route onEnter={window.scroll(0, 0)} component={NotFoundPage}/>
              </Switch>
            </div>
            <div className="blank"></div>
          </div>
          <Footer />
        </div>
    );
  }
}

export default Routes;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Footer, Popup } from './components/';
import { HeaderContainer } from './containers/'
import MainPage from './pages/MainPage';
import AddressesPage from './pages/AddressesPage';
import AddressDetailPage from './pages/AddressDetailPage';
import ContractDetailPage from './pages/ContractDetailPage'
import ContractsPage from './pages/ContractsPage'
import BlocksPage from './pages/BlocksPage';
import BlockDetailPage from './pages/BlockDetailPage';
// import TransactionsPage from './pages/TransactionsPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import TokensPage from './pages/TokensPage'
import TokenDetailPage from './pages/TokenDetailPage'
import TxPage from './pages/TxPage'
import { TX_TYPE } from './utils/const'

class Routes extends Component {

  render() {
    return (
      <div id="app-root">
        <div className="root">
          <div className={`wrap ${window.location.pathname === '/' ? 'home' : 'sub'}`}>
            <HeaderContainer />
            <Switch>
              <Route onEnter={window.scroll(0, 0)} exact path='/' component={MainPage} />

              <Route onEnter={window.scroll(0, 0)} exact path='/addresses' component={AddressesPage} />
              <Route onEnter={window.scroll(0, 0)} path='/addresses/:pageId' component={AddressesPage} />
              <Route onEnter={window.scroll(0, 0)} exact path='/address/:addressId' component={AddressDetailPage} />

              <Route onEnter={window.scroll(0, 0)} exact path='/blocks' component={BlocksPage} />
              <Route onEnter={window.scroll(0, 0)} path='/blocks/:pageId' component={BlocksPage} />
              <Route onEnter={window.scroll(0, 0)} exact path='/block/:blockId' component={BlockDetailPage} />

              <Route onEnter={window.scroll(0, 0)} exact path='/transaction/:txHash' component={TransactionDetailPage} />
              <Route onEnter={window.scroll(0, 0)} exact path='/contract/:contractId' component={ContractDetailPage} />
              <Route onEnter={window.scroll(0, 0)} exact path='/tokens' component={TokensPage} />
              <Route onEnter={window.scroll(0, 0)} exact path='/token/:tokenId' component={TokenDetailPage} />

              <Route onEnter={window.scroll(0, 0)} path='/contracts' component={ContractsPage} exact />
              <Route onEnter={window.scroll(0, 0)} path='/contracts/:pageId' component={ContractsPage} />

              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_TX}/:contractId/`} component={TxPage} exact />
              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_TX}/:contractId/:pageId`} component={TxPage} />

              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_TOKEN_TX}/:contractId/`} component={TxPage} exact />
              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_TOKEN_TX}/:contractId/:pageId`} component={TxPage} />

              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_TX}/:addressId/`} component={TxPage} exact />
              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_TX}/:addressId/:pageId`} component={TxPage} />

              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_TOKEN_TX}/:addressId/`} component={TxPage} exact />
              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_TOKEN_TX}/:addressId/:pageId`} component={TxPage} />

              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TRANSACTIONS}`} component={TxPage} exact />
              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TRANSACTIONS}/:pageId`} component={TxPage} />

              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_TRANSFERS}`} component={TxPage} exact />
              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_TRANSFERS}/:pageId`} component={TxPage} />

              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.BLOCK_TX}/:heightId/`} component={TxPage} exact />
              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.BLOCK_TX}/:heightId/:pageId`} component={TxPage} />

              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_TX}/:tokenId`} component={TxPage} exact />
              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_TX}/:tokenId/:pageId`} component={TxPage} />

              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_HOLDERS}/:tokenId`} component={TxPage} exact />
              <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_HOLDERS}/:tokenId/:pageId`} component={TxPage} />

              <Route onEnter={window.scroll(0, 0)} path='/notfound' component={NotFoundPage} />
              <Route onEnter={window.scroll(0, 0)} component={NotFoundPage} />
            </Switch>
          </div>
          <div className="blank"></div>
        </div>
        <Footer />
        <Popup />
      </div>
    );
  }
}

export default Routes;

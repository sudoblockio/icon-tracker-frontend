import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Popup } from './components/';
// import { Banner } from './components/';
import { HeaderContainer } from './containers/'
import MainPage from './pages/MainPage';
import AddressListPage from './pages/AddressListPage';
import AddressDetailPage from './pages/AddressDetailPage';
import ContractDetailPage from './pages/ContractDetailPage'
import ContractListPage from './pages/ContractListPage'
import BlockListPage from './pages/BlockListPage';
import BlockDetailPage from './pages/BlockDetailPage';
import TransactionListPage from './pages/TransactionListPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import TokenListPage from './pages/TokenListPage'
import TokenDetailPage from './pages/TokenDetailPage'
import GovernancePage from './pages/GovernancePage'
import ProposalListPage from './pages/ProposalListPage'
import ProposalDetailPage from './pages/ProposalDetailPage'
import TxPage from './pages/TxPage'
import TraceTransactionPage from './pages/TraceTransactionPage'
import { TX_TYPE, SEARCH_TYPE } from './utils/const'
import { getIsSolo } from './utils/utils'
import BodyClassName from 'react-body-classname'

class IconTrackerRoutes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSolo: true
    }
  }

  async componentDidMount() {
    const isSolo = await getIsSolo()
    this.setState({ isSolo })
  }

  render() {
    const isMain = window.location.pathname === '/' 
    const isGovernance = window.location.pathname.includes('governance')    
    const bodyClassName = isMain ? 'main-back' : (isGovernance ? 'main-back' : '')
    console.log(window.location.pathname.includes('trace'),"pathname")
    return (
      <BodyClassName className={bodyClassName}>
        <div id="app-root">
          {/* {isMain && !this.state.isSolo && <Banner />} */}
          <div className="root">
            <div className={`wrap ${isMain ? 'home' : 'sub'}`}>
              <HeaderContainer />
              <Switch>
                <Route onEnter={window.scroll(0, 0)} path='/' element={<MainPage/>} exact />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESSES}`} element={<AddressListPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESSES}/:pageId`} element={<AddressListPage/>} />
                <Route onEnter={window.scroll(0, 0)} path='/address/:addressId' element={<AddressDetailPage/>} exact />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.BLOCKS}`} element={<BlockListPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.BLOCKS}/:pageId`} element={<BlockListPage/>} />
                <Route onEnter={window.scroll(0, 0)} path='/block/:blockId' element={<BlockDetailPage/>} exact />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TRANSACTIONS}`} element={<TransactionListPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TRANSACTIONS}/:pageId`} element={<TransactionListPage/>} />
                <Route onEnter={window.scroll(0, 0)} path='/transaction/:txHash' element={<TransactionDetailPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path='/transaction/trace/:txHash' element={<TraceTransactionPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${SEARCH_TYPE.CONTRACTS}`} element={<ContractListPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${SEARCH_TYPE.CONTRACTS}/:pageId`} element={<ContractListPage/>} />
                <Route onEnter={window.scroll(0, 0)} path='/contract/:contractId' element={<ContractDetailPage/>} exact />

                <Route onEnter={window.scroll(0, 0)} path={`/${SEARCH_TYPE.TOKENS}`} element={<TokenListPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${SEARCH_TYPE.TOKENS}/:pageId`} element={<TokenListPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path='/token/:tokenId' element={<TokenDetailPage/>} exact />

                <Route onEnter={window.scroll(0, 0)} path={`/governance`} element={<GovernancePage/>} exact />
                
                <Route onEnter={window.scroll(0, 0)} path={`/proposal-list`} element={<ProposalListPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/proposal/:proposalId`} element={<ProposalDetailPage/>} exact />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_TRANSFERS}`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_TRANSFERS}/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_TX}/:addressId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_TX}/:addressId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_VOTED}/:addressId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_VOTED}/:addressId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_INTERNAL_TX}/:addressId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_INTERNAL_TX}/:addressId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_TOKEN_TX}/:addressId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_TOKEN_TX}/:addressId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_REWARD}/:addressId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.ADDRESS_REWARD}/:addressId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.BLOCK_TX}/:heightId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.BLOCK_TX}/:heightId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_TX}/:contractId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_TX}/:contractId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_INTERNAL_TX}/:contractId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_INTERNAL_TX}/:contractId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_TOKEN_TX}/:contractId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_TOKEN_TX}/:contractId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_EVENTS}/:contractId/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.CONTRACT_EVENTS}/:contractId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_TX}/:tokenId`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_TX}/:tokenId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_HOLDERS}/:tokenId`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TOKEN_HOLDERS}/:tokenId/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TRANSACTION_INTERNAL_TX}/:txHash/`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TRANSACTION_INTERNAL_TX}/:txHash/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TRANSACTION_EVENTS}/:txHash`} element={<TxPage/>} exact />
                <Route onEnter={window.scroll(0, 0)} path={`/${TX_TYPE.TRANSACTION_EVENTS}/:txHash/:pageId`} element={<TxPage/>} />

                <Route onEnter={window.scroll(0, 0)} path='/notfound' element={<NotFoundPage/>} />
                <Route onEnter={window.scroll(0, 0)} element={<NotFoundPage/>} />
              </Switch>
            </div>
            <div className={window.location.pathname.includes('trace') ?"tx-blank": "blank"}></div>
          </div>
          <Footer />
          <Popup />
        </div>
      </BodyClassName>
    );
  }
}

export default IconTrackerRoutes;

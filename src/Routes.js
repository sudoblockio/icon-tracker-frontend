import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Footer, Popup } from './components/'
// import { Banner } from './components/';
import { HeaderContainer } from './containers/'
import MainPage from './pages/MainPage'
import AddressListPage from './pages/AddressListPage'
import AddressDetailPage from './pages/AddressDetailPage'
import ContractDetailPage from './pages/ContractDetailPage'
import ContractsPageSelector from './pages/ContractsPageSelector'
import BlockListPage from './pages/BlockListPage'
import BlockDetailPage from './pages/BlockDetailPage'
import TransactionListPage from './pages/TransactionListPage'
import TransactionDetailPage from './pages/TransactionDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import TokenListPage from './pages/TokenListPage'
import TokenDetailPage from './pages/TokenDetailPage'
import GovernancePage from './pages/GovernancePage'
import ProposalListPage from './pages/ProposalListPage'
import ProposalDetailPage from './pages/ProposalDetailPage'
import ProposalSubmitPage from './pages/ProposalSubmitPage'
import TxPage from './pages/TxPage'
import TraceTransactionPage from './pages/TraceTransactionPage'
import VotingPage from "./pages/VotingPage"
import { TX_TYPE, SEARCH_TYPE } from './utils/const'
import { getIsSolo } from './utils/utils'
import BodyClassName from 'react-body-classname'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Routes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSolo: true,
        }
    }

    async componentDidMount() {
        const isSolo = await getIsSolo()
        this.setState({ isSolo })
    }

    render() {
        const isMain = window.location.pathname === '/'
        const isGovernance = window.location.pathname.includes('governance')
        const bodyClassName = isMain ? 'main-back' : isGovernance ? 'main-back' : ''
        // console.log(window.location.pathname.includes('trace'), 'pathname')
        return (
            <BodyClassName className={bodyClassName}>
                <div id="app-root">
                    {/* {isMain && !this.state.isSolo && <Banner />} */}
                    <ToastContainer
                        position="top-right"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        pauseOnHover
                        theme="light"
                    />
                    <div className="root">
                        <div className={`wrap ${isMain ? 'home' : 'sub'}`}>
                            <HeaderContainer />
                            <Switch>
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path="/"
                                    component={MainPage}
                                    exact
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESSES}`}
                                    component={AddressListPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESSES}/:pageId`}
                                    component={AddressListPage}
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path="/address/:addressId"
                                    component={AddressDetailPage}
                                    exact
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.BLOCKS}`}
                                    component={BlockListPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.BLOCKS}/:pageId`}
                                    component={BlockListPage}
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path="/block/:blockId"
                                    component={BlockDetailPage}
                                    exact
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TRANSACTIONS}`}
                                    component={TransactionListPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TRANSACTIONS}/:pageId`}
                                    component={TransactionListPage}
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path="/transaction/:txHash"
                                    component={TransactionDetailPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path="/transaction/trace/:txHash"
                                    component={TraceTransactionPage}
                                />

                                {/* TODO: this next route is for new implementation
                                 * of the single page
                                 */}
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${SEARCH_TYPE.CONTRACTS}`}
                                    component={ContractsPageSelector}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${SEARCH_TYPE.CONTRACTS}/:pageId`}
                                    component={ContractsPageSelector}
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path="/contract/:contractId"
                                    component={ContractDetailPage}
                                    exact
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${SEARCH_TYPE.TOKENS}`}
                                    component={TokenListPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${SEARCH_TYPE.TOKENS}/:pageId`}
                                    component={TokenListPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path="/token/:tokenId"
                                    component={TokenDetailPage}
                                    exact
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/governance`}
                                    component={GovernancePage}
                                    exact
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/proposal-list`}
                                    component={ProposalListPage}
                                    exact
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/proposal-submit`}
                                    component={ProposalSubmitPage}
                                    exact
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/proposal/:proposalId`}
                                    component={ProposalDetailPage}
                                    exact
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TOKEN_TRANSFERS}`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TOKEN_TRANSFERS}/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_TX}/:addressId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_TX}/:addressId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_VOTED}/:addressId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_VOTED}/:addressId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_INTERNAL_TX}/:addressId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_INTERNAL_TX}/:addressId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_TOKEN_TX}/:addressId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_TOKEN_TX}/:addressId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_REWARD}/:addressId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.ADDRESS_REWARD}/:addressId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.BLOCK_TX}/:heightId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.BLOCK_TX}/:heightId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.CONTRACT_TX}/:contractId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.CONTRACT_TX}/:contractId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.CONTRACT_INTERNAL_TX}/:contractId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.CONTRACT_INTERNAL_TX}/:contractId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.CONTRACT_TOKEN_TX}/:contractId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.CONTRACT_TOKEN_TX}/:contractId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.CONTRACT_EVENTS}/:contractId/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.CONTRACT_EVENTS}/:contractId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TOKEN_TX}/:tokenId`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TOKEN_TX}/:tokenId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TOKEN_HOLDERS}/:tokenId`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TOKEN_HOLDERS}/:tokenId/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TRANSACTION_INTERNAL_TX}/:txHash/`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TRANSACTION_INTERNAL_TX}/:txHash/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TRANSACTION_EVENTS}/:txHash`}
                                    component={TxPage}
                                    exact
                                />
                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path={`/${TX_TYPE.TRANSACTION_EVENTS}/:txHash/:pageId`}
                                    component={TxPage}
                                />

                                <Route
                                    onEnter={window.scroll(0, 0)}
                                    path="/notfound"
                                    component={NotFoundPage}
                                />

                                <Route
                                    path="/voting"
                                    component={VotingPage}
                                    onEnter={window.scroll(0, 0)}
                                    exact
                                />

                                <Route onEnter={window.scroll(0, 0)} component={NotFoundPage} />
                            </Switch>
                        </div>
                        <div
                            className={
                                window.location.pathname.includes('trace') ? 'tx-blank' : 'blank'
                            }></div>
                    </div>
                    <Footer />
                    <Popup />
                </div>
            </BodyClassName>
        )
    }
}

export default Routes

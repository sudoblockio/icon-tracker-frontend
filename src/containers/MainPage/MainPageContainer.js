import { connect } from 'react-redux'
import { MainPage } from '../../components'
import { withRouter } from 'react-router-dom'
import { blockListAction } from '../../redux/store/blocks'
import { transactionRecentTxAction } from '../../redux/store/transactions'

function mapStateToProps(state) {
    return { ...state.mainPage, ...state.transactions }
}

function mapDispatchToProps(dispatch) {
    return {
        getBlockList: () => dispatch(blockListAction()),
        getRecentTransactions: (payload) => dispatch(transactionRecentTxAction(payload)),
    }
}

const MainPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))

export default MainPageContainer

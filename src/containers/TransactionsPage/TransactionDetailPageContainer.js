import { connect } from 'react-redux'
import { TransactionDetailPage } from '../../components'
import { withRouter } from 'react-router-dom'
import {
    transactionEventLogListAction,
    transactionTxDetailAction,
    transactionInternalTxListAction,
} from '../../redux/store/transactions'
import { tokenTxList } from '../../redux/actions/tokensActions'

function mapStateToProps(state) {
    return {
        url: state.router.location,
        ...state.transactions,
        recentTokenTx: state.tokens.recentTokenTx,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        transactionTxDetail: (payload) => dispatch(transactionTxDetailAction(payload)),
        transactionEventLogListAction: (payload) =>
            dispatch(transactionEventLogListAction(payload)),
        transactionInternalTxList: (payload) => dispatch(transactionInternalTxListAction(payload)),
        tokenTxList: (payload) => dispatch(tokenTxList(payload)),
    }
}

const TransactionDetailPageContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TransactionDetailPage)
)

export default TransactionDetailPageContainer

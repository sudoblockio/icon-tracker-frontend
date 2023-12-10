import { connect } from 'react-redux'
import { TransactionListPage } from '../../components'
import { transactionRecentTxAction } from '../../redux/store/transactions'

function mapStateToProps(state) {
    return {
        url: state.router.location,
        ...state.transactions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        transactionRecentTx: (payload) => dispatch(transactionRecentTxAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListPage)

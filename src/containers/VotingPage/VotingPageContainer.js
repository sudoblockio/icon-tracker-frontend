import { connect } from 'react-redux'
import { VotingPage } from '../../components'
import { withRouter } from 'react-router-dom'
import { setPopup } from '../../redux/store/popups'

function mapStateToProps(state) {
    return {
        url: state.router.location,
        ...state.addresses,
        walletAddress: state.storage.walletAddress,
        walletNotification: state.storage.walletNotification,
        walletTokens: state.walletTokenTx,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPopup: (payload) => dispatch(setPopup(payload)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VotingPage))
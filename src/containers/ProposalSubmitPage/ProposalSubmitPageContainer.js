import { connect } from 'react-redux'
import { ProposalSubmitPage } from '../../components'
import { withRouter } from 'react-router-dom'
import { setPopup } from '../../redux/store/popups'

function mapStateToProps(state) {
    return {
        walletAddress: state.storage.walletAddress,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPopup: (payload) => dispatch(setPopup(payload)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProposalSubmitPage))

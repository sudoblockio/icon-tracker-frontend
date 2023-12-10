import { connect } from 'react-redux'
import { ContractExplorerPage } from '../../components'
import { withRouter } from 'react-router-dom'
import { contractListAction, contractListSearchAction } from '../../redux/store/contracts'
import { setPopup } from '../../redux/store/popups'

function mapStateToProps(state) {
    return {
        url: state.router.location,
        ...state.contracts,
        wallet: state.storage.walletAddress,
        walletType: state.storage.walletType,
        bip44Path: state.storage.bip44Path,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPopup: (payload) => dispatch(setPopup(payload)),
        contractList: (payload) => dispatch(contractListAction(payload)),
        contractListSearch: (payload) => dispatch(contractListSearchAction(payload)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractExplorerPage))

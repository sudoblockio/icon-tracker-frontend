import { connect } from 'react-redux'
import { AddressListPage } from '../../components'
import { withRouter } from 'react-router-dom'
import { addressListAction } from '../../redux/store/addresses'

function mapStateToProps(state) {
    return {
        url: state.router.location,
        ...state.addresses,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addressList: (payload) => dispatch(addressListAction(payload)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressListPage))

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddressQrCode from './AddressQrCode'
import ContractDetail from './ContractDetail'
import { initPopup } from '../../redux/actions/popupActions'

class Popup extends Component {
    render() {
        const {
            type,
            data,
            initPopup
        } = this.props

        const Content = () => {
            switch (type) {
                case 'QrCode':
                    return <AddressQrCode data={data} initPopup={initPopup} />

                case 'ContractDetail':
                    return <ContractDetail data={data} initPopup={initPopup} />

                default:
                    return <AddressQrCode data={data} initPopup={initPopup} />
            }
        }

        return Content()
    }
}

function mapStateToProps(state) {
    return {
        type: state.popup.type,
        data: state.popup.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initPopup: () => dispatch(initPopup())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)

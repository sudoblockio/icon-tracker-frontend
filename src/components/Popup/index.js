import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddressQrCode from './AddressQrCode'
import ContractDetail from './ContractDetail'
import { initPopup } from '../../redux/actions/popupActions'
import { POPUP_TYPE } from '../../utils/const'

class Popup extends Component {
    render() {
        const {
            type,
            data,
            initPopup
        } = this.props

        const Content = () => {
            switch (type) {
                case POPUP_TYPE.AddressQrCode:
                    return <AddressQrCode data={data} initPopup={initPopup} />

                case POPUP_TYPE.ContractDetail:
                    return <ContractDetail data={data} initPopup={initPopup} />

                default:
                    return []
            }
        }

        return (
            <div className="popup-wrap qr">
                <div className="dimmed"></div>
                <div className="popup">
                    <span className="close" onClick={initPopup}>
                        <em className="img"></em>
                    </span>
                    {Content()}
                </div>
            </div>
        )
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

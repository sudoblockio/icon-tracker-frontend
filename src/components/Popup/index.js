import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddressQrCode from './AddressQrCode'
import ContractDetail from './ContractDetail'
import { initPopup } from '../../redux/actions/popupActions'
import { 
    POPUP_TYPE
} from 'utils/const'

class Popup extends Component {

    componentWillReceiveProps(nextProps) {
        const { type: current } = this.props
        const { type: next } = nextProps

        if (current === '' && next !== '') {
            this.openPopup(next)
        }
    }

    openPopup = (type) => {
        switch (type) {
            case POPUP_TYPE.QR:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: "OPEN_QR" }))    
                break
            case POPUP_TYPE.DETAIL:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: "OPEN_DETAIL" }))    
                break
            default:
        }
    }

    closePopup = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: "CLOSE_POPUP" }))    
    }

    closeDetail = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: "CLOSE_DETAIL" }))    
    }
    
    render() {
        const { type, data } = this.props        
        const isQr = type === POPUP_TYPE.QR
        const qrData = isQr ? data : {}
        const isDetail = type === POPUP_TYPE.DETAIL
        const detailData = isDetail ? data : {}

        return ([
            <div key="qr" className="popup-wrap qr">
                <div className="dimmed"></div>
                <div className="popup">
                    <span className="close" onClick={this.closePopup}>
                        <em className="img"></em>
                    </span>
                    {isQr && <AddressQrCode data={qrData} />}
                </div>
            </div>,
            <div key="detail" className="popup-wrap detail">
                <div className="dimmed"></div>
                <div className="popup contract">
                    <span className="close" onClick={this.closePopup}>
                        <em className="img"></em>
                    </span>
                    {isDetail && <ContractDetail data={detailData} closeDetail={this.closeDetail} />}
                </div>
            </div>
        ])
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

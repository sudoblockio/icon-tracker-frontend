import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddressQrCode from './AddressQrCode'
import ContractDetail from './ContractDetail'
import ImageConverter from './ImageConverter'
import { initPopup } from '../../redux/actions/popupActions'
import {
    POPUP_TYPE
} from 'utils/const'

class Popup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width:0,
            height: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        const { type: current } = this.props
        const { type: next } = nextProps

        console.log(nextProps)
        if (current === '' && next !== '') {
            this.openPopup(next)
        }
    }

    openPopup = (type) => {
        switch (type) {
            case POPUP_TYPE.QR:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "POPUP_OPEN", param: 'qr' } }))
                break
            case POPUP_TYPE.DETAIL:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "POPUP_OPEN", param: 'detail' } }))
                break
            case POPUP_TYPE.IMAGE:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "POPUP_OPEN", param: 'image' } }))
                break
            default:
        }
    }

    closePopup = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "POPUP_CLOSE", param: '' } }))
    }

    closeDetail = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "POPUP_CLOSE", param: 'detail' } }))
    }

    closeImage = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "POPUP_CLOSE", param: 'image' } }))
    }

    onImageLoad = e => {
        this.setState({
            width: e.currentTarget.naturalWidth,
            height: e.currentTarget.naturalHeight
        })
    }

    render() {
        const { type, data } = this.props
        const isQr = type === POPUP_TYPE.QR
        const qrData = isQr ? data : {}
        const isDetail = type === POPUP_TYPE.DETAIL
        const detailData = isDetail ? data : {}
        const isImage = type === POPUP_TYPE.IMAGE
        const imageData = isImage ? data : ''

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
            </div>,
            <div key="image" className="popup-wrap image">
                <div className="dimmed"></div>
                <div className="popup" style={{
                    width: this.state.width, height: this.state.height
                }}>
                    {isImage && <ImageConverter onImageLoad={this.onImageLoad} data={imageData} closeImage={this.closeImage} />}
                    <span className="close" onClick={this.closePopup}>
                        <em className="img"></em>
                    </span>
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

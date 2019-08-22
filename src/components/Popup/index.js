import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddressQrCode from './AddressQrCode'
import ContractDetail from './ContractDetail'
import Scam from './Scam'
import Search from './Search'
import { initPopup } from '../../redux/actions/popupActions'
import { POPUP_TYPE } from 'utils/const'

class Popup extends Component {
    componentWillReceiveProps(nextProps) {
        const { type: current } = this.props
        const { type: next } = nextProps

        if (current === '' && next !== '') {
            this.openPopup(next)
        }
    }

    openPopup = type => {
        switch (type) {
            case POPUP_TYPE.QR:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_OPEN', param: 'qr' } }))
                break
            case POPUP_TYPE.DETAIL:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_OPEN', param: 'detail' } }))
                break
            case POPUP_TYPE.SCAM:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_OPEN', param: 'scam' } }))
                break
            case POPUP_TYPE.SEARCH:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_OPEN', param: 'search' } }))
                break
            case POPUP_TYPE.ABOUT:
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_OPEN', param: 'about' } }))
                break
            default:
        }
    }

    closePopup = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_CLOSE', param: '' } }))
    }
    closeDetail = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_CLOSE', param: 'detail' } }))
    }
    closeScam = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_CLOSE', param: 'scam' } }))
    }
    closeSearch = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_CLOSE', param: 'search' } }))
    }
    closeAbout = () => {
        this.props.initPopup()
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'POPUP_CLOSE', param: 'about' } }))
    }

    render() {
        const { type, data } = this.props
        const isQr = type === POPUP_TYPE.QR
        const qrData = isQr ? data : {}
        const isDetail = type === POPUP_TYPE.DETAIL
        const detailData = isDetail ? data : {}
        const isScam = type === POPUP_TYPE.SCAM
        const scamData = isScam ? data : {}
        const isSearch = type === POPUP_TYPE.SEARCH
        const searchData = isSearch ? data : {}
        return [
            <div key="qr" className="popup-wrap qr">
                <div className="dimmed" />
                <div className="popup">
                    <span className="close" onClick={this.closePopup}>
                        <em className="img" />
                    </span>
                    {isQr && <AddressQrCode data={qrData} />}
                </div>
            </div>,
            <div key="detail" className="popup-wrap detail">
                <div className="dimmed" />
                <div className="popup contract">
                    <span className="close" onClick={this.closePopup}>
                        <em className="img" />
                    </span>
                    {isDetail && <ContractDetail data={detailData} closeDetail={this.closeDetail} />}
                </div>
            </div>,
            <div key="scam" className="popup-wrap scam">
                <div className="dimmed" />
                <div className="popup scam">
                    <span className="close" onClick={this.closePopup}>
                        <em className="img" />
                    </span>
                    {isScam && <Scam data={scamData} closeScam={this.closeScam} />}
                </div>
            </div>,
            <div key='about' className="popup-wrap about" style={{ display: 'none' }}>
                <div className="dimmed"></div>
                <div className="popup">
                    <h1 className="title">About Governance</h1>
                    <p className="txt">ICON Network의 독자적인 기여도 평가 시스템 ‘위임 기여도 증명 DPoc; Delegated Proof of Contribution’를 기반으로 생태계 기여자 모두를 공정하게 평가하고, 그에 따른 합당한 보상을 분배합니다.</p>
                    <div className="box">
                        <p className="sub-title">· Public Treasury</p>
                        <p className="txt">인센티브를 저장해놓는 보관소로 Transaction fee와 보상을 위한 I_SCORE 발행량(ICX로 환산)의 누적량 입니다.</p>
                        <p className="sub-title">· i_rep</p>
                        <p className="txt">대표자당 예상 월간 보상량.</p>
                        <p className="sub-title">· r_rep</p>
                        <p className="txt">대표자 위임 연간 보상률.</p>
                        <p className="sub-title">· Step Price</p>
                        <p className="txt">ICON Network에서 실행되는 Smart contract 수수료 입니다.</p>
                    </div>
                    <div className="btn-holder full">
                        <button className="btn-type-normal size-full" onClick={this.closeAbout}><span>Confirm</span></button>
                    </div>
                </div>
            </div>,
            isSearch && <Search data={searchData} closeSearch={this.closeSearch} />,
        ]
    }
}

function mapStateToProps(state) {
    return {
        type: state.popup.type,
        data: state.popup.data,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initPopup: () => dispatch(initPopup()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Popup)

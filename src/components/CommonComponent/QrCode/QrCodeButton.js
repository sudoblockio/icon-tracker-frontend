import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POPUP_TYPE } from 'utils/const'
import { setPopup } from '../../../redux/actions/popupActions'

class QrCodeButton extends Component {
    
    handleClick = () => {
        const { address } = this.props
        this.props.setPopup({
            type: POPUP_TYPE.QR,
            data: { address }
        })
    }

    render() {
        return (
            <span className="qrcode" onClick={this.handleClick}>
                <em className="img"></em>
            </span>
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        setPopup: payload => dispatch(setPopup(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeButton)
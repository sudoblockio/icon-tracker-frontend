import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POPUP_TYPE } from 'utils/const'
import { setPopup } from '../../../redux/actions/popupActions'

class ImageConverterButton extends Component {
    
    handleClick = () => {

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

export default connect(mapStateToProps, mapDispatchToProps)(ImageConverterButton)
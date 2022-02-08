import React, { Component } from 'react'
import { connect } from 'react-redux'
import { POPUP_TYPE } from '../../../utils/const'
import { setPopup } from '../../../redux/store/popups'
import  Connect  from '../../Header/Connect'

class QrCodeButton extends Component {
    handleClick = () => {
        const { address, contract } = this.props
        this.props.setPopup({
            type: POPUP_TYPE.QR,
            data: { address, contract },  
        })
    }

    connectWallet = () => {
        // use connect component to 
        // handle wallet connect workflow
    }

    render() {
        
        return  (
            this.props.address ? 
            <span className="cv-button" onClick={this.handleClick}>
                {/* <i className="img" /> */}
               Verify a Contract
            </span>
            :
            <span className="qrcode" onClick={this.connectWallet}> 
            | [#]  Connect a Wallet
            </span>
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        setPopup: payload => dispatch(setPopup(payload)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(QrCodeButton)

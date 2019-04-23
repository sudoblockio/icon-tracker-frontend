import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POPUP_TYPE } from 'utils/const'
import { setPopup } from '../../redux/actions/popupActions'
import { reportScam } from "../../redux/actions/addressesActions"
class ReportButton extends Component {

    handleClick = () => {
        const { walletAddress, reportScam, address } = this.props
        this.props.setPopup({
            type: POPUP_TYPE.SCAM,
            data:{ walletAddress, address, reportScam}
        })
    }

    render() {
        return (
            <span className="btn-scam" onClick={this.handleClick}>Report scam</span>
        )
    }
}

function mapStateToProps(state) {
    return {
        walletAddress:state.storage.walletAddress
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setPopup: payload => dispatch(setPopup(payload)),
        reportScam: payload => dispatch(reportScam(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportButton)
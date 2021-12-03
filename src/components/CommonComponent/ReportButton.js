
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { POPUP_TYPE } from '../../utils/const'
import { setPopup } from '../../redux/store/popups'

class ReportButton extends Component {
    handleClick = () => {
        const { address } = this.props
        this.props.setPopup({
            type: POPUP_TYPE.SCAM,
            data: { address },
        })
    }

    render() {
        const { disabled } = this.props

        return (
            <span className={["btn-scam", disabled && "disabled"].join(" ") } onClick={this.handleClick}>
                Report scam
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
)(ReportButton)

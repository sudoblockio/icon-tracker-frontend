import React, { Component } from 'react';

class QrCodeButton extends Component {
    componentDidMount() {
        const event = new CustomEvent('CUSTOM_FX_QRCODE')
        window.dispatchEvent(event)
    }

    handleClick = () => {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick()
        }
    }

    render() {
        return (
            <span className="qrcode" onClick={this.handleClick}>
                <em className="img"></em>
            </span>
        )
    }
}

export default QrCodeButton
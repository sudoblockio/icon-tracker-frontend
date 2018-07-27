import React, { Component } from 'react';
import QrCode from 'qrcode';

const Id = 'qr'
class QrCodeComponent extends Component {
    componentDidMount() {
        this.drawQrCode()
    }

    componentWillReceiveProps(nextProps) {
        const { text, scale } = this.props.text
        const nextText = nextProps.text
        const nextScale = this.props.scale
        if (text !== nextText || scale !== nextScale) {
            this.drawQrCode()
        }    
    }

    drawQrCode () {
        const { text, scale } = this.props
        if (!text || !scale) return

        QrCode.toCanvas(
            document.getElementById(Id), text, {
                margin: 0,
                scale: scale,
                color: {
                    light: '#0000'
                }
            }, (error) => {
                if (error) {
                    console.error(error)
                }
            }
        )
    }

    render() {
        return (
            <canvas id={Id}></canvas>
        );
    }
}

export default QrCodeComponent;

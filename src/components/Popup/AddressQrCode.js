import React, { Component } from 'react';
import {
    QrCodeComponent
} from '../../components'

class AddressQrCode extends Component {

    render() {
        const { data } = this.props
        const { address } = data

        return ([
            <h1 key='h1' className="title">Address</h1>,
            <div key='div' className="qr">
                <QrCodeComponent text={address} scale={5}/>
            </div>,
            <p key='p'>{address}</p>,
        ])
    }
}

export default AddressQrCode

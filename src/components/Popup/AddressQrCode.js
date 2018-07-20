import React, { Component } from 'react';

class AddressQrCode extends Component {
    render() {
        const { 
            data,
            initPopup
        } = this.props
        
        const {
            address
        } = data
        
        return (
            <div className="popup-wrap qr">
                <div className="dimmed"></div>
                <div className="popup">
                    <span className="close" onClick={initPopup}>
                        <em className="img"></em>
                    </span>
                    <h1 className="title">Address</h1>
                    <div className="qr">
                        <img src="../image/qr.png" />
                    </div>
                    <p>{address}</p>
                </div>
            </div>
        )
    }
}

export default AddressQrCode

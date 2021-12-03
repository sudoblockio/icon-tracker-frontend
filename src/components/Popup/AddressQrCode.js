import React, { Component } from 'react';
import {
    QrCodeComponent
} from '../../components'

class AddressQrCode extends Component {

    render() {
        const { data } = this.props
        const { address } = data

        return ([
            <h1 key='h1' className="title">Submit a Contract for Verification</h1>,
            <div className="cv-form-container">
                <form>
                    <section>
                    <fieldset>
                    <p>
                    Enter An Address: <input class="txt-type-search modified" type="text" name="address" />
                    </p>
                    <br/>
                    </fieldset>
                    </section>
                    <div>
                    <section>
                        <h6>Addt'l Details</h6>

                        <div className="cv-label-container">
                        <p className="cv-label">
                        Name:</p>
                         <input className="txt-type-search modified cv" type="text" name="name" />
                         </div>

                        <div className="cv-label-container">
                        <p className="cv-label">
                        Website: 
                        </p>
                        <input class="txt-type-search modified" type="text" name="website" />
                        </div>

                        <div className="cv-label-container">
                        <p className="cv-label">
                        Email: 
                        </p>
                        <input class="txt-type-search modified" type="email" name="email" />
                        </div>


                        <div className="cv-label-container">
                        <p className="cv-label">
                        p_rep Address:
                        </p>
                        <input class="txt-type-search modified" type="text" name="prep_address" />
                        </div>
                    </section>
                    </div>
                    <br/>
                    <div>
                        <section>
                            <h6>Social Accounts</h6>
                            <div className="cv-label-container">
                            <p className="cv-label">
                            Github: </p><input class="txt-type-search modified" type="email" name="email" />
                            </div>
                            <div className="cv-label-container">
                            <p className="cv-label">
                            Twitter:</p> <input class="txt-type-search modified" type="email" name="email" />
                            </div>
                            <div className="cv-label-container">
                            <p className="cv-label">
                            Telegram:</p><input class="txt-type-search modified" type="email" name="email" />
                            </div>
                        </section>
                    </div>
                </form>

                <div className='btn-holder full'>
                <input type="file" id="myFile" name="filename"/>
                    <button className='btn-type-normal size-full'>
                        <span>Submit</span>
                    </button>
                </div>
            </div>
            // <div key='div' className="qr">
            //     <QrCodeComponent text={address} scale={5}/>
            // </div>,
            // <p key='p'>{address}</p>,
        ])
    }
}

export default AddressQrCode

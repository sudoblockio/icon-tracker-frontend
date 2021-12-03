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
                        <h4>Addt'l Details</h4>
                        <p>
                        Name: <input class="txt-type-search modified" type="text" name="name" />
                        </p>
                        <p>
                        Website: <input class="txt-type-search modified" type="text" name="website" />
                        </p>
                        <p>
                        Email: <input class="txt-type-search modified" type="email" name="email" />
                        </p>
                        <p>
                        p_rep Address: <input class="txt-type-search modified" type="text" name="prep_address" />
                        </p>
                    </section>
                    </div>
                    <br/>
                    <div>
                        <section>
                            <h4>Social Accounts</h4>
                            <p>
                            Github: <input class="txt-type-search modified" type="email" name="email" />
                            </p>
                            <p>
                            Twitter: <input class="txt-type-search modified" type="email" name="email" />
                            </p>
                            <p>
                            Telegram: <input class="txt-type-search modified" type="email" name="email" />
                            </p>
                        </section>
                    </div>
                </form>
                <div className='btn-holder full'>
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

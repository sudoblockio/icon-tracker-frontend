import React, { Component } from 'react';
import {
    QrCodeComponent
} from '../../components'
import { sendTransaction } from '../../redux/store/iiss'

class AddressQrCode extends Component {
    handleSubmit = (e) => {
        console.log("handle submit")
        e.preventDefault()
        sendTransaction(
            { fromAddress: this.props.data.address,} 
        )



    }
    // ICONEXsendTransaction= (address) => {
    //     sendTransaction(address)
    // }
    render() {
        const { data } = this.props
        const { address } = data

        return ([
            <h1 key='h1' className="title">Submit a Contract for Verification</h1>,
            <div className="cv-form-container">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <section>
                    <fieldset>
                    <p>
                    Address: <input class="txt-type-search modified" type="text" name="address" value={address} placeholder={address}/>
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
                        <input className="txt-type-search modified" type="text" name="website" />
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
                    <div className='btn-holder full'>
                    <input type="file" id="myFile" name="filename"/>
                    <button type="submit"className='btn-type-normal size-full' >
                        <span>Sign & Submit</span>
                    </button>
                    </div>
                </form>

                
                

                
            </div>
            // <div key='div' className="qr">
            //     <QrCodeComponent text={address} scale={5}/>
            // </div>,
            // <p key='p'>{address}</p>,
        ])
    }
}

export default AddressQrCode

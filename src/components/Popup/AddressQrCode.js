import React, { Component } from 'react';
import {
    QrCodeComponent
} from '../../components'
import { sendTransaction } from '../../redux/store/iiss'

class AddressQrCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city:"",
            countract_address:this.props.contract,
            country:"",
            discord:"",
            facebook:"",
            github:"",
            keybase:"",
            license:"",
            long_description:"", 
            p_rep_address:"", 
            reddit:"",
            short_description:"",
            steemit:"",
            team_name:"",
            telegram:"",
            twitter:"",
            website:"",
            wechat:"",
            youtube:"",
            zipped_source_code:""}
    }

    handleSubmit = (e) => {
        e.preventDefault()
        sendTransaction(
            { fromAddress: this.props.data.address, contract:this.props.data.contract} 
        )



    }

    setName = (e) => {
        this.setState({team_name: e.target.value})
    }
    setCity = (e) => {
        this.setState({city: e.target.value})
    }
    setCountry = (e) => {
        this.setState({country: e.target.value})
    }
    setWebsite = (e) => {
        this.setState({website: e.target.value})
    }
    setShortDesc = (e) => {
        this.setState({shortDesc: e.target.value})
    }
    setLongDesc = (e) => {
        this.setState({longDesc: e.target.value})
    }





    render() {

    
        const { data } = this.props
        const { address } = data

        return ([
            <h1 key='h1' className="title">Submit a Contract for Verification</h1>,
            <div className="cv-form-container verify">
                <form onSubmit={(e) => this.handleSubmit(e)} enctype="multipart/form-data" id="myForm">
                    <section>
                    <fieldset>
                    <p>
                    </p>
                    <br/>
                    </fieldset>
                    </section>
                    <div className="verify-form">
                    <div>
                    <section>
                    <div className="cv-label-container">
                        <p className="cv-label">
                    Wallet Address: </p><input class="txt-type-search modified" type="text" name="address" value={address} placeholder={address}/>
                        {/* <h6>Addt'l Details</h6> */}
                    </div>
                        <div className="cv-label-container">
                        <p className="cv-label">
                        Team Name:</p>
                         <input className="txt-type-search modified cv" autocomplete="organization" value={this.state.name} type="text" name="name" onChange={(e) => this.setName(e)} />
                         </div>
                        <div className="cv-label-container">
                        <p className="cv-label">
                        Short Desc:</p>
                         <input className="txt-type-search modified cv" autocomplete="off" value={this.state.shortDesc} type="text" name="shortdesc" onChange={(e) => this.setShortDesc(e)} />
                         </div>
                        <div className="cv-label-container">
                        <p className="cv-label">
                        Long Desc:</p>
                         <input className="txt-type-search modified cv" autocomplete="off" value={this.state.longDesc} type="textarea" name="longdesc" onChange={(e) => this.setLongDesc(e)} />
                         </div>

                        <div className="cv-label-container">
                        <p className="cv-label">
                        City: 
                        </p>
                        <input className="txt-type-search modified" type="text" name="city" autocomplete="city" value={this.state.city} onChange={(e) => this.setCity(e)}/>
                        </div>

                        <div className="cv-label-container">
                        <p className="cv-label">
                        Country: 
                        </p>
                        <input class="txt-type-search modified" type="country" name="country" autocomplete="country-name" value={this.state.country} onChange={(e) => this.setCountry(e)} />
                        </div>
                        <div className="cv-label-container">
                        <p className="cv-label">
                        Website: 
                        </p>
                        <input class="txt-type-search modified" type="website" name="website" autocomplete="website"  value={this.state.website} onChange={(e) => this.setWebsite(e)} />
                        </div>


                        <div className="cv-label-container">
                        <p className="cv-label">
                        p_rep Address:
                        </p>
                        <input class="txt-type-search modified" type="text" name="prep_address" />
                        </div>
                    </section>
                    <div>
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

                    </div>
                    </div>
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

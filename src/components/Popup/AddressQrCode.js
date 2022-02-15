import React, { Component } from 'react';
import { sendTransaction } from '../../redux/store/iiss'

class AddressQrCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: "",
            contract_address: this.props.contract,
            country: "",
            discord: "",
            facebook: "",
            github: "",
            keybase: "",
            license: "",
            long_description: "",
            p_rep_address: "",
            reddit: "",
            short_description: "",
            steemit: "",
            team_name: "",
            telegram: "",
            twitter: "",
            website: "",
            wechat: "",
            youtube: "",
            zipped_source_code: "",
            isActive: false,
            flipLicense: false,
            flipZip: false,
            gradle_target:"",
            gradle_task: "optimizedJar",
            srcCodeLocation: ""
        }
    }
    // accepts our user input file object[0].
    // More information:
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    fileToBinaryString = (file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file)
        return new Promise(resolve => {
            reader.onloadend = () => {
                // wait unti file is read,
                // result is the ArrayBuffer: 
                resolve(reader.result)
            }
        })
    }

    arrayBufferToHex(arraybufferdata) {
        // Treat the ArrayBuffer like a string:
        let str = arraybufferdata;
        let result = '';
        for (let i=0; i< str.length; i++) {
            // get EACH idx's charCode and convert that to base 16
           // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
            const hex = str.charCodeAt(i).toString(16);
            result += (hex.length ===2? hex: '0' + hex)
        } 
        return "0x"+result.toUpperCase()
    }

    formData = new FormData();
    handleSubmit = (e) => {
        e.preventDefault()
        let file = document.getElementById("contractzip").files[0]
        file ? 
        this.fileToBinaryString(file).then(res => {
            const hex = this.arrayBufferToHex(res)
            sendTransaction({ 
                fromAddress: this.props.data.address,
                contract: this.props.data.contract,
                zip: hex,
                city: this.state.city, 
                country: this.state.country, 
                discord: this.state.discord, 
                facebook: this.state.facebook,
                github: this.state.github,
                keybase: this.state.keybase,
                license: this.state.license,
                long_description: this.state.long_description,
                p_rep_address: this.state.p_rep_address,
                reddit: this.state.reddit,
                short_description: this.state.short_description,
                steemit: this.state.steemit,
                team_name: this.state.team_name,
                telegram: this.state.telegram,
                twitter: this.state.twitter,
                website: this.state.website,
                wechat: this.state.wechat,
                youtube: this.state.youtube,
                gradle_target: this.state.gradle_target,
                gradle_task:this.state.gradle_task,
                source_code_location: this.state.srcCodeLocation
                }
            )
        })

        :

        sendTransaction({ 
            fromAddress: this.props.data.address,
            contract: this.props.data.contract,
            zip: "",
            city: this.state.city, 
            country: this.state.country, 
            discord: this.state.discord, 
            facebook: this.state.facebook,
            github: this.state.github,
            keybase: this.state.keybase,
            license: this.state.license,
            long_description: this.state.long_description,
            p_rep_address: this.state.p_rep_address,
            reddit: this.state.reddit,
            short_description: this.state.short_description,
            steemit: this.state.steemit,
            team_name: this.state.team_name,
            telegram: this.state.telegram,
            twitter: this.state.twitter,
            website: this.state.website,
            wechat: this.state.wechat,
            youtube: this.state.youtube,
            gradle_target: this.state.gradle_target,
            gradle_task:this.state.gradle_task,
            source_code_location: this.state.srcCodeLocation,
            github_repo: this.state.github_repo, 
            github_org: this.state.github_org,
            github_directory: this.state.github_directory,
            github_release: this.state.github_release, 
            }
        )

    }
    setName = (e) => {
        this.setState({ team_name: e.target.value })
    }
    setPrep = (e) => {
        this.setState({p_rep_address: e.target.value})
    }
    setFacebook = (e) => {
        this.setState({facebook: e.target.value})
    }
    setCity = (e) => {

        this.setState({ city: e.target.value })
    }
    setCountry = (e) => {

        this.setState({ country: e.target.value })
    }
    setWebsite = (e) => {

        this.setState({ website: e.target.value })
    }
    setShortDesc = (e) => {

        this.setState({ short_description: e.target.value })
    }
    setLongDesc = (e) => {

        this.setState({ long_description: e.target.value })
    }
    setGithub = (e) => {

        this.setState({ github: e.target.value })
    }
    setTwitter = (e) => {

        this.setState({ twitter: e.target.value })
    }
    setTelegram = (e) => {

        this.setState({ telegram: e.target.value })
    }
    setReddit = (e) => {

        this.setState({ reddit: e.target.value })
    }
    setYoutube = (e) => {

        this.setState({ youtube: e.target.value })
    }
    setDiscord = (e) => {

        this.setState({ discord: e.target.value })
    }
    setSteemit = (e) => {

        this.setState({ steemit: e.target.value })
    }
    setWeChat = (e) => {

        this.setState({ wechat: e.target.value })
    }
    setKeybase = (e) => {

        this.setState({ keybase: e.target.value })
    }
    setLicense = (e) => {
        console.log(e, "what e")
        this.setState({ license: e.target.value })
    }
    setZip = async (e) => {
        let file = document.getElementById("contractzip").files[0]
        this.setState({zipped_source_code: file})
    }
    setSrcCodeLocation = (e) => {
        this.setState({srcCodeLocation: e.target.value})
    }
    accordion='acc-closed'
    flipActive=() => {
        this.setState({isActive: !this.state.isActive})
        this.accordion=!this.accordion
    }
    setGradleTarget=(e)=> {
        this.setState({gradle_target: e.target.value})
    }
    setGradleTask=(e)=>{
        this.setState({gradle_task: e.target.value})
    }
    setOrg = (e) => {
        this.setState({github_org: e.target.value})
    }
    setRepo = (e) => {
        this.setState({github_repo: e.target.value})
    }
    setRelease = (e) => {
        this.setState({github_release: e.target.value})
    }
    setDirectory = (e) => {
        this.setState({github_directory: e.target.value})
    }
    flipLicense = () => {
        this.setState({flipLicense: !this.state.flipLicense})
    }
    flipZip = () => {
        this.setState({flipZip: !this.state.flipZip})
    }
    flipGit = () => {
        this.setState({flipGit: !this.state.flipGit})
    }


    render() {
        const { data } = this.props
        const { address } = data
        return ([
            <>
                <div className="cv-popup-container" >
                <h2 key='h2' className="cv-title">Upload Contract Source Code and / or Associate Metadata for Your Contract  </h2>
                <div className="howto-container"><p className='cv-howto small'>
                    <br />
                    <p className="cv-howto small">To upload contract source code, follow these steps:</p>

                    <ol>
                        <li className="cv-howto small">1. Zip your code ahead of time with the "build.gradle" and "settings.gradle" files along with the directory with your source code.</li>
                        <li className="cv-howto small">2. Provide the path to the output binary along with the task (typically "optimizedJar") needed to build your contract.</li>
                        <li className="cv-howto small">3. Optional - Provide a target for your gradle build if needed to build your contract.  Would build with "./gradlew :TARGET:TASK"</li>
                        <li className="cv-howto small"> </li>
                        
                    </ol>

                    <p className="cv-howto small">For more information, check out the<b> <a style={{ textDecoration: 'underline dotted grey' }} href="https://github.com/geometry-labs/icon-contracts">docs</a></b>.</p>
                    </p>
                    </div>
                <div className = 'accordion-top'>
            <div className='cv-form-container verify'>
                    <h1 className="cvp-column-title">Java Compilation Options</h1>


                <div className="cv-label verify-title" >Zip Upload
                <p className='fineprint'>up to 500kb </p> 
                </div> 
                             
                
                
                <div className='cv-form-container upload'>
                <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            <div className='cx-submit-tooltip'>[?]
                                            <span className='cx-submit-tooltip-text'>An <b>optional</b> field for when building with gradlew - Ex, "./gradlew :TARGET:TASK". Leave blank to just run task.</span>
                                            </div>
                                            Gradle Target:
                                        </p>
                                        <input class="txt-type-search modified" type="gradle_target" name="gradle_target"  placeholder='' value={this.state.gradle_target} onChange={(e) => this.setGradleTarget(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                        <div className='cx-submit-tooltip'>[?]
                                        <span className='cx-submit-tooltip-text'>The gradle task to run - Ex, "./gradlew TASK" normally just `optimizedJar`</span></div>
                                            Gradle Task:
                                        </p>
                                        <input class="txt-type-search modified" type="gradle_task" name="gradle_task"  placeholder='optimizedJar' value={this.state.gradle_task} onChange={(e) => this.setGradleTask(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                        <div className='cx-submit-tooltip'>[?]
                                        <span className='cx-submit-tooltip-text'>The path to the optimized jar including the directory being unzipped - Ex, `zip-name/contract-name/build/libs/contract-name-0.1.0-optimized.jar`</span></div>
                                            Src Code Path:
                                        </p>
                                        <input class="txt-type-search modified" type="srcpath" name="srcpath"  placeholder='../../to/cx/src/code' value={this.state.srcCodeLocation} onChange={(e) => this.setSrcCodeLocation(e)} />
                                    </div>

                <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            .zip File:</p><input type="file" accept=".zip" id="contractzip"  name="cxsrccode" onChange={(e) => this.setZip(e.target.value)}/>
                                    </div>
                                    </div>


                                    <div>
                                    <div className="cv-label verify-title">Github Resources</div>               
                                    <div className='cv-form-container upload'>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            {/* <div className='cx-submit-tooltip'>[?]
                                            <span className='cx-submit-tooltip-text'>An <b>optional</b> field for when building with gradlew - Ex, "./gradlew :TARGET:TASK". Leave blank to just run task.</span>
                                            </div> */}
                                            Github Repository:
                                        </p>
                                        <input class="txt-type-search modified" type="github_repo" name="github_repo"  placeholder='' value={this.state.github_repo} onChange={(e) => this.setRepo(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                        {/* <div className='cx-submit-tooltip'>[?]
                                        <span className='cx-submit-tooltip-text'>The gradle task to run - Ex, "./gradlew TASK" normally just `optimizedJar`</span></div> */}
                                            Github Organization:
                                        </p>
                                        <input class="txt-type-search modified" type="github_org" name="github_org"  placeholder='' value={this.state.github_org} onChange={(e) => this.setOrg(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                        {/* <div className='cx-submit-tooltip'>[?]
                                        <span className='cx-submit-tooltip-text'>The path to the optimized jar including the directory being unzipped - Ex, `zip-name/contract-name/build/libs/contract-name-0.1.0-optimized.jar`</span></div> */}
                                            Github Directory:
                                        </p>
                                        <input class="txt-type-search modified" type="github_directory" name="github_directory"  placeholder='' value={this.state.github_directory} onChange={(e) => this.setDirectory(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                        {/* <div className='cx-submit-tooltip'>[?]
                                        <span className='cx-submit-tooltip-text'>The path to the optimized jar including the directory being unzipped - Ex, `zip-name/contract-name/build/libs/contract-name-0.1.0-optimized.jar`</span>
                                        </div> */}
                                            Github Release:
                                        </p>
                                        <input class="txt-type-search modified" type="github_release" name="github_release"  placeholder='' value={this.state.github_release} onChange={(e) => this.setRelease(e)} />
                                    </div>

                <div className="cv-label-container verify-row">
                                        
                                    </div>
                                    </div>
                                    </div>

                                    

                                    




                    
                </div>


                                    

                                    




                    
                </div>
                
                <div className="cv-form-container verify">
                {/* <h1 className='cvp-column-title'>Metadata</h1> */}
                    <form actionmethod="POST"onSubmit={(e) => this.handleSubmit(e)} encType="multipart/form-data" id="contractform">
                        <div className="cv-label-container verify-row">
                            <p className="cv-label">
                                Wallet: </p><input className="txt-type-search modified" type="text" name="address" readOnly={true} value={address} placeholder={address} />
                                
                        </div>
                        <div className="cv-label-container verify-row">
                            <p className="cv-label">
                                Contract: </p><input className="txt-type-search modified" type="text" name="contract" readOnly={true} value={this.props.data.contract} placeholder={this.props.data.contract} />

                        </div>
                        {/* <section>
                            <fieldset>
                                <p>
                                </p>
                                <br />
                            </fieldset>
                        </section> */}
                        <div className="verify-form">
                            <div>
                                <section>

                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Team Name:</p>
                                        <input className="verify-row txt-type-search" autocomplete="organization" value={this.state.name} type="text" name="name" onChange={(e) => this.setName(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            p_rep Address:</p>
                                        <input className="verify-row txt-type-search" autocomplete="organization" value={this.state.p_rep_address} type="text" name="name" onChange={(e) => this.setPrep(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            License:</p><input class="txt-type-search modified" type="text" name="license" placeholder="" value={this.state.license} onChange={(e) => this.setLicense(e)} />
                                    </div>


                                    
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Website:
                                        </p>
                                        <input class="txt-type-search modified" type="website" name="website" autocomplete="website" value={this.state.website} onChange={(e) => this.setWebsite(e)} />
                                    </div>
                                    <div className="cv-label-container">
                                        <p className="cv-label">
                                            Short Desc:</p>
                                        <input className="txt-type-search modified cv" autocomplete="off" value={this.state.shortDesc} type="text" name="shortdesc" onChange={(e) => this.setShortDesc(e)} />
                                    </div>
                                    <div className = 'accordion-top' >
                                    <div className="cv-label verify-title" onClick={() => this.flipActive()}>{this.state.isActive ? '▼ Social Media' : '► Social Media:'}</div>
                                    {this.state.isActive && 
        
                                    <div className={`${this.accordion}`}>

                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Github: </p><input class="txt-type-search modified" type="text" name="github" value={this.state.github} onChange={(e) => this.setGithub(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Twitter:</p> <input class="txt-type-search modified" type="text" name="twitter" placeholder="" value={this.state.twitter} onChange={(e) => this.setTwitter(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Telegram:</p><input class="txt-type-search modified" type="text" name="telegram" value={this.state.telegram} onChange={(e) => this.setTelegram(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Reddit: </p><input class="txt-type-search modified" type="text" name="reddit" value={this.state.reddit} onChange={(e) => this.setReddit(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Youtube:</p> <input class="txt-type-search modified" type="text" name="youtube" value={this.state.youtube} onChange={(e) => this.setYoutube(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Facebook:</p><input class="txt-type-search modified" type="text" name="facebook" value={this.state.facebook} onChange={(e) => this.setFacebook(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Discord:</p><input class="txt-type-search modified" type="text" name="discord" value={this.state.discord} onChange={(e) => this.setDiscord(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Steemit:</p><input class="txt-type-search modified" type="text" name="steemit" value={this.state.steemit} onChange={(e) => this.setSteemit(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            WeChat:</p><input class="txt-type-search modified" type="text" name="wechat" value={this.state.wechat} onChange={(e) => this.setWeChat(e)} />
                                    </div>
                                    <div className="cv-label-container verify-row">
                                        <p className="cv-label">
                                            Keybase:</p><input class="txt-type-search modified" type="text" name="keybase" value={this.state.keybase} onChange={(e) => this.setKeybase(e)} />
                                    </div>
                                    </div>
                                    
                                    
                                    
                                      }  

                                    {/* <div className="cv-label verify-title" ></div> */}
                                    

                                    
                                    



                                </div>                              

                                    



                                    {/* <div className="cv-label-container">
                        <p className="cv-label">
                        p_rep Address:
                        </p>
                        <input class="txt-type-search modified" type="text" name="prep_address" />
                        </div> */}
                                </section>

                            </div>
                        </div>
                        <div className='btn-holder full'>
                            {/* <input type="file" id="myFile" name="filename"/> */}
                            <button type="submit" className='btn-type-normal size-full' >
                                <span>Sign & Submit</span>
                            </button>
                        </div>
                    </form>




                    </div>
                </div>

            </>
        ])
    }
}

export default AddressQrCode

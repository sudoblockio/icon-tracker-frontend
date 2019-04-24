import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import icon from "../../style/image/img-icon.png"
import complete from "../../style/image/img-complete.png"
import { requestAddress } from "../../utils/connect";
import { reportScam } from "../../redux/actions/addressesActions"
import { setAddress } from "../../redux/actions/storageActions"

class Scam extends Component {
    state = {
        connectStatus:this.props.walletAddress !== "" ? 2 : 0,
        refUrl:'',
        fileName:'',
        dropBoxClass:"",
        msg:'',
        imgFile:null
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps,"next")
        if(nextProps.data.walletAddress !== ""){
            this.setState({
                connectStatus:1
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            url:e.target.value
        })
    }
    readFile = (file) => {
        if(file && file[0]){
            const fileName = file[0].name;
            if(!file[0].type.includes('image')){
                this.setState({
                    fileName,
                    dropBoxClass:"error",
                    msg:'Incorrect file form.'
                })
                return;
            }
            if(file[0].size/1024/1024 > 1){
                this.setState({
                    fileName,
                    dropBoxClass:"error",
                    msg:'Exceeded file size limit.'
                })
                return;
            }
                this.setState({
                    fileName,
                    dropBoxClass:"normal",
                    imgFile:file
                })
        }
        
    }
    handleClickDelete = () => {
        this.setState({
            dropBoxClass:'',
            imgFile:null,
            msg:''
        })
    }
    handleSubmit = async () => {
        const { reportScam, data, walletAddress } = this.props;
        const { address } = data;
        const { refUrl, imgFile } = this.state;
        await reportScam(
            {
                reported:address,
                reporter:walletAddress,
                refUrl,
                imgFile
            }
        )
        this.props.closeScam()
    }
    onClickNext = async () => {
        const {connectStatus} = this.state;
        if(connectStatus === 1){
            this.setState({
                connectStatus:2
            })
        }else if(connectStatus === 0){
            const walletAddress = await requestAddress();
            await this.props.setAddress(walletAddress);
        }
    }  
    renderContents = () => {
        const { connectStatus, dropBoxClass, url, fileName, msg } = this.state;
        const { walletAddress } = this.props;

        if(connectStatus === 2){
            return (
                <Fragment><h3>Select a file or drag & drop to the area below.</h3>
                <Dropzone onDrop={file => this.readFile(file)}>
                    {({getRootProps, getInputProps}) => (
                        <Fragment>
                            <div className={`drop-box ${dropBoxClass}`} {...getRootProps()} onClick={()=>{
                                return;
                                }}>
                                {dropBoxClass !== "" && <Fragment>
                                <i className="img"></i>
                                <span className="ellipsis">{fileName}</span>
                                {dropBoxClass ==="error" && <span className="msg">{msg}</span>}
                                <i className="img" onClick={this.handleClickDelete}></i>
                              </Fragment>}
                                 {dropBoxClass === "" && <span>Please drag your file here</span>}
                                </div>   
                            <label htmlFor="file">Select file</label>
                            <input id="file" className="btn-type-normal select" {...getInputProps()}/>
                        </Fragment>
                    )}
                </Dropzone>
				<h2>The scam site URL (Optional)</h2>
                <input type="text" className="txt-type over" placeholder="Enter scam site URL" onChange={this.handleChange} value={url} />
				<div className="btn-holder">
					<button className="btn-type-normal" disabled={dropBoxClass === "error" ? true : false} onClick={this.handleSubmit}><span>Summit</span></button>
				</div>
            </Fragment>
            )
        }else if(connectStatus === 0 || connectStatus === 1){
            return(
            <Fragment>
                <div className="icon">
				    { connectStatus === 0 ? <img src={icon} />: <img src={complete} />}
				</div>
				<p className="sub-title">Connect to ICONex</p>
				<p className="txt">{connectStatus === 0 ? "ICONex지갑을 연동 해야 신고가 가능합니다.": "ICONex지갑이 연동 되었습니다."}</p>
				{connectStatus === 1 && <p className="address">{walletAddress}</p>}
				<div className="btn-holder">
					<button className="btn-type-normal size-half" onClick={this.props.closeScam}><span>Cancel</span></button>
					<button className="btn-type-normal size-half" onClick={this.onClickNext}><span>{connectStatus === 0 ? "Connect":"Next"}</span></button>
				</div>
            </Fragment> )
        }
    }
    render() {
        return (
            <Fragment>
            <h1 key="h1" className="title">Report scam</h1>
            <div key="div" className="box">
                {this.renderContents()}
            </div>
            </Fragment>
            )
    }
}

function mapStateToProps(state) {
    return {
        walletAddress:state.storage.walletAddress
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reportScam: payload => dispatch(reportScam(payload)),
        setAddress: payload => dispatch(setAddress(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Scam)
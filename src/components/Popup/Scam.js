import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import icon from '../../style/image/img-icon.png'
import complete from '../../style/image/img-complete.png'
import { requestAddress } from '../../utils/connect'
import { reportScam } from '../../redux/actions/reportAction'
import { setAddress } from '../../redux/actions/storageActions'

class Scam extends Component {
    state = {
        connectStatus: this.props.walletAddress !== '' ? 2 : 0,
        refUrl: '',
        fileName: '',
        dropBoxClass: '',
        msg: '',
        imgFile: null,
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.walletAddress !== '') {
            this.setState({
                connectStatus: 1,
            })
        }
    }
    handleChange = e => {
        this.setState({
            refUrl: e.target.value,
        })
    }
    readFile = file => {
        if (file && file[0]) {
            const fileName = file[0].name
            if (!file[0].type.includes('image')) {
                this.setState({
                    fileName,
                    dropBoxClass: 'error',
                    msg: 'Incorrect file form.',
                })
                return
            }
            if (file[0].size / 1024 / 1024 > 5) {
                this.setState({
                    fileName,
                    dropBoxClass: 'error',
                    msg: 'Exceeded file size limit.',
                })
                return
            }
            this.setState({
                fileName,
                dropBoxClass: 'normal',
                imgFile: file,
            })
        }
    }
    handleClickDelete = () => {
        this.setState({
            dropBoxClass: '',
            imgFile: null,
            msg: '',
        })
    }
    handleSubmit = async () => {
        const { reportScam, data, walletAddress } = this.props
        const { address } = data
        const { refUrl, imgFile } = this.state
        await reportScam({
            reported: address,
            reporter: walletAddress,
            refUrl,
            imgFile,
        })
        this.props.closeScam()
    }
    onClickNext = async () => {
        const { connectStatus } = this.state
        if (connectStatus === 1) {
            this.setState({
                connectStatus: 2,
            })
        } else if (connectStatus === 0) {
            const walletAddress = await requestAddress()
            this.props.setAddress(walletAddress)
        }
    }

    render() {
        const { connectStatus, dropBoxClass, refUrl, fileName, msg } = this.state
        const { walletAddress } = this.props
        return (
            <Fragment>
                <h1 key="h1" className="title">
                    Report scam
                </h1>
                <div key="div" className="box">
                    {connectStatus === 2 ? (
                        <Fragment>
                            <h2>The scam site URL or description. <span>(Optional)</span></h2>
                            <input
                                type="text"
                                className="txt-type over"
                                placeholder="Enter scam site URL or description"
                                onChange={this.handleChange}
                                value={refUrl}
                            />
                            <h3>Select a file or drag & drop to the area below. <span>(Optional)</span></h3>
                            <Dropzone onDrop={file => this.readFile(file)}>
                                {({ getRootProps, getInputProps }) => (
                                    <Fragment>
                                        <div
                                            className={`drop-box ${dropBoxClass}`}
                                            {...getRootProps()}
                                            onClick={() => {
                                                return
                                            }}
                                        >
                                            {dropBoxClass !== '' && (
                                                <Fragment>
                                                    <i className="img" />
                                                    <span className="ellipsis">{fileName}</span>
                                                    {dropBoxClass === 'error' && <span className="msg">{msg}</span>}
                                                    <i className="img" onClick={this.handleClickDelete} />
                                                </Fragment>
                                            )}
                                            {dropBoxClass === '' && <span>Please drag your file here.<br/>(Maximum upload file is 5MB.)</span>}
                                        </div>
                                        <label htmlFor="file">Select file</label>
                                        <input id="file" className="btn-type-normal select" {...getInputProps()} />
                                    </Fragment>
                                )}
                            </Dropzone>
                            <div className="btn-holder full">
                                <button className="btn-type-fill size-half" onClick={this.props.closeScam}>
                                    <span>{'Cancel'}</span>
                                </button>                                
                                <button className="btn-type-normal size-half" disabled={dropBoxClass === 'error' ? true : false} onClick={this.handleSubmit}>
                                    <span>Submit</span>
                                </button>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="icon">{connectStatus === 0 ? <img src={icon} alt="icon" /> : <img src={complete} alt="complete" />}</div>
                            <p className="sub-title">Connect to ICONex</p>
                            <p className="txt">
                                {connectStatus === 0 ? 'Reporting is only available after you connect the ICONex wallet.' : 'ICONex wallet is connected.'}
                            </p>
                            {connectStatus === 1 && <p className="address">{walletAddress}</p>}
                            <div className="btn-holder full">
                                <button className="btn-type-fill size-half" onClick={this.props.closeScam}>
                                    <span>{'Cancel'}</span>
                                </button>
                                <button className="btn-type-normal size-half" onClick={this.onClickNext}>
                                    <span>{connectStatus === 0 ? 'Connect' : 'Next'}</span>
                                </button>
                            </div>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        walletAddress: state.storage.walletAddress,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reportScam: payload => dispatch(reportScam(payload)),
        setAddress: payload => dispatch(setAddress(payload)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Scam)

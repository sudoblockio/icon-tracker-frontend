import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { makeDownloadLink, tokenText, isValidData } from '../../../../utils/utils'
import { getContractABI } from '../../../../redux/store/iiss'
import { CopyButton, LoadingComponent } from '../../../../components'

class ContractCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeLink: '',
            updatedLink: '',
            cxABI: ''
        }
    }

    async componentDidMount() {
        const { contract } = this.props
        const { data } = contract
        const { public_key } = data
        const cxABICode = await getContractABI(public_key)
        let abi, code
        cxABICode ? abi = cxABICode.abi : abi=""
        cxABICode ? code = cxABICode.source_code_link : code =""
        // const srcCodeLink = await getSrcCodeLink(public_key)
        this.setState({activeLink: code, cxABI: abi})
    }

    // getDownloadLink = async () => {
    //     const { contract } = this.props
    //     const { data } = contract
    //     const { public_key, newVersion } = data
    //     if (isValidData(public_key)) {
    //         // const activeLink =  await makeDownloadLink(public_key, this.state.activeLink) 
    //         // const updatedLink = isValidData(newVersion) ? await makeDownloadLink(public_key, newVersion) : ''
    //         // this.setState({ activeLink, updatedLink })
    //     }
    // }

    render() {
        console.log(this.state, "cx code state")
        console.log(this.props, "cx code props")
        const { activeLink, updatedLink } = this.state
        const { contract } = this.props
        const { data } = contract
        const { public_key, name, symbol, } = data
        // const { loading, data: abiData, error } = contractAbi
        return (
            <div className="contents">
                <div className="table-box">
                    <table className="table-typeL">
                        <thead>
                            <tr>
                                <th>Contract Name</th>
                                <th>Active </th>
                                {/* <th>Updated Contract Source Code</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td>{tokenText(name, symbol)}</td>
                                <DownloadLink link={activeLink} name={`cx_src_code.zip`} />
                                {/* <DownloadLink link={updatedLink} name={`${name}_${newVersion}.zip`} /> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="code-box api">
                    <div className="title-group">
                        <span className="title">Contract ABI</span>
                        <CopyButton data={JSON.stringify(this.state.cxABI)} title={'Copy ABI'} disabled={''} />
                    </div>
                    {
                    // loading ? 
                    // ( <LoadingComponent height="230px" /> ) 
                    // : 
                        <div className="scroll">
                            <p className="txt" style={{ whiteSpace: 'pre' }}>
                                {JSON.stringify(this.state.cxABI, null, '\t')}
                            </p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const DownloadLink = ({ link, name }) => {
    const Content = () => {
        console.log(link, "from Download Link")
        if (link) {
            console.log(link, "from Download Link after if")
            console.log(name, "from Download link name")

            return (
                <td>
                    <span>
                        <i className="img" />
                        <a href={link} download={name}>
                            Download
                        </a>
                    </span>
                </td>
            )
        } else {
            return <td>-</td>
        }
    }
    return Content()
}

export default withRouter(ContractCode)

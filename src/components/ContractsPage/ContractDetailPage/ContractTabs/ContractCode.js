import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { makeDownloadLink, tokenText, isValidData } from '../../../../utils/utils'
import { getSrcCodeLink } from '../../../../redux/api/restV3/iiss'
import { CopyButton, LoadingComponent } from '../../../../components'

class ContractCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeLink: '',
            updatedLink: '',
        }
    }

    async componentDidMount() {
        const { contract } = this.props
        const { data } = contract
        const { public_key } = data
        this.getDownloadLink()
        const srcCodeLink = await getSrcCodeLink(public_key)
        this.setState({activeLink: srcCodeLink})
    }

    getDownloadLink = async () => {
        const { contract } = this.props
        console.log(this.props, "download link props")
        const { data } = contract
        const { public_key, contractVersion, newVersion } = data
        if (isValidData(public_key)) {
            const activeLink =  await makeDownloadLink(public_key, this.state.activeLink) 
            const updatedLink = isValidData(newVersion) ? await makeDownloadLink(public_key, newVersion) : ''
            console.log(activeLink, "the active link")
            this.setState({ activeLink, updatedLink })
        }
    }

    render() {
        const { activeLink, updatedLink } = this.state
        const { contract, contractAbi } = this.props
        const { data } = contract
        console.log(data, "render code data")
        const { public_key, name, symbol, contractVersion, newVersion } = data
        const { loading, data: abiData, error } = contractAbi
        return (
            <div className="contents">
                <div className="table-box">
                    <table className="table-typeL">
                        <thead>
                            <tr>
                                <th>Contract Name</th>
                                <th>Active </th>
                                <th>Updated Contract Source Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td>{tokenText(name, symbol)}</td>
                                <DownloadLink link={activeLink} name={`sssss.zip`} />
                                {/* <DownloadLink link={updatedLink} name={`${name}_${newVersion}.zip`} /> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="code-box api">
                    <div className="title-group">
                        <span className="title">Contract ABI</span>
                        <CopyButton data={JSON.stringify(abiData)} title={'Copy ABI'} disabled={!!error} />
                    </div>
                    {loading ? (
                        <LoadingComponent height="230px" />
                    ) : (
                        <div className="scroll">
                            <p className="txt" style={{ whiteSpace: 'pre' }}>
                                {!!error ? error : JSON.stringify(abiData, null, '\t')}
                            </p>
                        </div>
                    )}
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

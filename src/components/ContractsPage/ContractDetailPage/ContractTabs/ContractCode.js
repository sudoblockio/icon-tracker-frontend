import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { makeDownloadLink, tokenText, isValidData } from '../../../../utils/utils'
import {
    getSrcCodeLink,
    getVerSrcCodeLink,
    getContractABI,
    getContractABIFromRPC,
} from '../../../../redux/store/iiss'

import { CopyButton } from '../../../../components'

import style from './ContractCode.module.scss'
import clsx from 'clsx'
import { ReactJsonBeautify } from 'react-json-beautify'
import ReactJson from 'react-json-view'



class ContractCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeLink: '',
            updatedLink: '',
            cxABI: '',
            activeTabIndex: 0
        }
    }

    async componentDidMount() {
        const { contract } = this.props
        const { data } = contract
        const { address } = data
        this.getDownloadLink()
        // const cxABICode = await getContractABI(address);
        const cxABICode = await getContractABIFromRPC(address)
        const srcCodeLink = await getSrcCodeLink(address)
        this.setState({ activeLink: srcCodeLink, cxABI: cxABICode })
    }

    getDownloadLink = async () => {
        const { contract } = this.props
        const { data } = contract
        const { address } = data
        if (isValidData(address)) {
            const activeLink = await makeDownloadLink(address, this.state.activeLink)
            const updatedLink = await getVerSrcCodeLink(this.props.match.params.contractId)
            this.setState({ activeLink, updatedLink })
        }
    }

    handleClickTab(tabIndex) {
        this.setState({ activeTabIndex: tabIndex })
    }


    render() {
        const { activeLink, updatedLink } = this.state
        const { contract } = this.props
        const { data } = contract
        const { name, symbol, newVersion } = data

        const TABS = [{ name: "Contract ABI", key: "abi" }, { name: "Segemented ABI", key: "segmented" }]

        return (
            <div className={clsx("contents", style.wrapper)}>
                {/* <div className={clsx("table-box", style.tableBox)}>
                    <table className="table-typeL">
                        <thead>
                            <tr>
                                <th>Contract Name</th>
                                <th>On-Chain Source Code </th>
                                <th>Verified Source Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td>{tokenText(name, symbol)}</td>
                                <DownloadLink link={activeLink} name={`cx_src_code.zip`} />
                                <DownloadLink
                                    link={updatedLink}
                                    name={`${name}_${newVersion}.zip`}
                                />
                            </tr>
                        </tbody>
                    </table>
                </div> */}



                <div className={style.tabs}>
                    {TABS.map((tab, index) =>
                        <button
                            className={clsx(this.state.activeTabIndex === index && style.active)}
                            onClick={this.handleClickTab.bind(this, index)}
                        >
                            {tab.name}
                        </button>)}
                </div>

                <div className={clsx(style.codeBox, "code-box api")}>
                    {/* <div className="title-group">
                        <span className="title">Contract ABI</span>
                        <CopyButton
                            data={JSON.stringify(this.state.cxABI)}
                            title={'Copy ABI'}
                            disabled={''}
                        />
                    </div> */}

                    <div className="scroll">
                        {this.state.cxABI &&
                            <p className="txt" style={{ whiteSpace: 'pre' }}>
                                <ReactJson src={this.state.cxABI}
                                    name={null}
                                    collapsed={2}
                                    displayObjectSize={false}
                                    displayDataTypes={false}
                                    enableClipboard={false}
                                    displayArrayKey={false}
                                    quotesOnKeys={false}
                                    sortKeys={true}
                                    // groupArraysAfterLength={5}
                                    indentWidth={4} />

                                {/* {JSON.stringify(this.state.cxABI, null, '\t')} */}
                            </p>}

                    </div>

                </div>
            </div>
        )
    }
}

// const DownloadLink = ({ link, name }) => {
//     const Content = () => {
//         if (link) {
//             return (
//                 <td>
//                     <span>
//                         <i className="img" />
//                         <a href={link} download={name}>
//                             Download
//                         </a>
//                     </span>
//                 </td>
//             )
//         } else {
//             return <td>-</td>
//         }
//     }
//     return Content()
// }

export default withRouter(ContractCode)

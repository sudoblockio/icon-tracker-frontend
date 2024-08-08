import React, { Component } from 'react'
import style from './ContractCode.module.scss'

import clsx from 'clsx'
import ReactJson from 'react-json-view'
import { withRouter } from 'react-router-dom'
import { MdOutlineFileDownload } from "react-icons/md";

import { makeDownloadLink, isValidData } from '../../../../utils/utils'
import {
    getSrcCodeLink,
    getVerSrcCodeLink,
    getContractABIFromRPC,
} from '../../../../redux/store/iiss'

import { CopyButton } from '../../../../components'

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
                <div className={style.tabs}>
                    <div>{
                        TABS.map((tab, index) =>
                            <button
                                className={clsx(this.state.activeTabIndex === index && style.active)}
                                onClick={this.handleClickTab.bind(this, index)}
                            >
                                {tab.name}
                            </button>)
                    }</div>

                    <span className={style.downloadBtn}>
                        <a href={activeLink}> <MdOutlineFileDownload size={20} /> Download On-Chain Source Code</a>
                    </span>
                </div>

                <div className={clsx(style.codeBox, "code-box api")}>
                    {this.state.activeTabIndex === 0 &&
                        <div className="scroll">
                            <div className={style.copyBtn}>
                                <CopyButton
                                    data={JSON.stringify(this.state.cxABI)}
                                    title={'Copy ABI'}
                                    disabled={''}
                                />
                            </div>

                            {this.state.cxABI ?
                                <p className="txt" style={{ paddingInline: "1em !important" }}>
                                    <ReactJson src={this.state.cxABI}
                                        name={null}
                                        collapsed={4}
                                        displayObjectSize={false}
                                        displayDataTypes={false}
                                        enableClipboard={false}
                                        displayArrayKey={false}
                                        quotesOnKeys={false}
                                        sortKeys={true}
                                        indentWidth={4} />
                                </p>
                                :
                                <p style={{ paddingInline: "1em !important" }}> loading ... </p>}
                        </div>}


                    {this.state.activeTabIndex === 1 &&
                        <div className={style.segmented}>Segmented</div>}

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

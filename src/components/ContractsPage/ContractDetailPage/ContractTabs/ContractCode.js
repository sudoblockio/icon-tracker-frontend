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

import { CopyButton, LoadingComponent } from '../../../../components'
import { getSegmentedABI } from '../../../../libs/abi-parser'
import { FaRegCircleCheck } from "react-icons/fa6";


class ContractCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeLink: '',
            updatedLink: '',
            cxABI: '',
            segmentedAbi: [],
            activeTabIndex: 0
        }
    }

    fetchData = async (address) => {
        if (!address) return;

        this.getDownloadLink();
        const cxABICode = await getContractABIFromRPC(address);
        const srcCodeLink = await getSrcCodeLink(address);
        const segmentedAbi = getSegmentedABI(cxABICode);
        this.setState({ activeLink: srcCodeLink, cxABI: cxABICode, segmentedAbi });
    };

    async componentDidMount() {
        const { contract } = this.props;
        const { data } = contract;
        const { address } = data;
        this.fetchData(address);
    }

    async componentDidUpdate(prevProps) {
        const { contract } = this.props;
        const { data } = contract;
        const { address } = data;

        if (prevProps.contract.data.address !== address) {
            this.fetchData(address);
        }
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
        // const { contract } = this.props
        // const { data } = contract
        // const { name, symbol, newVersion } = data

        const TABS = [{ name: "Segemented ABI", key: "segmented" }, { name: "Contract ABI", key: "abi" }]

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
                    {this.state.activeTabIndex === 1 &&
                        <div>
                            <div className={style.copyBtn}>
                                {this.state.cxABI && <CopyButton
                                    data={JSON.stringify(this.state.cxABI)}
                                    title={'Copy ABI'}
                                    disabled={false}
                                />}

                            </div>

                            {this.state.cxABI ?
                                <div className={"json-abi"}>
                                    <ReactJson src={this.state.cxABI}
                                        name={null}
                                        collapsed={2}
                                        displayObjectSize={false}
                                        displayDataTypes={false}
                                        enableClipboard={false}
                                        displayArrayKey={false}
                                        quotesOnKeys={false}
                                        sortKeys={true}
                                        indentWidth={4}
                                    />
                                </div>
                                :
                                <div style={{ paddingInline: "1em !important", height: "10em" }}> <LoadingComponent /> </div>}
                        </div>}


                    {this.state.activeTabIndex === 0 &&
                        <div className={style.segmented}>
                            {this.state.cxABI ?
                                <table className={clsx("table-typeC", style.segmentTable)}>
                                    <thead>
                                        <tr>
                                            <th> Name </th>
                                            <th> Type </th>
                                            <th> Inputs </th>
                                            <th> Outputs </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.segmentedAbi.map(i =>
                                            <tr>
                                                <td>
                                                    {i.name}
                                                </td>
                                                <td className={style.type}>
                                                    {i.type}
                                                </td>
                                                <InputOutputRow abiItem={i} type="inputs" />
                                                <td className={style.output}>
                                                    {i.outputs && i.outputs.length ? i.outputs[0].type : ""}
                                                </td>
                                            </tr>)}
                                    </tbody>
                                </table> : <div style={{ paddingInline: "1em !important", height: "10em" }}> <LoadingComponent /> </div>}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const InputOutputRow = ({ abiItem, type }) => {
    return <td className={style.inputOutput}>
        {abiItem[type]?.length ?
            <table className={style.internalTable}>
                <tr>
                    <th>name</th>
                    <th>type</th>
                    <th>indexed</th>
                </tr>
                {abiItem[type].map(({ name, indexed, type }) =>
                    <tr>
                        <td>{name}</td>
                        <td>{type}</td>
                        <td>
                            {parseInt(indexed, 16) === 1 ? <FaRegCircleCheck /> : ""}
                        </td>
                    </tr>
                )}
            </table>
            :
            <span>
            </span>
        }
    </td>
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

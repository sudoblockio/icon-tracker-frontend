import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    makeDownloadLink,
    tokenText
} from 'utils/utils'
import {
    CopyButton,
    LoadingComponent
} from 'components';

class ContractCode extends Component {
    render() {
        const { contract, contractAbi } = this.props
        const { data } = contract
        const { address, tokenName, symbol, compiler, contractVersion } = data
        const { loading, data: abiData, error } = contractAbi
        return (
            <div className="contents">
                <table className="table-typeL">
                    <thead>
                        <tr>
                            <th>Contract Name</th>
                            <th>Compiler Version</th>
                            <th>Contract Source Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td>{tokenText(tokenName, symbol)}</td>
                            <td>{compiler || "-"}</td>
                            <td>
                                <span>
                                    <i className="img"></i>
                                    <a href={makeDownloadLink(address, contractVersion)} download={`${address}_${contractVersion}.zip`}>Download</a>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="code-box api">
                    <div className="title-group">
                        <span className="title">Contract ABI</span>
                        <CopyButton data={JSON.stringify(abiData)} title={'Copy ABI'} disabled={!!error}/>
                    </div>
                    {
                        loading ?
                            <LoadingComponent height="230px" />
                            :
                            <div className="scroll">
                                <p className="txt" style={{ whiteSpace: 'pre' }}>
                                    {!!error ? error : JSON.stringify(abiData, null, '\t')}
                                </p>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(ContractCode);

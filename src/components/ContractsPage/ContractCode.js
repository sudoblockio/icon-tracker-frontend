import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    makeDownloadLink,
    tokenText
} from '../../utils/utils'
import { 
    CopyButton
} from '../../components/';

// TODO 로딩
class ContractCode extends Component {
    render() {
        const { 
            contract, 
            contractAbi 
        } = this.props
        
        const { 
            data 
        } = contract
        
        const { 
            address, 
            tokenName, 
            symbol, 
            compiler
        } = data
        
        const abiData = JSON.stringify(contractAbi.data)
        
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
                            <td><span><i className="img"></i><a href={makeDownloadLink(address)} download={`${address}.zip`}>Download</a></span></td>
                        </tr>
                    </tbody>
                </table>

                <div className="code-box api">
                    <div className="title-group">
                        <span className="title">Contract ABI</span>
                        <CopyButton data={abiData} title={'Copy ABI'}/>
                    </div>
                    <div className="scroll">
                        <p className="txt">
                            {abiData}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ContractCode);

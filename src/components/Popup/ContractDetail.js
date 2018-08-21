import React, { Component } from 'react';
import {
    TransactionLink
} from 'components'
import {
    CONTRACT_STATUS
} from 'utils/const'

class ContractDetail extends Component {

    render() {
        const {
            data,
            closeDetail
        } = this.props
        const {
            state,
            txHash,
            verifiedTx,
            vefification,
            submission,
            checksum,
            comment
        } = data

        const _state = state ? CONTRACT_STATUS[state] : "-"
        const _vefification = vefification || "-"
        const _submission = submission || "-"
        const _checksum = checksum || "-"
        const _comment= comment || "-"

        const TxHash = txHash ? <TransactionLink to={txHash} label={<p className="txt hash">{txHash}</p>} onClick={closeDetail} /> : "-"
        const VerifiedTx = verifiedTx ? <TransactionLink to={verifiedTx} label={<p className="txt hash">{verifiedTx}</p>} onClick={closeDetail} /> : "-"

        return ([
            <h1 key="h1" className="title">Contract detail</h1>,
            <div key="div" className="scroll">
                <p className="label">Status</p>
                <p className="txt">{_state}</p>
                <p className="label">TxHash</p>
                {TxHash}
                <p className="label">Verified TxHash</p>
                {VerifiedTx}                
                <p className="label">Verifier</p>
                <p className="txt">{_vefification}</p>
                <p className="label">Submitter</p>
                <p className="txt">{_submission}</p>
                <p className="label">Package Checksum</p>
                <p className="txt">{_checksum}</p>
                <p className="label">Comment</p>
                <p className="txt">{_comment}</p>
            </div>
        ])
    }
}

export default ContractDetail

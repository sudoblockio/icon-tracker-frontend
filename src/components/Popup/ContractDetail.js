import React, { Component } from 'react';
import {
    TransactionLink
} from '../../components'
import {
    CONTRACT_STATUS
} from '../../utils/const'

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
        const _txHash = txHash ? <TransactionLink to={txHash} onClick={closeDetail} /> : "-"
        const _verifiedTx = verifiedTx ? <TransactionLink to={verifiedTx} onClick={closeDetail} /> : "-"
        const _vefification = vefification || "-"
        const _submission = submission || "-"
        const _checksum = checksum || "-"
        const _comment= comment || "-"

        return ([
            <h1 key="h1" className="title">Contract detail</h1>,
            <div key="div" className="scroll">
                <p className="label">Stauts</p>
                <p className="txt">{_state}</p>
                <p className="label">TxHash</p>
                <p className="txt hash">{_txHash}</p>
                <p className="label">검증 Tx hash</p>
                <p className="txt hash">{_verifiedTx}</p>
                <p className="label">검증인</p>
                <p className="txt">{_vefification}</p>
                <p className="label">제출인</p>
                <p className="txt">{_submission}</p>
                <p className="label">패키지 Checksum</p>
                <p className="txt">{_checksum}</p>
                <p className="label">Comment</p>
                <p className="txt">{_comment}</p>
            </div>
        ])
    }
}

export default ContractDetail

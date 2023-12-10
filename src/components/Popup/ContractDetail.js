import React, { Component } from 'react'
import { TransactionLink, AddressLink } from '../../components'
import { isValidData } from '../../utils/utils'
import { CONTRACT_STATUS } from '../../utils/const'

class ContractDetail extends Component {
    render() {
        const { data, closeDetail } = this.props
        const { state, txHash, verifiedTx, verifier, submitter, comment } = data

        const _state = state ? CONTRACT_STATUS[state] : '-'
        const _txHash = isValidData(txHash) ? (
            <TransactionLink
                to={txHash}
                label={<p className="txt hash">{txHash}</p>}
                onClick={closeDetail}
            />
        ) : (
            '-'
        )
        const _verifiedTx = isValidData(verifiedTx) ? (
            <TransactionLink
                to={verifiedTx}
                label={<p className="txt hash">{verifiedTx}</p>}
                onClick={closeDetail}
            />
        ) : (
            '-'
        )
        const _verifier = isValidData(verifier) ? (
            <AddressLink
                to={verifier}
                label={<p className="txt multi-lang">{verifier}</p>}
                onClick={closeDetail}
            />
        ) : (
            '-'
        )
        const _submitter = isValidData(submitter) ? (
            <AddressLink
                to={submitter}
                label={<p className="txt multi-lang">{submitter}</p>}
                onClick={closeDetail}
            />
        ) : (
            '-'
        )
        const _comment = comment || '-'

        return [
            <h1 key="h1" className="title">
                Contract detail
            </h1>,
            <div key="div" className="scroll">
                <p className="label">Status</p>
                <p className="txt">{_state}</p>
                <p className="label">TxHash</p>
                {_txHash}
                <p className="label">Verified TxHash</p>
                {_verifiedTx}
                <p className="label">Verifier</p>
                {_verifier}
                <p className="label">Submitter</p>
                {_submitter}
                <p className="label">Comment</p>
                <p className="txt">{_comment}</p>
            </div>,
        ]
    }
}

export default ContractDetail

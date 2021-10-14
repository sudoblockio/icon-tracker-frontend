import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { numberWithCommas, convertNumberToText, dateToUTC, utcDateInfo, convertHexToValue } from '../../../utils/utils'
import { TX_TYPE } from '../../../utils/const'
import { BlockLink, AddressLink, LoadingComponent } from '../../../components'

class BlockInfo extends Component {
    handlePrevBlock = () => {
        const { block } = this.props
        const { data } = block
        const { number } = data
        if (number === 0) return

        const prevHeight = number - 1
        this.props.history.push('/block/' + prevHeight)
    }

    handleNextBlock = () => {
        const { block } = this.props
        const { data } = block
        const { number } = data
        // if (lastBlock !== '-') return

        const nextHeight = number + 1
        this.props.history.push('/block/' + nextHeight)
    }

    goAllTx = () => {
        const { block } = this.props
        const { data } = block
        const { number } = data
        this.props.history.push(`/${TX_TYPE.BLOCK_TX}/${number}`)
    }

    render() {
        const { block } = this.props
        const { loading, data } = block

        const Content = () => {
            if (loading) {
                return <LoadingComponent height="206px" />
            } else {
                console.log(data, "data")
                const { number, timestamp, transaction_count, hash, parent_hash, blockSize, transaction_amount, transaction_fees, message, lastBlock, peer_id, crep } = data
                const isFirst = number === 0
                const isLast = lastBlock !== '-'
                const prep = peer_id || crep
                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            <p className="title">Block</p>
                            <div className="contents">
                                <div className="table-box">
                                    <table className="table-typeB detail">
                                        <tbody>
                                            <tr>
                                                <td>Block Height</td>
                                                <td>
                                                    <p onClick={this.handlePrevBlock} className={`prev ${isFirst ? 'disabled' : ''}`}>
                                                        <em className="img" />
                                                    </p>
                                                    <em className="value">{numberWithCommas(number)}</em>
                                                    <p onClick={this.handleNextBlock} className={`next ${isLast ? '' : ''}`}>
                                                        <em className="img" />
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Peer ID</td>
                                                <td>{prep ? <AddressLink to={prep} /> : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Time Stamp</td>
                                                {isFirst ? (
                                                    <td>-</td>
                                                ) : (
                                                    <td>
                                                        {dateToUTC(timestamp)}
                                                        <em>{utcDateInfo(timestamp)}</em>
                                                    </td>
                                                )}
                                            </tr>
                                            {/*<tr>
                                                <td>C-rep</td>
                                                <td><span>{crep}</span></td>
                                            </tr>*/}
                                            <tr>
                                                <td>Transactions</td>
                                                <td>
                                                    <span onClick={this.goAllTx}>{numberWithCommas(transaction_count)} Transaction(s)</span> in this block
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Hash</td>
                                                <td>{hash ? hash : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Prev Hash</td>
                                                <td>{parent_hash ? <BlockLink to={number - 1} label={parent_hash} /> : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>Block Size</td>
                                                <td>{numberWithCommas(blockSize)} bytes</td>
                                            </tr>
                                            <tr>
                                                <td>Amount</td>
                                                <td>{convertNumberToText(transaction_amount)} ICX</td>
                                            </tr>
                                            <tr>
                                                <td>TxFee</td>
                                                <td>{convertHexToValue(transaction_fees)} ICX</td>
                                            </tr>
                                            {number === 0 && (
                                                <tr>
                                                    <td>Message</td>
                                                    <td className="message">{message}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return Content()
    }
}

export default withRouter(BlockInfo)

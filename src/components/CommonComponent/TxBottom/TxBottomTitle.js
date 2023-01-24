import React, { Component } from 'react';
import {
    AddressLink
} from '../../../components'
import {
    TX_TYPE
} from '../../../utils/const'
import {
    numberWithCommas
} from '../../../utils/utils'

class TxPageTitle extends Component {

    render() {
        const {
            txType,
            listSize,
            totalSize,
            goAllTx,
            fromAddr,
            toAddr,
        } = this.props
        console.log(this.props, "le bottom props")

        const Content = () => {
            const listSizeNum = listSize || 0
            const totalSizeNum = totalSize || 0
            const listSizeUnder10 = (listSizeNum || 0) < 10 ? listSizeNum : 10
            const _listSize = numberWithCommas(listSizeNum)
            const _totalSize = numberWithCommas(totalSizeNum)
            switch (txType) {
                case TX_TYPE.ADDRESS_VOTED:                
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> Voter(s) from a total of
                                <em className="mint" onClick={goAllTx}>{numberWithCommas(totalSizeNum)} Voter(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_REWARD:                
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> Txn(s) from a total of
                                <em className="mint" onClick={goAllTx}>{numberWithCommas(totalSizeNum)} reward(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_BONDED:                
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> of
                                <em className="mint" onClick={goAllTx}>{_listSize} bonder(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.CONTRACT_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> Txns(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_totalSize} transaction(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.CONTRACT_INTERNAL_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> Txn(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_totalSize} internal transaction(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.CONTRACT_TOKEN_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeUnder10}</em> Txn(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_totalSize} token transfer(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.CONTRACT_EVENTS:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> event(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_totalSize} event(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_TX:
                    
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> Txn(s) from a total of
                                <em className="mint" onClick={goAllTx}>{Number(this.props.total).toLocaleString('en-US')} transaction(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_INTERNAL_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> Txn(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_totalSize} internal transaction(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_TOKEN_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeUnder10}</em> Txn(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_totalSize} token transfer(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.TRANSACTIONS:
                    return (
                        <p></p>
                    )
                case TX_TYPE.TOKEN_TRANSFERS:
                    return (
                        <p></p>
                    )
                case TX_TYPE.BLOCK_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> Txn(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_listSize} transaction(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.BLOCK_INTTX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> Txn(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_listSize} transaction(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.TOKEN_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> Txn(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_totalSize} token transfer(s)</em>
                                {/*Latest<em className="mint" onClick={goAllTx}>{_listSize} token transfer(s)</em> found*/}
                            </span>
                        </p>
                    )
                case TX_TYPE.TOKEN_HOLDERS:
                    return (
                        <p className="txt">
                            <span>Top<em className="mint" onClick={goAllTx}>{_listSize} Holder(s)</em><em className="gray">(from a total of {_totalSize} holder(s))</em></span>
                        </p>
                    )
                case TX_TYPE.TRANSACTION_EVENTS:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeNum}</em> event(s) from a total of
                                <em className="mint" onClick={goAllTx}>{_listSize} event(s)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.TRANSACTION_INTERNAL_TX:
                    return (
                        <p className="txt">
                            {
                                <span>
                                The Contract Call From
                                <AddressLink to={fromAddr} label={<em className="mint ellipsis">{fromAddr}</em>} /> To
                                <AddressLink to={toAddr} label={<em className="mint ellipsis">{toAddr}</em>}/>
                                </span>
                            } produced {_listSize} contract internal transaction(s)
                        </p>
                    )
                    case TX_TYPE.TRANSACTION_INTERNAL_TX:
                        return (
                            <p className="txt">
                                {
                                    <span>
                                    The Contract Call From
                                    <AddressLink to={fromAddr} label={<em className="mint ellipsis">{fromAddr}</em>} /> To
                                    <AddressLink to={toAddr} label={<em className="mint ellipsis">{toAddr}</em>}/>
                                    </span>
                                } produced {_listSize} contract internal transaction(s)
                            </p>
                        )
                     case TX_TYPE.ADDRESS_BONDERS:
                            return (
                                <p className="txt">
                                <span>
                                    Latest<em>{totalSize}</em> of
                                    <em className="mint" onClick={goAllTx}>{totalSize} bonder(s)</em>
                                </span>
                            </p>
                            )
                default:
                    return (
                        <p></p>
                    )
            }
        }
        return Content()
    }
}

export default TxPageTitle;

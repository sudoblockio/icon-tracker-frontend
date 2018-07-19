import React, { Component } from 'react';
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
        } = this.props

        const Content = () => {
            const listSizeNum = listSize || 0
            const totalSizeNum = totalSize || 0
            const listSizeUnder10 = (listSizeNum || 0) < 10 ? listSizeNum : 10
            const _listSize = numberWithCommas(listSizeNum)
            const _totalSize = numberWithCommas(totalSizeNum)
            switch (txType) {
                case TX_TYPE.CONTRACT_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeUnder10}</em> ICX txns from a total of
                                <em className="mint" onClick={goAllTx}>{_listSize} transactions</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.CONTRACT_TOKEN_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeUnder10}</em> txns from a total of
                                <em className="mint" onClick={goAllTx}>{_listSize} token transfers</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeUnder10}</em> ICX txns from a total of
                                <em className="mint" onClick={goAllTx}>{_listSize} transactions</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_TOKEN_TX:
                    return (
                        <p className="txt">
                            <span>
                                Latest<em>{listSizeUnder10}</em> txns from a total of
                                <em className="mint" onClick={goAllTx}>{_listSize} token transfers</em>
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
                                Latest<em>{listSizeUnder10}</em> ICX txns from a total of
                                <em className="mint" onClick={goAllTx}>{_listSize} transactions</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.TOKEN_TX:
                    return (
                        <p className="txt">
                            <span>
                                A Total of<em className="mint" onClick={goAllTx}>{_listSize} token transfers</em> found
                            </span>
                        </p>
                    )
                case TX_TYPE.TOKEN_HOLDERS:
                    return (
                        <p className="txt">
							<span>Top<em class="mint" onClick={goAllTx}>{_listSize} Holders</em><em class="gray">(from a total of {_totalSize} holders)</em></span>
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

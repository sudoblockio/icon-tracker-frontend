import React, { Component } from 'react'
import { numberWithCommas, tokenText, onlyDate } from '../../../utils/utils'
import { AddressLink, AmountCell } from '../../../components'
import LinkButton from '../../CommonComponent/LinkButton'
import { CONTRACT_STATUS, SEARCH_TYPE } from '../../../utils/const'

class SearchTableBody extends Component {
    render() {
        const TableRow = () => {
            const { searchType, data } = this.props
            switch (searchType) {
                case SEARCH_TYPE.CONTRACTS:
                    return (
                        <tr>
                            <td className="on">
                                <span className="ellipsis">
                                    <AddressLink to={data.address} />
                                </span>
                            </td>
                            <td>{data.name || '-'}</td>
                            <AmountCell type="icx" amount={data.balance} symbol="ICX" />
                            <td>{numberWithCommas(data.transaction_count)}</td>
                            <td>{CONTRACT_STATUS[data.status]}</td>
                            <td>{onlyDate(data.created_timestamp / 1000).toString()}</td>
                        </tr>
                    )
                case SEARCH_TYPE.TOKENS:
                    const { index, count, page } = this.props
                    const ranking = count * (page - 1) + index + 1
                    console.log(data, 'data========>')
                    return (
                        <tr>
                            <td>{ranking}</td>

                            <td style={{ fontSize: '13px' }}>
                                <span className="ellipsis">
                                    {tokenText(data.name, data.symbol, data.address)}
                                </span>
                            </td>
                            <td style={{ fontSize: '13px' }}>
                                <span className="ellipsis">{data.token_standard}</span>
                            </td>
                            <td>
                                <span className="ellipsis">
                                    {data.transaction_count
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </span>
                            </td>
                            {/* <td><span className="ellipsis">{tokenText(data.name, data.symbol, data.address)}</span></td> */}
                            <td style={{ fontSize: '13px' }}>
                                <p>
                                    <em>{data.symbol}</em>
                                </p>
                            </td>
                            <td style={{ fontSize: '13px' }}>
                                <span className="ellipsis">
                                    {onlyDate(data.created_timestamp / 1000).toString()}
                                </span>
                            </td>
                        </tr>
                    )
                default:
                    return <tr></tr>
            }
        }

        return TableRow()
    }
}

export default SearchTableBody

import React, { Component } from 'react';
import {
    SUB_SEARCH_TYPE
} from '../../../utils/const'

class SubSearchTableHead extends Component {
    render() {
        const TableHead = () => {
            const { subSearchType } = this.props
            switch (subSearchType) {
                case SUB_SEARCH_TYPE.CONTRACTS:
                    return (
                        <tr>
                            <th>Address</th>
                            <th>Contract Name</th>
                            <th>Compiler</th>
                            <th>Balance</th>
                            <th>TxCount</th>
                            <th>Status</th>
                            <th>Confirmed date</th>
                        </tr>
                    )
                case SUB_SEARCH_TYPE.TOKENS:
                    return (
                        <tr>
                            <th>No.</th>
                            <th>Token</th>
                            <th>Price<span className="img"></span></th>
                            <th>% Change</th>
                            <th>Volume (24h)</th>
                            <th>MarketCap</th>
                        </tr>
                    )
                default:
                    return (
                        <tr></tr>
                    )
            }
        }

        return TableHead()
    }
}

export default SubSearchTableHead
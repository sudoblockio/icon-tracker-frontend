import React, { Component } from 'react';
import {
    SEARCH_TYPE
} from 'utils/const'
import {
    numberWithCommas
} from 'utils/utils'

class SearchTableDesc extends Component {

    render() {
        const {
            searchType,
            listSize,
        } = this.props

        const Content = () => {
            const _listSize = numberWithCommas(listSize || 0)
            switch (searchType) {
                case SEARCH_TYPE.CONTRACTS:
                    return (
                        <p className="txt cont">
                            <span>With verified source codes only</span>
                            <span>A total of<em>{_listSize}</em> verified contract source codes found</span>
                        </p>
                    )
                case SEARCH_TYPE.TOKENS:
                    return (
                        <p className="txt cont">
                            <span>ICON Tokens Market Capitalization Sorted by MarketCap value in DESC Order</span>
                            <span>A total of<em>{listSize} ICX Token</em> Contracts found<em>(Sorted by MarketCap value in DESC Order)</em></span>
                        </p>
                    )
                default:
                    return <p></p>
            }
        }
        return Content()
    }
}

export default SearchTableDesc;

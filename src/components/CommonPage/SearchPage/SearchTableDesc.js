import React, { Component } from 'react';
import {
    SEARCH_TYPE
} from 'utils/const'
import {
    numberWithCommas
} from 'utils/utils'
import { IRC_VERSION } from '../../../utils/const';

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
                            <span>A total of<em>{_listSize}</em> verified contract source code(s) found</span>
                        </p>
                    )
                case SEARCH_TYPE.TOKENS:
                    return (
                        <p className="txt cont">
                            <span>ICON Tokens Market Capitalization Sorted by MarketCap value in DESC Order</span>
                            <span>A total of<em>{listSize} {IRC_VERSION[2]} Token</em> Contract(s) found<em>(Sorted by MarketCap value in DESC Order)</em></span>
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

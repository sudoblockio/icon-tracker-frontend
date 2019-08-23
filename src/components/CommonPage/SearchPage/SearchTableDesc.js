import React, { Component } from 'react'
import { SEARCH_TYPE } from 'utils/const'
import { numberWithCommas } from 'utils/utils'
import { IRC_VERSION } from '../../../utils/const'

class SearchTableDesc extends Component {
    render() {
        const { searchType, listSize } = this.props

        const Content = () => {
            const _listSize = numberWithCommas(listSize || 0)
            switch (searchType) {
                case SEARCH_TYPE.CONTRACTS:
                    return (
                        <span className="cont right">
                            A total of {_listSize} verified contract source
                            codes found
                        </span>
                    )
                case SEARCH_TYPE.TOKENS:
                    return (
                        <span className="cont right">
                            A total of {listSize} {IRC_VERSION[2]} IRC2 Token
                            Contract(s) found
                        </span>
                    )
                default:
                    return <p />
            }
        }
        return Content()
    }
}

export default SearchTableDesc

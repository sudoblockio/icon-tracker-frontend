import React, { Component } from 'react'
import { SEARCH_TYPE, IRC_VERSION, POPUP_TYPE } from '../../../utils/const'
import { numberWithCommas } from '../../../utils/utils'
import { getContractListCount } from '../../../redux/store/iiss'
import { QrCodeButton } from '../../../components'
// import { isConnected } '../../'
class SearchTableDesc extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    async componentDidMount() {
        const cxListCount = await getContractListCount()
        const { headers } = await cxListCount
        this.setState({ cxCount: headers['x-total-count'] })
        console.log(this.props, "contract list props")
    }
    render() {
        const { searchType, listSize, totalSize } = this.props
        const count = this.state.cxCount ? this.state.cxCount : 0
        const Content = () => {
            const _listSize = numberWithCommas(listSize || 0)
            const _totalSize = numberWithCommas(totalSize || 0)
            switch (searchType) {
                case SEARCH_TYPE.CONTRACTS:
                    return (
                        <>
                            <span className="cont right">
                                A total of {count} contract source
                                codes found.
                            </span>
                            <QrCodeButton />
                        </>
                    )
                case SEARCH_TYPE.TOKENS:
                    return (
                        <span className="cont right">
                            A total of {_listSize} IRC2 Token
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

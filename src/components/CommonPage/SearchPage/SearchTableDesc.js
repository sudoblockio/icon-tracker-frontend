import React, { Component } from 'react'
import { SEARCH_TYPE } from '../../../utils/const'
import { numberWithCommas } from '../../../utils/utils'
import { getContractListCount } from '../../../redux/store/iiss'
class SearchTableDesc extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    async componentDidMount() {
        const cxListCount = await getContractListCount()
        const { headers } = await cxListCount
        this.setState({ cxCount: headers['x-total-count'] },(res)=>{
            console.log(res,"res")
        })
    }
    render() {
        const { searchType, listSize} = this.props
        const count = this.state.cxCount ? this.state.cxCount : 0
        const Content = () => {
            const _listSize = numberWithCommas(listSize || 0)
            switch (searchType) {
                case SEARCH_TYPE.CONTRACTS:
                    return (
                        <>
                            <span className="cont right">
                                A total of {this.props.count?this.props.count: count} contract source
                                codes found.
                            </span>
                            {}
                        </>
                    )
                case SEARCH_TYPE.TOKENS:
                    return (
                        <span className="cont right">
                            A total of {_listSize} Token
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

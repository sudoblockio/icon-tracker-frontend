import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import TxPageTitle from './TxPageTitle'
import {
    TxTableBody,
    TxTableHead,
    LoadingComponent,
    Pagination,
    SortHolder,
    NoBox,
} from '../../../components'
import {
    coinGeckoCurrentUSD
} from '../../../redux/store/iiss'
import { TX_TYPE, TX_TYPE_DATA } from '../../../utils/const'
import { calcMaxPageNum, isNumeric } from '../../../utils/utils'
import { getSupplyMetrics } from '../../../redux/api/restV3/main'

class TxPage extends Component {
    constructor(props) {
        super(props)
        this.txType = ''
        this.urlIndex = ''
        this.pageId = 1
        this._getTxList = () => {}
        this.state ={
            currentUSD:0,
        }
    }

    componentWillMount() {
        this.initPage(this.props.url)
    }

    async componentDidMount() {
        console.log(this, "what this")
        this.setInitialData(this.props.url)
        const currentUSD = await coinGeckoCurrentUSD()
        const supplyMetrics = await getSupplyMetrics()
        const totalsupply = supplyMetrics.data.total_supply/Math.pow(10, 8)
        this.setState({currentUSD, totalsupply})
    }

    componentWillReceiveProps(nextProps) {
        const { pathname: currentPath } = this.props.url
        const { pathname: nextPath } = nextProps.url
        const { search: currentSearch } = this.props.url
        const { search: nextSearch } = nextProps.url
        if (currentPath !== nextPath || currentSearch !== nextSearch) {
            this.setInitialData(nextProps.url)
        }
    }

    initPage = url => {
        this.getParams(url)
        this.getTxList(1, 0, this.urlIndex)
    }

    setInitialData = url => {
        this.getParams(url)
        this.setQueryToList(url.search)
    }

    setQueryToList = search => {
        const parsed = queryString.parse(search)
        const { urlIndex, pageId } = this
        const { count } = parsed
        this.getTxList(pageId, count, urlIndex)
    }

    getTxList = (page, count, urlIndex) => {
        console.log(urlIndex, "url index")
        const query = {
            page: isNumeric(page) ? page : 1,
            count: isNumeric(count) ? count : 25,
        }
        switch (this.txType) {
            case TX_TYPE.CONTRACT_TX:
            case TX_TYPE.CONTRACT_INTERNAL_TX:
            case TX_TYPE.CONTRACT_TOKEN_TX:
                query.addr = urlIndex
                break
            case TX_TYPE.ADDRESS_TX:
            case TX_TYPE.ADDRESS_INTERNAL_TX:
            case TX_TYPE.ADDRESS_TOKEN_TX:
            case TX_TYPE.ADDRESS_DELEGATION:
            case TX_TYPE.ADDRESS_VOTED:
            case TX_TYPE.ADDRESS_REWARD:
            case TX_TYPE.ADDRESS_BONDED:                 
                query.address = urlIndex
                break
            case TX_TYPE.BLOCK_TX:
                query.height = urlIndex
                break
            case TX_TYPE.TOKEN_TX:
            case TX_TYPE.TOKEN_HOLDERS:
            case TX_TYPE.CONTRACT_EVENTS:
                console.log(query, "the query")
                query.contractAddr = urlIndex
                break
            case TX_TYPE.BLOCKS:
            case TX_TYPE.ADDRESSES:
            case TX_TYPE.TRANSACTIONS:
            case TX_TYPE.TOKEN_TRANSFERS:
                break
            case TX_TYPE.TRANSACTION_EVENTS:
            case TX_TYPE.TRANSACTION_INTERNAL_TX:
                query.txHash = urlIndex
                break

            default:
        }
        this._getTxList(query)
    }

    getTxTypeData = () => {
        return TX_TYPE_DATA[this.txType] || {}
    }

    getCount = () => {
        const tx = this.props[this.getTxTypeData()['tx']] || {}
        const { count } = tx
        return count
    }

    getParams = url => {
        const { pathname } = url
        this.txType = pathname.split('/')[1] || ''
        this._getTxList = this.props[this.getTxTypeData()['getTxList']] || (() => {})
        switch (this.txType) {
            case TX_TYPE.CONTRACT_TX:
            case TX_TYPE.CONTRACT_INTERNAL_TX:
            case TX_TYPE.CONTRACT_TOKEN_TX:
            case TX_TYPE.CONTRACT_EVENTS:
            case TX_TYPE.ADDRESS_TX:
            case TX_TYPE.ADDRESS_INTERNAL_TX:
            case TX_TYPE.ADDRESS_TOKEN_TX:
            case TX_TYPE.ADDRESS_DELEGATION:
            case TX_TYPE.ADDRESS_VOTED:
            case TX_TYPE.BLOCK_TX:
            case TX_TYPE.TOKEN_TX:
            case TX_TYPE.TOKEN_HOLDERS:
            case TX_TYPE.TRANSACTION_EVENTS:
            case TX_TYPE.TRANSACTION_INTERNAL_TX:
            case TX_TYPE.ADDRESS_REWARD:         
                this.urlIndex = pathname.split('/')[2] || ''
                console.log(this.urlIndex, "the url index")
                this.pageId = pathname.split('/')[3] || 1
                break
            case TX_TYPE.BLOCKS:
            case TX_TYPE.ADDRESSES:
            case TX_TYPE.TRANSACTIONS:
            case TX_TYPE.TOKEN_TRANSFERS:
                this.pageId = pathname.split('/')[2] || 1
                break

            default:
        }
    }

    getTxListByCount = count => {
        this.historyPush(1, count)
    }

    getTxListByPage = page => {
        const count = this.getCount()
        console.log(page, count, "what page count")
        this.historyPush(page, count)
    }

    historyPush = (page, count) => {
        let url = ''
        switch (this.txType) {
            case TX_TYPE.CONTRACT_TX:
            case TX_TYPE.CONTRACT_INTERNAL_TX:
            case TX_TYPE.CONTRACT_TOKEN_TX:
            case TX_TYPE.CONTRACT_EVENTS:
            case TX_TYPE.ADDRESS_TX:
            case TX_TYPE.ADDRESS_INTERNAL_TX:
            case TX_TYPE.ADDRESS_TOKEN_TX:
            case TX_TYPE.ADDRESS_DELEGATION:
            case TX_TYPE.ADDRESS_VOTED:
            case TX_TYPE.BLOCK_TX:
            case TX_TYPE.TOKEN_TX:
            case TX_TYPE.TOKEN_HOLDERS:
            case TX_TYPE.TRANSACTION_EVENTS:
            case TX_TYPE.TRANSACTION_INTERNAL_TX:
            case TX_TYPE.ADDRESS_REWARD:
                case TX_TYPE.ADDRESS_BONDED:        
                url = this.makeUrl(page, count, this.urlIndex)
                console.log(url, "top url")
                break
            case TX_TYPE.BLOCKS:
            case TX_TYPE.ADDRESSES:
            case TX_TYPE.TRANSACTIONS:
            case TX_TYPE.TOKEN_TRANSFERS:
                url = this.makeUrl(page, count)
                break

            default:
                return
        }
        this.props.history.push(url)
    }

    makeUrl = (page, count, urlIndex) => {
        let url = `/${this.txType}`
        if (urlIndex) {
            url += `/${urlIndex}`
        }

        if (page) {
            url += `/${page}`
        }

        if (count) {
            url += `?count=${count}`
        }
        return url
    }

    render() {
        
        const tx = this.props[this.getTxTypeData()['tx']] || {}
        const className = this.getTxTypeData()['className'] || ''
        const noBoxText = this.getTxTypeData()['noBoxText'] || ''
        const { loading, page, count, data, listSize, totalSize } = tx
        console.log(tx, "this tx")
        const noData = !(data && data.length !== 0)
        const TableContent = () => {
            if (noData) {
                return <NoBox text={noBoxText} />
            } else {
                return [
                    <div className="table-box" key="table">
                        <table className={className}>
                            <thead>
                                <TxTableHead txType={this.txType} />
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <TxTableBody
                                        key={index}
                                        data={item}
                                        txType={this.txType}
                                        address={this.urlIndex}
                                        currentUSD={this.state?this.state.currentUSD:0 }
                                        totalSupply={this.state?this.state.totalsupply:0}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>,
                    <SortHolder
                        key="SortHolder"
                        count={count >= 100 ? 100 : count}
                        getData={this.getTxListByCount}
                    />,
                    loading && (
                        <LoadingComponent
                            key="LoadingComponent"
                            style={{
                                position: 'absolute',
                                width: '0',
                                left: '185px',
                                bottom: '10px',
                            }}
                        />
                    ),
                    <Pagination
                        key="Pagination"
                        pageNum={page}
                        maxPageNum={calcMaxPageNum(totalSize, count)-1}
                        getData={this.getTxListByPage}
                    />,
                ]
            }
        }

        const Content = () => {
            if (loading && noData) {
                return <LoadingComponent height="calc(100vh - 120px - 144px)" />
            } else {
                return (
                    <div className="screen0">
                        <div className={`wrap-holder`}>
                            <TxPageTitle
                                txType={this.txType}
                                urlIndex={this.urlIndex}
                                listSize={listSize}
                                totalSize={totalSize}
                            />
                            <div className="contents">{TableContent()}</div>
                        </div>
                    </div>
                )
            }
        }

        return <div className="content-wrap">{Content()}</div>
    }
}

export default withRouter(TxPage)

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
  coinGeckoCurrentUSD,
  getTokenDecimals,
  getTokenTotalSupply,
  getTotalSupply,
} from '../../../redux/store/iiss'
import { TX_TYPE, TX_TYPE_DATA } from '../../../utils/const'
import { calcMaxPageNum, isNumeric } from '../../../utils/utils'

class TxPage extends Component {
  constructor(props) {
    super(props)
    this.txType = ''
    this.urlIndex = ''
    this.pageId = 1
    this._getTxList = () => {}
    this.state = {
      currentUSD: 0,
      age: 'Age',
    }
  }

  componentWillMount() {
    this.initPage(this.props.url)
  }

  async componentDidMount() {
    this.setInitialData(this.props.url)

    if (this.txType === 'tokenholders') {
      const tokenDecimals = await getTokenDecimals(this.props.match.params.tokenId)
      const tokenTotalSupply = await getTokenTotalSupply(this.props.match.params.tokenId)
      const totalSupply = Number(tokenTotalSupply / Math.pow(10, tokenDecimals))
      this.setState({ totalSupply })
    } else {
      const currentUSD = await coinGeckoCurrentUSD()
      const supplyMetrics = await getTotalSupply()
      const totalSupply = Number(supplyMetrics / Math.pow(10, 8))
      this.setState({ currentUSD, totalSupply })
    }
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

  initPage = (url) => {
    this.getParams(url)
    this.getTxList({ page: 1, count: 0, urlIndex: this.urlIndex })
  }

  setInitialData = (url) => {
    this.getParams(url)
    this.setQueryToList(url.search)
  }

  setQueryToList = (search) => {
    const parsed = queryString.parse(search)
    const { urlIndex, pageId } = this
    const { count, sort } = parsed
    this.getTxList({ page: pageId, count, urlIndex, sort })
  }

  getTxList = ({ page, count, urlIndex, sort }) => {
    const query = {
      page: isNumeric(page) ? page : 1,
      count: isNumeric(count) ? count : 25,
    }

    if (sort) query.sort = sort

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

  getParams = (url) => {
    const locationObj = Object.keys(url).includes('location') ? url.location : url

    const { pathname } = locationObj
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

  getTxListByCount = (count) => {
    const { sort } = queryString.parse(this.props.url.search)
    if (sort) this.historyPush(1, count, sort)
    else this.historyPush(1, count)
  }

  handleSortChange = (count) => {
    this.setState({ count }, () => {
      // After updating the state, trigger any necessary updates
      this.getTxList({ page: 1, count, urlIndex: this.urlIndex })
    })
  }

  getTxListByPage = (page) => {
    const count = this.getCount()
    const { sort } = queryString.parse(this.props.url.search)

    if (sort) {
      this.historyPush(page, count, sort)
    } else {
      this.historyPush(page, count)
    }
    this.pageId = page
    this.getTxList({ page, count: this.getCount(), sort })
    // window.location.reload()
  }

  historyPush = (page, count, sort) => {
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
        url = this.makeUrl({ page, count, urlIndex: this.urlIndex })
        break
      case TX_TYPE.BLOCKS:
      case TX_TYPE.ADDRESSES:
      case TX_TYPE.TRANSACTIONS:
      case TX_TYPE.TOKEN_TRANSFERS:
        url = this.makeUrl({ page, count, sort })
        break

      default:
        return
    }
    this.props.history.push(url)
  }

  makeUrl = ({ page, count, urlIndex, sort }) => {
    let url = `/${this.txType}`
    if (urlIndex) {
      url += `/${urlIndex}`
    }

    if (page) {
      url += `/${page}`
    }

    if (count && !sort) {
      url += `?count=${count}`
    } else if (!count && sort) {
      url += `?sort=${sort}`
    } else if (count && sort) {
      url += `?count=${count}&sort=${sort}`
    }

    return url
  }

  handleClick = (value) => {
    if (value === 'Age') {
      this.setState({ age: 'Date Time (UTC)' })
    } else {
      this.setState({ age: 'Age' })
    }
  }

  handleClickSortHeader = (head) => {
    const count = this.getCount()
    this.historyPush(1, count, head)
    // this.getTxListByPage(1)

    this.getTxList({ page: 1, count: this.getCount(), sort: head })
  }

  render() {
    const tx = this.props[this.getTxTypeData()['tx']] || {}
    const className = this.getTxTypeData()['className'] || ''
    const noBoxText = this.getTxTypeData()['noBoxText'] || ''
    const { loading, page, count, data, listSize } = tx
    let totalSize = tx.totalSize
    const noData = !(data && data.length !== 0)
    if (!noData) {
      totalSize = data[0].number || totalSize
    }
    const TableContent = () => {
      if (noData) {
        return <NoBox text={noBoxText} />
      } else {
        return [
          <div className="table-box" key="table">
            <table className={className}>
              <thead>
                <TxTableHead
                  age={this.state.age}
                  handleClick={this.handleClick}
                  onClickSortHeader={this.handleClickSortHeader}
                  txType={this.txType}
                />
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <TxTableBody
                    age={this.state.age}
                    key={index}
                    data={item}
                    txType={this.txType}
                    address={this.urlIndex}
                    currentUSD={this.state ? this.state.currentUSD : 0}
                    totalSupply={this.state ? this.state.totalSupply : 0}
                    rank={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>,
          <SortHolder
            key="SortHolder"
            count={count >= 100 ? 100 : count}
            getData={this.getTxListByCount}
            onSortChange={this.handleSortChange}
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
            pageNum={Number(this.props.match.params.pageId || 1)}
            maxPageNum={calcMaxPageNum(totalSize, count)}
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

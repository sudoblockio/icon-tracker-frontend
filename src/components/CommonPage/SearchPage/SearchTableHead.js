import React, { Component } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

import { StatusHolder } from '../../../components'
import { TokenStandardHolder } from '../../../components'
import { SEARCH_TYPE } from '../../../utils/const'

const sortParams = {
  'Contract Name': 'name',
  Token: 'name',
  Balance: 'balance',
  TxCount: 'transaction_count',
  'Num Txs': 'transaction_count',
}

const sortParamsInverted = {
  balance: 'Balance',
  transaction_count: 'No of Txns',
  name: 'Contract Name',
}

const sortOrderEncoding = {
  asc: '-',
  dsc: '',
}

class SearchTableHead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortOrder: {
        'Contract Name': 'asc',
        Token: 'asc',
      },
    }
  }

  handleClickSortHeader(name) {
    const currOrder = this.state.sortOrder[name]
    let newSortOrder = ''

    switch (currOrder) {
      case null:
      case undefined:
      case 'asc':
        newSortOrder = 'dsc'
        break
      case 'dsc':
        newSortOrder = 'asc'
        break
      default:
        newSortOrder = null
    }
    if (
      newSortOrder !== null &&
      newSortOrder !== undefined &&
      sortParams[name] !== undefined &&
      sortParams[name] !== null
    ) {
      const query = sortOrderEncoding[newSortOrder] + sortParams[name]
      this.setState((prev) => ({ ...prev, sortOrder: { ...prev, [name]: newSortOrder } }))
      this.props.onClickSortHeader(query)
    }
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search)
    const sort = params.get('sort')

    const sortOrder = sort && sort[0] ? (sort[0] === '-' ? 'dsc' : 'asc') : 'asc'
    const sortKey =
      sort && sort[0] ? (['+', '-'].includes(sort[0]) ? sort.substring(1) : sort) : 'name'

    console.log({ sortKey, sortOrder })

    this.setState((prev) => ({
      ...prev,
      sortOrder: { [sortParamsInverted[sortKey]]: sortOrder },
    }))
  }

  render() {
    const withClickAction = (name) => {
      const currOrder = this.state.sortOrder[name]
      return (
        <th style={{ cursor: 'pointer' }} onClick={this.handleClickSortHeader.bind(this, name)}>
          {name}
          <span style={{ position: 'relative', top: '1px', left: '5px' }}>
            {currOrder !== null && currOrder !== undefined && (
              <>{currOrder === 'dsc' ? <BiChevronDown /> : <BiChevronUp />}</>
            )}
          </span>
        </th>
      )
    }

    const TableHead = () => {
      const { searchType } = this.props
      switch (searchType) {
        case SEARCH_TYPE.CONTRACTS:
          return (
            <tr>
              <th>Address</th>
              {withClickAction('Contract Name')}
              {/* <th>Compiler</th> */}
              {withClickAction('Balance')}
              {withClickAction('TxCount')}
              <StatusHolder getData={this.props.getListByStatus} />
              <th>Confirmed date</th>
            </tr>
          )
        case SEARCH_TYPE.TOKENS:
          return (
            <tr>
              <th>No.</th>
              {/* <th>Token</th> */}
              {withClickAction('Token')}
              {/* <th>Token Standard</th> */}
              <TokenStandardHolder getData={this.props.getListByTokenStandard} />
              {/* <th>Num Txs</th> */}
              {withClickAction('Num Txs')}
              {/* <th>Website</th> */}
              <th>Symbol</th>
              <th>Last Updated</th>
              {/* <th>% Change (24h)</th> */}
              {/* <th>Volume (24h)</th> */}
              {/* <th className="marketcap"><span>MarketCap<em className="img"></em></span></th> */}
              {/* <th>Status</th> */}
            </tr>
          )
        default:
          return <tr></tr>
      }
    }

    return TableHead()
  }
}

export default SearchTableHead

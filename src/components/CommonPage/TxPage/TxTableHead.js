import React, { Component } from 'react'
import { TX_TYPE } from '../../../utils/const'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

const sortParams = {
  Balance: 'balance',
  'USD Value': 'balance',
  Percentage: 'balance',
  'No of Txns': 'transaction_count',
}

const sortParamsInverted = {
  balance: 'Balance',
  transaction_count: 'No of Txns',
}

const sortOrderEncoding = {
  asc: '-',
  dsc: '',
}
class TxTableHead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortOrder: {
        Balance: 'dsc',
        Name: 'dsc',
        'Number of Txns': 'dsc',
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
    if (newSortOrder !== null) {
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
      sort && sort[0] ? (['+', '-'].includes(sort[0]) ? sort.substring(1) : sort) : 'balance'

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

    const TableHead = (_props) => {
      const { txType } = _props
      switch (txType) {
        case TX_TYPE.ADDRESS_REWARD:
          return (
            <tr>
              <th>TxHash</th>
              <th>Block</th>
              <th>Age</th>
              <th>I-Score</th>
              <th>ICX</th>
            </tr>
          )
        case TX_TYPE.ADDRESS_DELEGATION:
          return (
            <tr>
              <th>P-Rep</th>
              <th>Voted</th>
            </tr>
          )
        case TX_TYPE.ADDRESS_VOTED:
          return (
            <tr>
              <th>Address</th>
              <th>Delegation</th>
            </tr>
          )
        case TX_TYPE.ADDRESS_BONDED:
          return (
            <tr>
              <th>Address</th>
              <th>Value</th>
            </tr>
          )
        case TX_TYPE.ADDRESS_BONDERS:
          return (
            <tr>
              <th>Address</th>
              <th>Bond</th>
            </tr>
          )
        case TX_TYPE.ADDRESS_TX:
          return (
            <tr>
              <th>TxHash</th>
              <th>Block</th>
              <th>Age</th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Amount</th>
              <th>TxFee</th>
              <th>Method</th>
            </tr>
          )
        case TX_TYPE.ADDRESS_INTERNAL_TX:
          return (
            <tr>
              <th>Parent TxHash</th>
              <th>Block</th>
              <th>Age</th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Value</th>
              <th>Method</th>
            </tr>
          )
        case TX_TYPE.ADDRESS_TOKEN_TX:
          return (
            <tr>
              <th>TxHash</th>
              <th>Age</th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Quantity</th>
              <th>Token</th>
            </tr>
          )
        case TX_TYPE.CONTRACT_TX:
          return (
            <tr>
              <th>TxHash</th>
              <th>Block</th>
              <th>Age</th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Amount</th>
              <th>TxFee</th>
              <th>Method</th>
            </tr>
          )
        case TX_TYPE.CONTRACT_INTERNAL_TX:
          return (
            <tr>
              <th>Parent TxHash</th>
              <th>Block</th>
              <th>Age</th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Value</th>
              <th>Method</th>
            </tr>
          )
        case TX_TYPE.CONTRACT_TOKEN_TX:
          return (
            <tr>
              <th>TxHash</th>
              <th>Age</th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Quantity</th>
              <th>Token</th>
              <th>TxFee</th>
            </tr>
          )
        case TX_TYPE.BLOCK_TX:
          return (
            <tr>
              <th>Tx Hash</th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Amount</th>
              <th>TxFee</th>
            </tr>
          )
        case TX_TYPE.BLOCK_INTTX:
          return (
            <tr>
              <th>Tx Hash</th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Amount</th>
              <th>TxFee</th>
            </tr>
          )
        case TX_TYPE.TRANSACTIONS:
          return (
            <tr>
              <th>TxHash</th>
              <th>Block</th>
              <th
                id="age-format"
                onClick={() =>
                  this.props.handleClick ? this.props.handleClick(this.props.age) : null
                }>
                <div class={this.props.age === 'Age' && 'div-tooltip'}>
                  {this.props.age}
                  {this.props.age === 'Age' && (
                    <span class="tooltiptext">Click to show Datetime Format</span>
                  )}
                </div>
              </th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Amount</th>
              <th>TxFee</th>
              <th>Method</th>
            </tr>
          )
        case TX_TYPE.TOKEN_TRANSFERS:
          return (
            <tr>
              <th>Tx Hash</th>
              <th
                id="age-format"
                onClick={() =>
                  this.props.handleClick ? this.props.handleClick(this.props.age) : null
                }>
                <div class={this.props.age === 'Age' && 'div-tooltip'}>
                  {this.props.age}
                  {this.props.age === 'Age' && (
                    <span class="tooltiptext">Click to show Datetime Format</span>
                  )}
                </div>
              </th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Quantity</th>
              <th>Token</th>
              <th>TxFee</th>
            </tr>
          )
        case TX_TYPE.TOKEN_TX:
          return (
            <tr>
              <th>TxHash</th>
              <th>Age</th>
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Quantity</th>
              <th>TxFee</th>
            </tr>
          )
        case TX_TYPE.ADDRESSES:
          return (
            <tr>
              <th>Address</th>
              {withClickAction('Balance')}
              {withClickAction('USD Value')}
              {withClickAction('Percentage')}
              {withClickAction('No of Txns')}
              <th>Address type</th>
            </tr>
          )
        case TX_TYPE.BLOCKS:
          return (
            <tr>
              <th>Block</th>
              <th
                id="age-format"
                onClick={() =>
                  this.props.handleClick ? this.props.handleClick(this.props.age) : null
                }>
                <div class={this.props.age === 'Age' && 'div-tooltip'}>
                  {this.props.age}
                  {this.props.age === 'Age' && (
                    <span class="tooltiptext">Click to show Datetime Format</span>
                  )}
                </div>
              </th>
              <th>No of Txns</th>
              <th>Block Hash</th>
              <th>Amount</th>
              <th>TxFee</th>
            </tr>
          )
        case TX_TYPE.CONTRACT_EVENTS:
          return (
            <tr>
              <th>TxHash / Block / Age</th>
              <th>Method</th>
              <th>Event Logs</th>
            </tr>
          )
        case TX_TYPE.TRANSACTION_EVENTS:
          return (
            <tr>
              <th>TxHash / Block / Age</th>
              <th>Method</th>
              <th>Event Logs</th>
            </tr>
          )
        case TX_TYPE.TRANSACTION_INTERNAL_TX:
          return (
            <tr>
              {/* <th>Type trace address</th> */}
              <th>From</th>
              <th className="table-sign" />
              <th>To</th>
              <th>Value</th>
              {/* <th>Step Limit</th> */}
              <th>Method</th>
            </tr>
          )
        case TX_TYPE.TOKEN_HOLDERS:
          return (
            <tr>
              <th>Rank</th>
              <th>Addresses</th>
              <th>Quantity</th>
              <th>
                Percentage<em>%</em>
              </th>
            </tr>
          )
        default:
          return <tr />
      }
    }

    return TableHead(this.props)
  }
}

export default TxTableHead

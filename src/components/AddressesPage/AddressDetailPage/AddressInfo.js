import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import {
  numberWithCommas,
  convertNumberToText,
  isValidNodeType,
  searchLowerCase,
  isValidData
} from 'utils/utils'
import {
  CopyButton,
  LoadingComponent,
  QrCodeButton
} from 'components';
import { 
  isNotificationAvailable, 
  registerServiceWorker, 
  deregisterServiceWorker 
} from 'notification';

const _isNotificationAvailable = isNotificationAvailable()

class AddressInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: _isNotificationAvailable && this.props.walletNotification
    }
  }

  onNotificationChange = () => {
    if (!_isNotificationAvailable) {
      return
    }
    const notification = !this.state.notification
    this.setState({ notification }, () => {
      this.props.setNotification(notification)
      if (notification) {
        const { wallet } = this.props
        const { data } = wallet
        const { address } = data
        registerServiceWorker(address)
      }
      else {
        deregisterServiceWorker()
      }
    })
  }

  render() {
    const { wallet, walletAddress } = this.props
    const { loading, data, error } = wallet

    const Content = () => {
      if (loading) {
        return (
          <LoadingComponent height='206px' />
        )
      }
      else {
        const { address, nodeType, balance, icxUsd, txCount, tokenList } = data
        const _address = !!address ? address : error
        const isConnected = walletAddress === _address
        const disabled = !_isNotificationAvailable
        return (
          <div className="screen0">
            <div className="wrap-holder">
              {isConnected ?
                <p className="title">
                  My Address<span className="connected"><i className="img"></i>Connected to ICONex</span>
                  <span className={`toggle${disabled ? ' disabled' : ''}`}>
                    <em>
                      <input 
                        id="cbox-02" 
                        className="cbox-type" 
                        type="checkbox" 
                        name="notification" 
                        onChange={this.onNotificationChange} 
                        checked={!this.state.notification} 
                        disabled={disabled}
                      />
                      <label htmlFor="cbox-02" className="label _img"></label>Notifications
                    </em>
                  </span>
                </p>
              :
                <p className="title">Address</p> 
              }
              <div className="contents">
                <table className="table-typeB address">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <td>Address</td>
                      <td>{_address} <QrCodeButton address={_address} /><CopyButton data={_address} title={'Copy Address'} isSpan />{isValidNodeType(nodeType) && <span className="crep">{`${nodeType}`}</span>}</td>
                    </tr>
                    <tr>
                      <td>Balance</td>
                      <td>{`${convertNumberToText(balance)} ICX`}<span className="gray">{`(${convertNumberToText(icxUsd, 3)} USD)`}</span></td>
                    </tr>
                    <tr>
                      <td>No of Txns</td>
                      <td>{`${numberWithCommas(txCount)}`}</td>
                    </tr>
                    <tr>
                      <td>Token Balance</td>
                      <TokenBalance tokenList={tokenList} />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }
    }
    return Content()
  }
}

class TokenBalance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }
  }

  handleClick = () => {
    window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "TOKEN_BALANCE" } }))
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      const { name } = e.target
      this.setState({ [name]: '' })
    }
  }

  calcTotalTokenBalance = (tokenList) => {
    let result = "0"
    tokenList.forEach(token => {
      const prev = new BigNumber(result)
      const { totalTokenPrice } = token
      const _totalTokenPrice = isValidData(totalTokenPrice) ? totalTokenPrice : "0"
      const next = prev.plus(_totalTokenPrice)
      result = next.toString(10)
    })
    return result
  }

  render() {
    const TableData = (_tokenList) => {
      if (_tokenList.length === 0) {
        return <td>None</td>
      }
      else {
        const { search } = this.state
        const list = _tokenList.filter(token => {
          const { contractName, contractSymbol } = token
          return searchLowerCase(search, [contractName, contractSymbol])
        })
        const totalBalance = this.calcTotalTokenBalance(_tokenList)
        return (
          <td>
            <p className="balance" onClick={this.handleClick}>{convertNumberToText(totalBalance, 3)} USD<span className="gray">(Total)</span><em className="img"></em></p>
            <div className="combo-group">
              <div className="combo-layer">
                <div className="search-group">
                  <input type="text" className="txt-type-page over" placeholder="Search for token name"
                    name={'search'}
                    value={this.state.search}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                  />
                </div>
                {
                  list.length === 0 ?
                    <p className="nodata">No result found</p>
                    :
                    <div className="scroll">
                      <ul className="list-group">
                        {
                          list.map((token, index) => {
                            const { contractName, contractSymbol, quantity, totalTokenPrice, tokenPrice } = token
                            return (
                              <li key={index}>
                                <p><em>{contractName}</em><em>{totalTokenPrice ? convertNumberToText(totalTokenPrice, 3) : "-"}</em><em>USD</em></p>
                                <p><em>{quantity} {contractSymbol}</em><em>{tokenPrice ? convertNumberToText(tokenPrice, 3) : "-"}</em><em>@</em></p>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                }
              </div>
            </div>
          </td>
        )
      }
    }
    return TableData(this.props.tokenList || [])
  }
}

export default withRouter(AddressInfo);

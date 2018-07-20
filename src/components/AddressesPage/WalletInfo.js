import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CopyButton from '../Common/CopyButton'
import {
  numberWithCommas,
  convertNumberToText,
  isValidNodeType
} from '../../utils/utils'
import {
  POPUP_TYPE
} from '../../utils/const'
import {
  LoadingComponent,
  QrCodeButton
} from '../../components/';

class WalletInfo extends Component {
  handleClick = () => {
    const { wallet } = this.props    
    const { data } = wallet
    const { address } = data

    this.props.setPopup({
      type: POPUP_TYPE.AddressQrCode,
      data: { address }
    })
  }

  render() {
    const { wallet } = this.props    
    const { loading, data } = wallet
    
    const Content = () => {
      if (loading) {
        return (
          <LoadingComponent height='206px' />
        )
      }
      else {
        const { address, nodeType, balance, icxUsd, txCount, tokenList } = data
        return (
          <div className="screen0">
            <div className="wrap-holder">
              <p className="title">Address</p>
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
                      <td>{address} <QrCodeButton onClick={this.handleClick}/><CopyButton data={address} title={'Copy Address'} isSpan/>{isValidNodeType(nodeType) && <span className="crep">{`${nodeType}`}</span>}</td>
                    </tr>
                    <tr>
                      <td>Balance</td>
                      <td>{`${convertNumberToText(balance, 'icx')} ICX`}<span className="gray">{`(${convertNumberToText(icxUsd, 'usd')} USD)`}</span></td>
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

  render() {
    const TableData = (_tokenList) => {
      if (_tokenList.length === 0) {
        return <td>None</td>
      }
      else {
        const { search } = this.state        
        const list = _tokenList.filter(token => {
          const { contractName, contractSymbol } = token
          const searchValue = search.toLowerCase()
          return contractName.toLowerCase().indexOf(searchValue) !== -1 || contractSymbol.toLowerCase().indexOf(contractSymbol) !== -1
        })
        return (
          <td>
            <p className="balance">11 USD<span className="gray">(Total)</span><em className="img"></em></p>
            <div className="combo-group">
              <div className="combo-layer">
                <div className="search-group">
                  <input type="text" className="txt-type-page over" placeholder="Search for Token Name"
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
                    <ul className="list-group">
                      {
                        list.map((token, index) => {
                          const { contractName, contractSymbol, quantity, unit } = token
                          const value = unit ? quantity * unit : '-'
                          return (
                            <li key={index}>
                              <p><em>{contractName}</em><em>{value}</em><em>USD</em></p>
                              <p><em>{quantity} {contractSymbol}</em><em>{unit ? unit : '-'}</em><em>@</em></p>
                            </li>
                          )
                        })
                      }
                    </ul>
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

export default withRouter(WalletInfo);

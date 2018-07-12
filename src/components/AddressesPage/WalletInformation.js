import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import clipboard from 'clipboard'
import { numberWithCommas, convertNumberToText, isValidNodeType } from '../../utils/utils'
import CopyButton from '../Common/CopyButton'

class WalletInformation extends Component {
  constructor(props) {
    super(props)
    this.clipboard = new clipboard('.clipboard-btn');
  }

  componentWillReceiveProps(nextProps) {
    const currentAddress = this.props.walletDetail.address
    const nextAddress = nextProps.walletDetail.address
    if (currentAddress !== nextAddress) {
      this.props.addressInfo({ address: nextAddress })
    }
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    const { walletDetail } = this.props
    const { address, nodeType, balance, icxUsd, txCount, tokenList } = walletDetail
    return (
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
                <td>{address} <span className="qrcode"><em className="img"></em></span><CopyButton address={address}/>{isValidNodeType(nodeType) && <span className="crep">{`${nodeType}`}</span>}</td>
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
                <TokenBalance tokenList={tokenList}/>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
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
    this.setState({[name]: value})
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      const { name } = e.target
      this.setState({[name]: ''})
    }
  }

  render() {
    const TableData = (_tokenList) => {
      if (_tokenList.length === 0) {
        return <td>None</td>
      }
      else {
        const { search } = this.state
        const list = _tokenList.filter(token => token.contractName.indexOf(search) !== -1 || token.contractSymbol.indexOf(search) !== -1)
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

export default withRouter(WalletInformation);

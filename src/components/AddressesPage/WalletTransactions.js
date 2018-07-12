import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { numberWithCommas, convertNumberToText, dateToUTC, getUTCString, startsWith } from '../../utils/utils'
import { Pagination, BlockLink, TransactionLink, WalletLink } from '../../components'

const Tabs = ['Transactions', 'Token Transfers']

class WalletTransactions extends Component {

  // getWalletData = (pageId) => {
  //   const { walletAddress } = this.props
  //   this.props.history.push('/address/' + walletAddress + '/' + pageId);
  // }

  constructor(props) {
    super(props)
    this.state = {
      on: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentAddress = this.props.walletDetail.address
    const nextAddress = nextProps.walletDetail.address
    if (currentAddress !== nextAddress) {
      this.props.addressTxList({ address: nextAddress, page: 1, count: 10 })
    }
  }

  setTab = (index) => {
    this.setState({on: index}, () => {
      const { address } = this.props.walletDetail.address
      switch (index) {
        case 0:
          this.props.addressTxList({ address, page: 1, count: 10 })
          break
        
        case 1:
          this.props.addressTokenTxList({ address, page: 1, count: 10 })
          break
        
          default:
      }
    })
  }

  render() {
    const { walletDetail, walletTx, tokenTx } = this.props
    const { address, txCount, tokenTxCount } = walletDetail
    const utcLabel = `(${getUTCString()})`
    const isTx = this.state.on === 0
    const count = isTx ? txCount : tokenTxCount
    const list = isTx ? walletTx.data : tokenTx.data
    const noTx = list.length === 0

    return (
      <div className="wrap-holder">
        <div className="tab-holder">
          <ul>
            {Tabs.map((tab, index) => (
              <li key={index} className={index === this.state.on ? 'on' : ''} onClick={()=>{this.setState({on: index})}}>{tab}</li>
            ))}
          </ul>
        </div>
        {
          noTx ?
          <div className="contents">
            <table className="table-type">
              <tbody>
                <tr>
                  <td colSpan="7" className="notrans">No Transaction</td>
                </tr>
              </tbody>
            </table>
          </div>
          :
          <div className="contents">
            <p className="txt"><span>Latest<em>{count < 10 ? count : 10}</em> ICX Txns from a total of<em>{count} {Tabs[this.state.on]}</em></span></p>
            <table className="table-typeC">
              <thead>
                <tr>
                  <th>Tx Hash</th>
                  <th>Block</th>
                  <th>Time Stamp<em>{utcLabel}</em></th>
                  <th>From</th>
                  <th className="table-sign"></th>
                  <th>To</th>
                  <th>{isTx ? 'Amount' : 'Quantity'}</th>
                  <th>{isTx ? 'Fee' : 'Token'}</th>
                </tr>
              </thead>
              <tbody>
                {list.map(tx => (
                  <TableRow key={tx.txHash} data={tx} address={address} isTx={isTx} />
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}

const TableRow = ({data, address}) => {
  const { txHash, height, createDate, fromAddr, toAddr, amount, fee, state, isTx } = data
  const isOut = fromAddr === address
  const isError = state === 0
  return (
    <tr>
      <td className={`on ${!isError ? '' : 'icon error'}`}>{isError && <i className="img"></i>}<span className="ellipsis"><TransactionLink to={txHash}/></span></td>
      <td className="on break"><BlockLink to={height} label={numberWithCommas(height)}/></td>
      <td className={!createDate ? 'no': 'break'}>{dateToUTC(createDate)}</td>
      <AddressCell targetAddr={fromAddr} address={address}/>
      <td className={`table-sign ${isOut ? 'out' : ''}`}><span>{isOut ? 'OUT' : 'IN'}</span></td>
      <AddressCell targetAddr={toAddr} address={address}/>
      <td><span>{convertNumberToText(amount, 'icx', 4)}</span><em>ICX</em></td>
      <td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
    </tr>
  )
}

const AddressCell = ({targetAddr, address}) => {
  const isContract = startsWith(targetAddr, 'cx')
  let _targetAddr, className
  if (!targetAddr) {
    _targetAddr = '-'
    className = 'no'
  }
  else if (targetAddr === address) {
    _targetAddr = address
    className = isContract ? 'icon' : ''
  }
  else {
    _targetAddr = <WalletLink to={targetAddr} />
    className = `on ${isContract ? 'icon' : ''}`
  }
  return <td className={className}>{isContract && <i className="img"></i>}<span className="ellipsis">{_targetAddr}</span></td>
}

export default withRouter(WalletTransactions);

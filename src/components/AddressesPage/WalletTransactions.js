import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getUTCString } from '../../utils/utils'
import { AddressTableBody } from '../../components'
import { LoadingComponent } from '../../components/';
import { TX_TYPE } from '../../utils/const'

const Tabs = ['Transactions', 'Token Transfers']

// TODO 전반적인 정리 필요
// TokenTabs 참고
class WalletTransactions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      on: 0,
      txType: TX_TYPE.ADDRESS_TX
    }
  }

  setTab = (index) => {
    this.setState({on: index}, () => {
      const { address } = this.props.walletDetail
      switch(index) {
        case 0:
          this.setState({txType: TX_TYPE.ADDRESS_TX})
          this.props.addressTxList({ address, page: 1, count: 10 })
          break
        
        case 1:
          this.setState({txType: TX_TYPE.ADDRESS_TOKEN_TX})
          this.props.addressTokenTxList({ address, page: 1, count: 10 })
          break
        
        default:
      }
    })
  }

  goAllTx = () => {
    const { txType } = this.state
    const { walletDetail } = this.props
    const { address } = walletDetail
		this.props.history.push(`/${txType}/${address}`);
  }

  render() {
    const { txType } = this.state
    const { walletDetail, walletTx, walletTokenTx } = this.props
    const { address } = walletDetail
    const utcLabel = `(${getUTCString()})`
		const isTokenTx = txType === TX_TYPE.ADDRESS_TOKEN_TX
    const tx = isTokenTx ? walletTokenTx : walletTx
    const { loading, data, totalData } = tx
    const noTx = data.length === 0

    return (
      <div className="wrap-holder">
        {
          !loading && 
          <div className="tab-holder">
            <ul>
              {Tabs.map((tab, index) => (
                <li key={index} className={index === this.state.on ? 'on' : ''} onClick={()=>{this.setTab(index)}}>{tab}</li>
              ))}
            </ul>
          </div>
        }
        {
          loading ?
          <div style={{height: '513px'}}>
            <LoadingComponent />
          </div>
          :
          <div className="contents">
          {
            noTx && 
            <table className="table-type">
              <tbody>
                <tr>
                  <td colSpan="7" className="notrans">No Transaction</td>
                </tr>
              </tbody>
            </table>            
          }
          { 
            !noTx && 
            <p className="txt"><span>Latest<em>{totalData < 10 ? totalData : 10}</em> ICX Txns from a total of<em onClick={this.goAllTx}>{totalData} {Tabs[this.state.on]}</em></span></p> 
          }
          {
            !noTx && 
            <table className="table-typeC">
              <thead>
                <tr>
                  <th>Tx Hash</th>
                  <th>Block</th>
                  <th>Time Stamp<em>{utcLabel}</em></th>
                  <th>From</th>
                  <th className="table-sign"></th>
                  <th>To</th>
                  <th>{isTokenTx ? 'Quantity' : 'Amount'}</th>
                  <th>{isTokenTx ? 'Token' : 'TxFee'}</th>
                </tr>
              </thead>
              <tbody>
                {data.map(tx => (
                  <AddressTableBody key={tx.txHash} data={tx} address={address} txType={txType}/>
                ))}
              </tbody>
            </table>
          }            
          </div>          
        }
        
      </div>
    );
  }
}

export default withRouter(WalletTransactions);

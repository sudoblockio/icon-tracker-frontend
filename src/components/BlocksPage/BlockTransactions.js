import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, AddressTableRow, WalletLink, TransactionLink } from '../../components/';
import { convertNumberToText } from '../../utils/utils'

class BlockInformation extends Component {
  getBlockData = (pageId) => {
    const { height } = this.props
    this.props.history.push('/block/' + height + '/'+ pageId);
  }

  render() {
    const { blockDetail, blockTx } = this.props
    const { height } = blockDetail
    const { loading, data, totalData } = blockTx
    const noTx = data.length === 0
    return (
      <div className="wrap-holder">
      {
        !loading && 
        <div className="tab-holder">
          <ul>
            <li className='on'>Transactions</li>
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
          <p className="txt"><span>Latest<em>{totalData < 10 ? totalData : 10}</em> ICX Txns from a total of<em onClick={this.props.goAllTx}>{totalData} Transactions</em></span></p> 
        }
        {
          !noTx && 
          <table className="table-typeD">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>From</th>
                <th className="table-sign"></th>
                <th>To</th>
                <th>Amount</th>
                <th>TxFee</th>
              </tr>
            </thead>
            <tbody>
              {data.map(tx => (
                <AddressTableRow key={tx.txHash} data={tx} txType={'blocktx'} />
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

export default withRouter(BlockInformation);

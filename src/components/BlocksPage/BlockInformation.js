import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BlockLink, LoadingComponent } from '../../components/';
import { numberWithCommas, convertNumberToText, dateToUTC } from '../../utils/utils'

class BlockInformation extends Component {

  handlePrevBlock = () => {
    const { blockDetail } = this.props;
    if (blockDetail.height === 0) return;
    
    const prevHeight = blockDetail.height - 1;
    this.props.history.push('/block/' + prevHeight);
  }

  handleNextBlock = () => {
    const { blockDetail } = this.props;
    if (blockDetail.lastBlock !== "-") return;
    
    const nextHeight = blockDetail.height + 1;
    this.props.history.push('/block/' + nextHeight);
  }

  render() {
    const { blockDetail } = this.props;
    const { loading, height, createDate, crep, txCount, hash, prevHash, blockSize, amount, fee, message } = blockDetail

    return (
      <div className="wrap-holder">
        {!loading && <p className="title">Block</p>}
        {
          loading ?
          <div style={{height: '366px'}}>
            <LoadingComponent />
          </div>
          :
          <div className="contents">
            <table className="table-typeB detail">
              <tbody>
                <tr>
                  <td>Block Height</td>
                  <td>
                    <p onClick={this.handlePrevBlock} className="prev"><em className="img"></em></p>
                    <em className="value">{numberWithCommas(height)}</em>
                    <p onClick={this.handleNextBlock} className="next"><em className="img"></em></p>
                  </td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>{height === 0 ? '-' :dateToUTC(createDate, true)}</td>
                </tr>
                {/*<tr>
                  <td>C-rep</td>
                  <td><span>{crep}</span></td>
                </tr>*/}
                <tr>
                  <td>Transactions</td>
                  <td><span onClick={this.props.goAllTx}>{numberWithCommas(txCount)} Transactions</span> in this block</td>
                </tr>
                <tr>
                  <td>Hash</td>
                  <td>{hash}</td>
                </tr>
                <tr>
                  <td>Prev Hash</td>
                  <td>{prevHash ? (<BlockLink to={height - 1} label={prevHash}/>) : "-"}</td>
                </tr>
                <tr>
                  <td>Block size</td>
                  <td>{numberWithCommas(blockSize)} bytes</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{convertNumberToText(amount, 'icx')} ICX</td>
                </tr>
                <tr>
                  <td>TxFee</td>
                  <td>{convertNumberToText(fee, 'icx')} ICX</td>
                </tr>
                {
                  height === 0 && 
                  <tr>
                    <td>Message</td>
                    <td>{message}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } 
      </div>
    );
  }
}

export default withRouter(BlockInformation);

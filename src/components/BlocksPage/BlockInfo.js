import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  numberWithCommas,
  convertNumberToText,
  dateToUTC
} from '../../utils/utils'
import {
  TX_TYPE
} from '../../utils/const'
import {
  BlockLink,
  LoadingComponent
} from '../../components/';

class BlockInfo extends Component {

  handlePrevBlock = () => {
    const { block } = this.props;
    const { data } = block;
    const { height } = data;
    if (height === 0) return;

    const prevHeight = height - 1;
    this.props.history.push('/block/' + prevHeight);
  }

  handleNextBlock = () => {
    const { block } = this.props;
    const { data } = block;
    const { lastBlock, height } = data;
    if (lastBlock !== "-") return;

    const nextHeight = height + 1;
    this.props.history.push('/block/' + nextHeight);
  }

  goAllTx = () => {
    const { block } = this.props
    const { data } = block
    const { height } = data
    this.props.history.push(`/${TX_TYPE.BLOCK_TX}/${height}`);
  }

  render() {
    const {
      block
    } = this.props;

    const {
      loading,
      data
    } = block

    const Content = () => {
      if (loading) {
        return (
          <LoadingComponent height='206px' />
        )
      }
      else {
        const { height, createDate, crep, txCount, hash, prevHash, blockSize, amount, fee, message } = data
        return (
          <div className="screen0">
            <div className="wrap-holder">
              <p className="title">Block</p>
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
                      <td>{height === 0 ? '-' : dateToUTC(createDate, true)}</td>
                    </tr>
                    {/*<tr>
                      <td>C-rep</td>
                      <td><span>{crep}</span></td>
                    </tr>*/}
                    <tr>
                      <td>Transactions</td>
                      <td><span onClick={this.goAllTx}>{numberWithCommas(txCount)} Transactions</span> in this block</td>
                    </tr>
                    <tr>
                      <td>Hash</td>
                      <td>{hash ? hash : "-"}</td>
                    </tr>
                    <tr>
                      <td>Prev Hash</td>
                      <td>{prevHash ? (<BlockLink to={height - 1} label={prevHash} />) : "-"}</td>
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
            </div>
          </div>
        )
      }
    }

    return Content()
  }
}

export default withRouter(BlockInfo);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BlockLink } from '../../components/';
import { numberWithCommas, convertNumberToText, dateToUTC } from '../../utils/utils'

class BlockInformation extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {

  }

  handlePrevBlock = () => {
    const { blockDetail } = this.props;
    if (blockDetail.height === 0) return;
    const prevHeight = blockDetail.height - 1;
    this.props.history.push('/block/'+prevHeight);
  }

  handleNextBlock = () => {
    const { blockDetail } = this.props;
    if (blockDetail.lastBlock !== "-") return;
    const nextHeight = blockDetail.height + 1;
    this.props.history.push('/block/'+nextHeight);
  }

  render() {
    const { blockDetail } = this.props;
    return (
      <div className="wrap-holder">
        <p className="title">Block Detail</p>
        <div className="contents">
          <table className="table-typeB detail">
            <thead>
              <tr>
                <th>Address</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Address</td>
                <td><p onClick={this.handlePrevBlock} className="prev"><em className="img"></em></p><em className="value">{numberWithCommas(blockDetail.height)}</em><p onClick={this.handleNextBlock} className="next"><em className="img"></em></p></td>
              </tr>
              <tr>
                <td>Time</td>
                <td>{dateToUTC(blockDetail.createDate)} (UTC+9)</td>
              </tr>
              <tr>
                <td>C-rep</td>
                <td><span>{blockDetail.crep}</span></td>
              </tr>
              <tr>
                <td>No of Txns</td>
                <td>{numberWithCommas(blockDetail.txCount)}</td>
              </tr>
              <tr>
                <td>Hash</td>
                <td>{blockDetail.hash}</td>
              </tr>
              <tr>
                <td>Prev Hash</td>
                <td>{ blockDetail.prevHash ? (<BlockLink to={blockDetail.height - 1} label={blockDetail.prevHash} />) : "-"}</td>
              </tr>
              <tr>
                <td>Block size</td>
                <td>{numberWithCommas(blockDetail.blockSize)} bytes</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>{convertNumberToText(blockDetail.amount, 'icx')} ICX</td>
              </tr>
              <tr>
                <td>Fee</td>
                <td>{convertNumberToText(blockDetail.fee, 'icx')} ICX</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(BlockInformation);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { numberWithCommas, convertNumberToText } from '../../utils/utils'

class BlockInformation extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {

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
                <td><p className="prev"><em className="img"></em></p><em className="value">99999</em><p className="next"><em className="img"></em></p></td>
              </tr>
              <tr>
                <td>Time</td>
                <td>2017-12-14 01:53:49 (UTC+9)</td>
              </tr>
              <tr>
                <td>C-rep</td>
                <td><span>0x45ab5ce7aa91dae22384938c3bcf0a4548548bb78717c34fa04ce339c5b43460</span></td>
              </tr>
              <tr>
                <td>No of Txns</td>
                <td>{`${numberWithCommas(0)}`}</td>
              </tr>
              <tr>
                <td>Hash</td>
                <td>0x45ab5ce7aa91dae22384938c3bcf0a4548548bb78717c34fa04ce339c5b43460</td>
              </tr>
              <tr>
                <td>Prev Hash</td>
                <td><span>0x45ab5ce7aa91dae22384938c3bcf0a4548548bb78717c34fa04ce339c5b43460</span></td>
              </tr>
              <tr>
                <td>Block size</td>
                <td>37,975 bytes</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>100.000005 ICX</td>
              </tr>
              <tr>
                <td>Fee</td>
                <td>0.1 ICX</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(BlockInformation);

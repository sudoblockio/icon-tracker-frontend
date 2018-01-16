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
    const { blockDetail } = this.props
    return (
      <div className="wrap-holder">
        <p className="title">Transactions in The Block</p>
        <div className="contents">
          <table className="table-typeD">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
                <td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
                <td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
                <td><span>20000000.01</span><em>ICX</em></td>
                <td><span>20.1</span><em>ICX</em></td>
              </tr>
              <tr>
                <td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
                <td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
                <td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
                <td><span>2000.01</span><em>ICX</em></td>
                <td><span>2.1</span><em>ICX</em></td>
              </tr>
              <tr>
                <td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
                <td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
                <td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
                <td><span>2000.01</span><em>ICX</em></td>
                <td><span>0.1</span><em>ICX</em></td>
              </tr>
              <tr>
                <td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
                <td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
                <td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
                <td><span>2000.01</span><em>ICX</em></td>
                <td className="no"><span>-</span></td>
              </tr>
            </tbody>
          </table>
          <table className="table-typeD">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="notrans">No transactions in this block</td>
              </tr>
            </tbody>
          </table>
          <ul className="page">
            <li>
              <span className="start"><em className="img"></em></span>
            </li>
            <li>
              <span className="prev"><em className="img"></em></span>
            </li>
            <li className="pageNum">
              <p>Page</p>
              <input type="text" className="txt-type-page" placeholder="" value="" /> / 10000
            </li>
            <li>
              <span className="next"><em className="img"></em></span>
            </li>
            <li>
              <span className="end"><em className="img"></em></span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(BlockInformation);

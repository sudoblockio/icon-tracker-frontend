import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class RecentTransactions extends Component {
  render() {
    const { tmainTx } = this.props.mainPage
    return (
      <li className="right">
        <p className="title">Recent Transactions<Link to='/transactions'><span>View all<em className="img"></em></span></Link></p>
        <div className="list-group">
          <ul className="list">
            <li>
              <p className="icon"><img src="../image/icon_01.png" /></p>
              <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
              <p className="b">Amount<em>100.0000001 ICX</em></p>
              <p className="c">Fee<em>0.1 ICX</em></p>
            </li>

            <li>
              <p className="icon"><img src="../image/icon_01.png" /></p>
              <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
              <p className="b">Amount<em>100.0000001 ICX</em></p>
              <p className="c">Fee<em>0.1 ICX</em></p>
            </li>

            <li>
              <p className="icon"><img src="../image/icon_01.png" /></p>
              <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
              <p className="b">Amount<em>100.0000001 ICX</em></p>
              <p className="c">Fee<em>0.1 ICX</em></p>
            </li>

            <li>
              <p className="icon"><img src="../image/icon_01.png" /></p>
              <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
              <p className="b">Amount<em>100.0000001 ICX</em></p>
              <p className="c">Fee<em>0.1 ICX</em></p>
            </li>

            <li>
              <p className="icon"><img src="../image/icon_01.png" /></p>
              <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
              <p className="b">Amount<em>100.0000001 ICX</em></p>
              <p className="c">Fee<em>0.1 ICX</em></p>
            </li>

            <li>
              <p className="icon"><img src="../image/icon_01.png" /></p>
              <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
              <p className="b">Amount<em>100.0000001 ICX</em></p>
              <p className="c">Fee<em>0.1 ICX</em></p>
            </li>

            <li>
              <p className="icon"><img src="../image/icon_01.png" /></p>
              <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
              <p className="b">Amount<em>100.0000001 ICX</em></p>
              <p className="c">Fee<em>0.1 ICX</em></p>
            </li>
          </ul>
        </div>
      </li>
    );
  }
}

export default withRouter(RecentTransactions);

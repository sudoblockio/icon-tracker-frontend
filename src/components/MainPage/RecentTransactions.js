import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { numberWithCommas, dateToUTC9 } from '../../utils/utils'

class RecentTransactions extends Component {
  render() {
    const { tmainTx } = this.props.mainPage
    return (
      <li className="right">
        <p className="title">Recent Transactions<Link to='/transactions'><span>View all<em className="img"></em></span></Link></p>
        <div className="list-group">
          <ul className="list">
            {tmainTx.map((tx, i) => {
              const { txHash, amount, fee } = tx
              return (
                <li key={i}>
                  <p className="icon"><img src="../image/icon_01.png" /></p>
                  <p className="a">TX Hash<em>{txHash.substr(0, 42)}</em></p>
                  <p className="b">Amount<em>{`${numberWithCommas(amount)} ICX`}</em></p>
                  <p className="c">Fee<em>{`${numberWithCommas(fee)} ICX`}</em></p>
                </li>
              )
            })}
          </ul>
        </div>
      </li>
    );
  }
}

export default withRouter(RecentTransactions);

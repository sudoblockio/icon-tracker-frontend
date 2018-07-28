import React, { Component } from 'react';
import { numberWithCommas } from 'utils/utils'

class InfoSummary extends Component {
  render() {
    const { tmainInfo } = this.props.info || {}
    const { crepCount, icxSupply, marketCap, transactionCount } = tmainInfo || {}
    const marketCapStr = numberWithCommas(Math.floor(marketCap))
    return (
      <li className="left">
        <p className="subTitle">Market Cap</p>
        <p className={`num a ${marketCapStr.length >= 17 && 'small'}`}>{marketCapStr}<em className="subTitle">USD</em></p>
        <p className="subTitle">ICX Supply</p>
        <p className="num b">{numberWithCommas(icxSupply)}<em className="subTitle">ICX</em></p>
        <hr className="hr" />
        <p className="subTitle c">All Transactions<em>{numberWithCommas(transactionCount)}</em></p>
        <p className="subTitle c">C-reps<em>{numberWithCommas(crepCount)}</em></p>
        {/*<p className="subTitle c">Public Treasury<em>{numberWithCommas(publicTreasury)}</em></p>*/}
      </li>
    );
  }
}

export default InfoSummary;

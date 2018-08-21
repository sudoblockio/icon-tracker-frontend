import React, { Component } from 'react';
import { numberWithCommas, convertNumberToText } from 'utils/utils'

class InfoSummary extends Component {
  render() {
    const { tmainInfo } = this.props.info || {}
    const { crepCount, icxSupply, marketCap, transactionCount, icxCirculationy } = tmainInfo || {}
    const marketCapStr = numberWithCommas(Math.floor(marketCap))
    return (
      <li className="left">
        <p className="subTitle a">Market Cap<em className="subTitle">USD</em></p>
        <p className={`num a ${marketCapStr.length >= 17 && 'small'}`}>{marketCapStr}</p>
        <p className="subTitle">ICX Supply</p>
        <p className="num b">{numberWithCommas(icxSupply)}</p>
        <p className="subTitle">ICX Circulation</p>
        <p className="num c">{convertNumberToText(icxCirculationy, 0)}</p>
        <hr className="hr"/>
        <p className="subTitle c">All Transactions<em>{numberWithCommas(transactionCount)}</em></p>
        <p className="subTitle c">C-reps<em>{numberWithCommas(crepCount)}</em></p>
        {/*<p className="subTitle c">Public Treasury<em>{numberWithCommas(publicTreasury)}</em></p>*/}
      </li>
    );
  }
}

export default InfoSummary;

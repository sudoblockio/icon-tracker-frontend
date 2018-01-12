import React, { Component } from 'react';

class InfoSummary extends Component {
  render() {
    const { tmainInfo } = this.props.mainPage
    const { crepCount, icxSupply, marketCap, publicTreasury, transactionCount } = tmainInfo
    return (
      <li className="left">
        <p className="subTitle">Market Cap</p>
        <p className="num a">{marketCap}<em className="subTitle">ICX</em></p>
        <p className="subTitle">ICX Supply</p>
        <p className="num b">{icxSupply}<em className="subTitle">ICX</em></p>
        <hr className="hr" />
        <p className="subTitle c">All Transactions<em>{transactionCount}</em></p>
        <p className="subTitle c">C-reps<em>{crepCount}</em></p>
        <p className="subTitle c">Public Treasury<em>{publicTreasury}</em></p>
      </li>
    );
  }
}

export default InfoSummary;

import React, { Component } from 'react';

class InfoChart extends Component {
  render() {
    const { tmainChart } = this.props.mainPage
    return (
      <li className="right">
        <p className="subTitle">Daily Transactions</p>
        <div className="graph">
          <img src="../image/chart.png" />
        </div>
      </li>
    );
  }
}

export default InfoChart;

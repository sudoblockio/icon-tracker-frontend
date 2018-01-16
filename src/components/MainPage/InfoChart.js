import React, { Component } from 'react';
import chart from '../../style/image/chart.png'

class InfoChart extends Component {
  render() {
    const { tmainChart } = this.props.mainPage
    return (
      <li className="right">
        <p className="subTitle">Daily Transactions</p>
        <div className="graph">
          <img src={chart}/>
        </div>
      </li>
    );
  }
}

export default InfoChart;

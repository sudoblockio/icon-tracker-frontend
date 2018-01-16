import React, { Component } from 'react';
import Chart from 'chart.js'
import chartImg from '../../style/image/chart.png'

class InfoChart extends Component {
  componentDidMount() {
    var ctx = document.getElementById("txChart");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['JAN 3', 'JAN 4', 'JAN 5', 'JAN 6', 'JAN 7', 'JAN 8'],
        datasets: [{
          data: [12, 19, 3, 5, 2, 3],
        }]
      },
      options: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 15,
            right: 40,
            top: 25,
            bottom: 15
          }
        },
        elements: {
          point: {
            radius: 2.5,
            pointStyle: 'circle',
            backgroundColor: '#fff',
            borderColor: '#1aaaba',
            borderWidth: 1.5
          },
          line: {
            tension: 0,
            borderColor: '#1aaaba',
            borderWidth: 2
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:false
            }
          }]
        }
      }
    });
  }

  render() {
    const { tmainChart } = this.props.mainPage
    return (
      <li className="right">
        <p className="subTitle">Daily Transactions</p>
        <div className="graph">
          <canvas id="txChart" width="580" height="315"></canvas>
        </div>
      </li>
    );
  }
}

export default InfoChart;

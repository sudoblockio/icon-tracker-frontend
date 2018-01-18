import React, { Component } from 'react';
import Chart from 'chart.js'
import moment from 'moment'
import chartImg from '../../style/image/chart.png'
import { LoadingComponent } from '../../components'

class InfoChart extends Component {

  constructor(props) {
    super(props)
    this.txChart = null
  }

  componentDidUpdate() {
    const { tmainChart } = this.props.mainPage
    const ctx = document.getElementById("txChart");
    // canvas 가 랜더링 되기 전, 미리 생성된 차트가 있을 경우, 차트 데이터가 비어 있을 경우 return
    if (!ctx || !!this.txChart || tmainChart.length === 0) {
      return
    }

    const chartData = this.makeChartData(tmainChart)
    this.txChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          data: chartData.data,
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        layout: {
          padding: {
            left: 25,
            right: 30,
            top: 35,
            bottom: 20
          }
        },
        elements: {
          point: {
            radius: 2.5,
            hoverRadius: 2.5,
            pointStyle: 'circle',
            backgroundColor: '#fff',
            borderColor: '#1aaaba',
            borderWidth: 1.5,
          },
          line: {
            tension: 0,
            borderColor: '#1aaaba',
            borderWidth: 2,
            backgroundColor: 'rgba(0,0,0,0)'
          },
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(100,100,100,0.2)',
              // color: 'green',
              drawTicks: true,
              drawBorder: false
            },
            ticks: {
              padding: 5,
              fontSize: 9,
              fontColor: '#aaa',
              fontFamily: 'NanumSquare',
            }
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(100,100,100,0.4)',
              zeroLineColor: 'rgba(100,100,100,0.7)',
              // color: 'yellow',
              // zeroLineColor: 'red',
              borderDash: [2,2],
              drawTicks: false,
              drawBorder: false
            },
            ticks: {
              padding: 10,
              fontSize: 9,
              fontColor: '#aaa',
              fontFamily: 'NanumSquare',
              beginAtZero: true,
              suggestedMax: chartData.max,
              suggestedMin: chartData.min,
              stepSize: chartData.step
            }
          }]
        }
      }
    });
  }

  makeChartData(chartData) {
    let labels = []
    let data = []

    chartData.reverse().forEach((c, i) => {
      labels.push(i % 2 === 0 ? '' : moment(c.targetDate).format('MMM D'))
      data.push(c.txCount + 30)
    })

    let max = Math.max.apply(null, data)
    let min = Math.min.apply(null, data)
    let step = Math.round((max - min) / 4)

    console.log(max, min, step)

    max += step
    min = min > step ? min - step : step
    // step = Math.ceil((max - min) / 6 / 50) * 50
    step = Math.round(Math.round((max - min) / 3) / 50) * 50

    console.log(max, min, step)

    return { labels, data, max, min, step }
  }

  render() {
    const { loading, tmainChart } = this.props.mainPage
    return (
      <li className="right">
        <p className="subTitle">Daily Transactions</p>
        <div className="graph">
          {
            loading ?
            <div style={{height: '315px'}}>
              <LoadingComponent />
            </div>
            :
            <canvas id="txChart" width="580" height="315"></canvas>
          }
        </div>
      </li>
    );
  }
}

export default InfoChart;

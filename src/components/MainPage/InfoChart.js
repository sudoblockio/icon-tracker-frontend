import React, { Component } from 'react';
import Chart from 'chart.js'
import moment from 'moment'
import { LoadingComponent } from '../../components'

class InfoChart extends Component {

  constructor(props) {
    super(props)
    this.txChart = null
  }

  componentWillMount() {
    this.props.getMainChart()
  }

  componentDidUpdate() {
    const { tmainChart } = this.props.chart
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
          enabled: true,
          titleFontFamily: 'NanumSquare',
          titleFontSize: 9,
          bodyFontFamily: 'NanumSquare',
          bodyFontSize: 10,
          bodyFontStyle: 'bold',
          displayColors: false,
          cornerRadius: 0,
          caretPadding: 7,
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

  makeChartData(tmainChart) {
    let labels = []
    let data = []
    let chartData = tmainChart.sort((a, b) => moment(a.targetDate).format('x') - moment(b.targetDate).format('x'))

    chartData.forEach((c, i) => {
      // labels.push(i % 2 === 0 ? '' : moment(c.targetDate).format('MMM D'))
      labels.push(moment(c.targetDate).format('MMM D'))
      data.push(c.txCount)
    })

    let max = Math.max.apply(null, data)
    let min = Math.min.apply(null, data)
    let step = Math.round((max - min) / 4)

    max += step
    min = min > step ? min - step : step
    step = Math.round(Math.round((max - min) / 3) / 50) * 50

    return { labels, data, max, min, step }
  }

  render() {
    const { loading } = this.props.chart
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

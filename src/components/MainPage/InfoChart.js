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
    if (!ctx || !!this.txChart || !tmainChart || tmainChart.length === 0) {
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
            // left: 25,
            // right: 30,
            // top: 35,
            // bottom: 20
          }
        },
        elements: {
          point: {
            radius: 2.5,
            hoverRadius: 2.5,
            pointStyle: 'circle',
            backgroundColor: '#1aaaba',
            borderColor: '#fff',
            borderWidth: 1.5,
          },
          line: {
            tension: 0,
            borderColor: '#fff',
            borderWidth: 2,
            backgroundColor: 'rgba(0,0,0,0)'
          },
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: '#56c0cc',
              drawTicks: true,
              drawBorder: false
            },
            ticks: {
              padding: 5,
              fontSize: 9,
              fontColor: '#9deaf2',
              fontFamily: 'NanumSquare',
            }
          }],
          yAxes: [{
            gridLines: {
              color: '#56c0cc',
              zeroLineColor: '#fff',
              borderDash: [2,2],
              drawTicks: false,
              drawBorder: false
            },
            ticks: {
              padding: 10,
              fontSize: 9,
              fontColor: '#9deaf2',
              fontFamily: 'NanumSquare',
              beginAtZero: true,
              max: chartData.max,
              min: chartData.min,
              stepSize: chartData.step
            }
          }]
        }
      }
    });
  }

  makeChartData(tmainChart) {
    if (tmainChart && tmainChart.length !== 0) {
      const chartData = tmainChart.sort((a, b) => moment(a.targetDate).format('x') - moment(b.targetDate).format('x'))
      const labels = []
      const data = []
  
      chartData.forEach((c, i) => {
        labels.push(moment(c.targetDate).format('MMM D'))
        data.push(c.txCount)
      })
  
      let max = Math.max.apply(null, data)
      let min = Math.min.apply(null, data)
      let step = Math.round((max - min) / 4)
      let division = Math.pow(10, step.toString().length - 2) * 5
  
      console.log(min, max, step, division)

      step = Math.ceil(step / division) * division
      min = Math.floor(min / division) * division
      max = min + step * 5

      console.log(min, max, step)

      return { 
        labels, 
        data, 
        max, 
        min, 
        step 
      }
    }
    else {
      return {
        labels: [],
        data: [],
        max: 100000,
        min: 0,
        step: 25000,
      }
    }
  }

  render() {
    const { loading } = this.props.chart
    const ChartHeight = 236
    const ChartWidth = 724
    return (
      <li className="right">
        <p className="subTitle">Daily Transactions</p>
        <div className="graph" style={{background: '#1aaaba'}}>
          {
            loading ?
            <div style={{ width: `${ChartWidth}px`, height: `${ChartHeight}px` }}>
              <LoadingComponent />
            </div>
            :
            <canvas id="txChart" width={`${ChartWidth}`} height={`${ChartHeight}`}></canvas>
          }
        </div>
      </li>
    );
  }
}

export default InfoChart;

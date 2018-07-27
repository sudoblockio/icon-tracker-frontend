import React, { Component } from 'react';

class LoadingComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'none'
    }
    this.timeout = 0
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ display: 'block' })
    }, 500)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { display } = this.state
    const { height } = this.props
    const Content = () => {
      if (height) {
        return (
          <div style={{ height }}>
            <LoadingDiv display={display} />
          </div>
        )
      }
      else {
        return (
          <LoadingDiv display={display} />
        )
      }
    }

    return Content()
  }
}

const LoadingDiv = ({ display }) => (
  <div className='loadingDiv' style={{ display }}>
    <div className="loading">
      <svg className="lds-spinner" width="49px" height="49px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ background: 'none' }}>
        <g transform="rotate(0 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(30 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(60 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(90 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(120 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(150 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(180 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(210 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(240 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(270 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(300 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(330 50 50)">
          <rect x="47.5" y="23" rx="4.75" ry="2.3000000000000003" width="5" height="14" fill="#c8c8c8">
            <animate attributeName="opacity" values="1;0" dur="1s" begin="0s" repeatCount="indefinite"></animate>
          </rect>
        </g>
      </svg>
    </div>
  </div>
)

export default LoadingComponent;

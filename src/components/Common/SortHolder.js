import React, { Component } from 'react';

const CountType = [20, 40, 80, 160]

class SortHolder extends Component {
  componentDidMount() {
    const event = new CustomEvent('CUSTOM_FX_SORTHOLDER')
    window.dispatchEvent(event)
  }

  render() {
    return (
      <div className="sort-holder">
        <p>{this.props.count}<span>(Show)</span><em className="img"></em></p>
        <ul>
          {CountType.map((count, index) => (
            <li key={index} onClick={() => { this.props.getData(count) }}><span>{count}</span></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SortHolder;
import React, { Component } from 'react';
import {
  SORT_TYPE
} from 'utils/const'

class SortHolder extends Component {
  componentDidMount() {
    const event = new CustomEvent('CUSTOM_FX', { detail: "SORT_HOLDER" })
    window.dispatchEvent(event)
  }

  render() {
    return (
      <div className="sort-holder">
        <p>{this.props.count}<span>(Show)</span><em className="img"></em></p>
        <ul>
          {SORT_TYPE.map((count, index) => (
            <li key={index} onClick={() => { this.props.getData(count) }}><span>{count}</span></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SortHolder;
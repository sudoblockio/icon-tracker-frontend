import React, { Component } from 'react';
import {
  SORT_TYPE
} from '../../utils/const'

class SortHolder extends Component {

  onMouseEnter = () => {
    window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "SORT_ENTER" } }))
  }

  onMouseLeave = () => {
    window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "SORT_LEAVE" } }))
  }

  render() {
    return (
      <div className="sort-holder" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
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
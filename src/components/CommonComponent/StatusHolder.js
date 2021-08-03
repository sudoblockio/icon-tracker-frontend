import React, { Component } from 'react';
import {
  STATUS_TYPE
} from '../../utils/const'

class StatusHolder extends Component {

  onClick = () => {
    window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "CONTRACT_STATUS" } }))
  }

  render() {
    return (
      <th className="status-holder">
        <span onClick={this.onClick}>Status<em className="img"></em></span>
        <ul>
          {STATUS_TYPE.map((type, index) => (
            <li key={index} onClick={() => { this.props.getData(type !== 'All' ? type : '') }}><span>{type}</span></li>
          ))}
        </ul>
      </th>
    );
  }
}

export default StatusHolder;
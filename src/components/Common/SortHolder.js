import React, { Component } from 'react';

class SortHolder extends Component {
  render() {
    return (
      <div className="sort-holder">
        <p>160<span>(Show)</span><em className="img"></em></p>
        <ul>
          <li><span>20</span></li>
          <li><span>40</span></li>
          <li><span>80</span></li>
          <li><span>160</span></li>
        </ul>
      </div>
    );
  }
}

export default SortHolder;
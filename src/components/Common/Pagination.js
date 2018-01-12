

/* eslint-disable no-undef */

import React, { Component } from 'react';
import { isInt } from '../../utils/utils';

class Pagination extends Component {

  constructor(props) {
    super(props);
  }

  getData = (target) => {
    const { getData, pageNum, maxPageNum } = this.props;

    switch (target) {
      case 'start':
        if (pageNum === 0) return false;
        getData();
        break;
      case 'prev':
        if (pageNum === 0) return false;
        getData(pageNum-1);
        break;
      case 'next':
        if (pageNum === maxPageNum) return false;
        getData(pageNum+1);
        break;
      case 'end':
        if (pageNum === maxPageNum) return false;
        getData(maxPageNum);
        break;
    }
  }

  render() {
    const { pageNum, maxPageNum } = this.props;
    console.log(pageNum, typeof pageNum)
    return (
      <ul className="page">
        <li onClick={() => this.getData('start')}>
          <span className="start"><em className="img"></em></span>
        </li>
        <li onClick={() => this.getData('prev')}>
          <span className="prev"><em className="img"></em></span>
        </li>
        <li className="pageNum">
          <p>Page</p>
          <input disabled type="text" className="txt-type-page" placeholder="" value={pageNum} /> / 10000
        </li>
        <li onClick={() => this.getData('next')}>
          <span name="next" className="next"><em className="img"></em></span>
        </li>
        <li onClick={() => this.getData('end')}>
          <span name="end" className="end"><em className="img"></em></span>
        </li>
      </ul>
    );
  }
}

export default Pagination;

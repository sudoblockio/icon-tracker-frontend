/* eslint-disable no-undef */
import React, { Component } from 'react';

class Pagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNum: props.pageNum
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pageNum !== nextProps.pageNum && nextProps.pageNum) {
      this.setState({
        pageNum: nextProps.pageNum
      })
    }
  }

  getData = (target) => {
    let { getData, pageNum, maxPageNum } = this.props;
    pageNum = Number(pageNum);
    maxPageNum = Number(maxPageNum);
    switch (target) {
      case 'start':
        if (pageNum === 1) return false;
        getData(1);
        break;
      case 'prev':
        if (pageNum === 1) return false;
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
      default:        
    }
  }

  handleInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      if(Number(e.target.value) <= this.props.maxPageNum) {
        this.setState({
          pageNum: e.target.value
        })
      }
    }
  }

  handleKeyPress = (e) => {
    const { getData } = this.props;
    if (!Number(this.state.pageNum)) return;
    if (e.key === 'Enter') {
      getData(this.state.pageNum)
    }
  }

  render() {
    const { maxPageNum } = this.props;
    const { pageNum } = this.state;
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
          <input onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} type="text" className="txt-type-page" placeholder="" value={pageNum} /> / {maxPageNum}
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

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { value } = this.state;
    return (
      <div className="search-group">
        <input onChange={this.handleInputChange} type="text" className="txt-type-normal" placeholder="Enter Address, Tx hash, Block Height" value={value}/>
        <span><em className="img"></em></span>
      </div>
    );
  }
}

export default SearchBox;

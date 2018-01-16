import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

  handleSubmit = () => {
    this.props.search(this.state.value)
  }

  render() {
    const { value } = this.state;
    return (
      <div className="search-group">
        <input onChange={this.handleInputChange} type="text" className="txt-type-normal" placeholder="Enter Address, Tx hash, Block Height" value={value}/>
        <span onClick={this.handleSubmit}><em className="img"></em></span>
      </div>
    );
  }
}

export default SearchBox;

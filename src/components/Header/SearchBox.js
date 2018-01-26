import React, { Component } from 'react';
import { LoadingComponent } from '../../components/';

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

  handleKeyPress = (e) => {
    if (!this.state.value) return;
    if (e.key === 'Enter') {
      this.props.search(this.state.value)
      this.setState({
        value: ''
      })
    }
  }

  handleSubmit = () => {
    if (!this.state.value) return;
    this.props.search(this.state.value)
    this.setState({
      value: ''
    })
  }

  render() {
    const { loading } = this.props;
    const { value } = this.state;
    return (
      <div className="search-group">
        <input onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} type="text" className="txt-type-normal" placeholder="Enter Address, Tx hash, Block Height" value={value}/>
        <span>
          {
            loading ? <LoadingComponent />
                    : <em onClick={this.handleSubmit} className="img"></em>
          }</span>
      </div>
    );
  }
}

export default SearchBox;

import React, { Component } from 'react';

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    const prevSearch = this.state[name]
    this.setState({ [name]: value }, () => {
      if (prevSearch !== '' && value === '') {
        this.handleClick()
      }
    })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleClick()
    }
    if (e.keyCode === 27) {
      const { name } = e.target
      this.setState({ [name]: '' }, () => {
        this.handleClick()
      })
    }
  }

  handleClick = () => {
    const { search } = this.state
    this.props.setSearch(search)
  }

  render() {
    const { search } = this.state
    const { placeholder } = this.props
    return (
      <div className="search-holder">
        <div className="search-group">
          <input name="search" type="text" className="txt-type-search"
            placeholder={placeholder}
            value={search}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <span onClick={this.handleClick}><em className="img"></em></span>
        </div>
      </div>
    )
  }
}

export default SearchInput
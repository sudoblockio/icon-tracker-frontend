import React, { Component } from 'react';

class SearchInput extends Component {
  constructor(props) {
    super(props)
    const { searchKeyword } = this.props
    this.state = {
      search: searchKeyword
    }
  }

  componentDidMount = () => {
    const { searchKeyword, id } = this.props
    if (searchKeyword && id) {
      document.getElementById(id).focus()
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

  handleFocus = (e) => {
    const { value } = e.target
    e.target.value = ''
    e.target.value = value
  }

  handleClick = () => {
    const { search } = this.state
    this.props.changeSearch(search)
  }

  render() {
    const { search } = this.state
    const { placeholder, id } = this.props
    return (
      <div className="search-holder">
        <div className="search-group">
          <input name="search" type="text" className="txt-type-search"
            id={id}
            placeholder={placeholder}
            value={search}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
          />
          <span onClick={this.handleClick}><em className="img"></em></span>
        </div>
      </div>
    )
  }
}

export default SearchInput
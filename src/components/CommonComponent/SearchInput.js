import React, { Component } from 'react';
import { searchBlocks } from '../../redux/store/search';
import { connect } from 'react-redux'


class SearchInput extends Component {
  constructor(props) {
    super(props)
    const { searchKeyword, redirect } = this.props
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
    // console.log(e, "e")
    const { name, value } = e.target
    const prevSearch = this.state[name]
    this.setState({ [name]: value }, () => {
      // if (prevSearch !== '' && value === '') {
      //   this.handleClick()
      // }
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
    console.log(this.props, "search input props")
    const { search } = this.state
    console.log(this.props, "all")
    console.log(this.props.search(search), "plz be a function")
    console.log(search, "is this a numver?")
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
          <span onClick={this.handleClick()}><em className="img"></em></span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    redirect: state.search.redirect
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: payload => dispatch(searchBlocks(payload))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (SearchInput)
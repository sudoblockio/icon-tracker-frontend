import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import searchReducer, { searchBlocks } from '../../redux/store/search';
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
    const { search } = this.state
    this.props.search(search)
    console.log(this.props, "this props")
  }
  
  render() {
    if (this.props.redirect === true) {
    }
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
  {console.log(state, "this is state")}
  return {
    url: state.router.location, 
    redirect: state.search.redirect,
    router: state.router, 
    ...state.search,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: payload => dispatch(searchBlocks(payload))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (SearchInput))
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import searchReducer, { searchBlocks } from '../../redux/store/search';
import { TX_TYPE } from '../../utils/const'
import { connect } from 'react-redux'

export const block_re = new RegExp('([0-9][1-9][0-9]{1,7}|100000000)')
export const add_re = new RegExp('^hx[a-fA-F0-9]{40}$')
export const tx_re = new RegExp('^0x([A-Fa-f0-9]{64})$') 
let searchByType;

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
    searchByType = (search) => {
      console.log(block_re.test('hx562dc1e2c7897432c298115bc7fbcc3b9d5df294'), "test a hash")
      if (block_re.test(search) === true) {
        console.log("is a block num")
        this.props.searchBlocks(search)
        this.props.history.push(`/blocks/${search}`)
      } else if (add_re.test(search)){
        console.log("is an address")
      } else if (tx_re.test(search)) {
        console.log("is a tx")
        // this.props.history.searchTx(search)
        // this.props.history.push(/transactions/${search})
      } else {
        // the search is not found. 
        // handle error, make suggestion
      }
        

    }
    this.props.searchBlocks(search)
    console.log(TX_TYPE)
    // refactor to be dynamic
    
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
          <span><em className="img"></em></span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.router.location, 
    redirect: state.search.redirect,
    router: state.router, 
    ...state.search,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchBlocks: payload => dispatch(searchBlocks(payload))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (SearchInput))
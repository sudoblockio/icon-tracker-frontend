import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import {searchBlocks} from '../../redux/store/search'


export const block_re = new RegExp('([0-9][1-9][0-9]{1,7}|100000000)')
export const add_re = new RegExp('^hx[a-fA-F0-9]{40}$')
export const tx_re = new RegExp('^0x([A-Fa-f0-9]{64})$')
let searchByType; 

function SearchInput() {
  const dispatch = useDispatch();
  const [ search, setSearch] = useState("")
  const [ errors, setError ] = useState("")


  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick(e)
    }
    // keycode 27 = `esc`
    if (e.keyCode === 27) {
      const { name } = e.target
      this.setState({ [name]: '' }, () => {
        handleClick()
      })
    }
  }

  const handleClick = (e) => {
    const searchTerm = e.target.value
    console.log(searchTerm, "search term")
    
    if (block_re.test(searchTerm)) {
      console.log("it is a block")
      dispatch(searchBlocks(searchTerm))
      this.props.history.push(`/blocks/${searchTerm}`)
    } else {
      setError("Not Found")
    }

  }

    return (
      <div className="search-holder">
        <div className="search-group">
          <input name="search" type="text" className="txt-type-search"
            placeholder="Address, TxHash, Block, SCORE"
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div className="error-holder">
            <div><p id="error-message">{errors}</p></div>
          </div>
          <span onClick={handleClick}><em className="img"></em></span>
        </div>
      </div>
    )
  
}

export  {SearchInput, searchByType}
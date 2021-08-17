import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { findData } from '../../redux/store/search'

function SearchInput() {
  const dispatch = useDispatch();
  const [ search, setSearch] = useState("")
  const [ errors, setError ] = useState("")


  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick(e.target.value)
    }
    // keycode 27 = `esc`
    if (e.keyCode === 27) {
      const { name } = e.target
      this.setState({ [name]: '' }, () => {
        handleClick()
      })
    }
  }
  
  // this is the "dispatch search" function 
  // STUB: search query sort
  const handleClick = async (e) => {
    const block_re = () => {
    new RegExp('([0-9][1-9][0-9]{1,7}|100000000)')
  }
  console.log(e)
    

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

export default SearchInput
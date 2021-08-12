import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { findData } from '../../redux/store/search'

function SearchInput(props) {
  const dispatch = useDispatch();
  const [ search, setSearch] = useState("")


  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick()
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
  const handleClick = async (e) => {
    let searchResults = await dispatch(findData(search))
    console.log("search:", searchResults)
    searchResults? console.log(searchResults) : /*error handler*/ console.log("nope")
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
          <span onClick={handleClick}><em className="img"></em></span>
        </div>
      </div>
    )
  
}

export default SearchInput
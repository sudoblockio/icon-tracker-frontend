import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { isAddress } from 'web3-utils';
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
  
  // this is the "dispatch search" function 
  // STUB: search query sort
  const handleClick = (e) => {
    const block_re = new RegExp('([0-9][1-9][0-9]{1,7}|100000000)')
    const add_re = new RegExp()
    const tx_re = new RegExp()
    const searchTerm = e.target.value

    const searchByType = (searchTerm) =>{
      return block_re.test(searchTerm) === true ? dispatch(/*searchBlocks(searchTerm)*/)
            : add_re.test(searchTerm) === true ? dispatch(/*searchAdd(searchTerm)*/)
            : tx_re.test(searchTerm) === true ? dispatch(/*searchTx(searchTerm)*/)
            : setError("Not found")
    } 

    searchByType(searchTerm)

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
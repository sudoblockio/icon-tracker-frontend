import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import searchBlocks from '../../redux/store/search'

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
  const anum = 60006
  console.log(block_re.test(anum.toString()), "block number test ")
  const handleClick = (e) => {
    const searchTerm = e.target.value
    let searchByType = (searchTerm) => {
      return block_re.test(searchTerm) === true ? dispatch(searchBlocks(searchTerm)) : setError("Not found")
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

export  {SearchInput, searchByType}
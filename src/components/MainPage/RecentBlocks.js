import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { numberWithCommas, dateToUTC } from '../../utils/utils'
import { LoadingComponent, BlockLink } from '../../components'
import icon_02 from '../../style/image/icon_02.png'

class RecentBlocks extends Component {
  render() {
    const { loading, tmainBlock } = this.props.info 
    const list = tmainBlock || []
    return (
      <li className="left">
        <p className="title">Blocks<Link to='/blocks'><span>View all<em className="img"></em></span></Link></p>
        <div className="list-group">
        {
          loading ?
          <div style={{height: '511px'}}>
            <LoadingComponent />
          </div>
          :
          <ul className="list">
            {list.map((block, index) => {
              const { blockHeight, createDate, hash, txCount } = block
              return (
                <li key={index}>
                  <p className="icon">
                    <img src={icon_02} alt="block-img"/>
                    <span>BLOCK</span>
                    <span><BlockLink to={blockHeight} label={numberWithCommas(blockHeight)}/></span>
                  </p>
                  <p className="a">Hash<em><BlockLink to={blockHeight} label={hash}/></em></p>
                  <p className="b">Transactions<em>{numberWithCommas(txCount)}</em></p>
                  <p className="c">Time Stamp<em>{dateToUTC(createDate, true)}</em></p>
                </li>
              )
            })}
          </ul>
        }
        </div>

      </li>
    );
  }
}

export default RecentBlocks;

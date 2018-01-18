import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { numberWithCommas, dateToUTC } from '../../utils/utils'
import { LoadingComponent, BlockLink } from '../../components'
import icon_02 from '../../style/image/icon_02.png'

class RecentBlocks extends Component {
  render() {
    const { loading, tmainBlock } = this.props.mainPage
    return (
      <li className="left">
        <p className="title">Recent Block<Link to='/blocks'><span>View all<em className="img"></em></span></Link></p>
        <div className="list-group">
        {
          loading ?
          <div style={{height: '511px'}}>
            <LoadingComponent />
          </div>
          :
          <ul className="list">
            {tmainBlock.map(block => {
              const { blockHeight, createDate, hash, txCount } = block
              return (
                <li key={blockHeight}>
                  <p className="icon">
                    <img src={icon_02} />
                    <span>Block</span>
                    <span>{blockHeight}</span>
                  </p>
                  <p className="a">C-rep<em><BlockLink to={blockHeight} label={hash.substr(0, 42)}/></em></p>
                  <p className="b">Transactions<em>{numberWithCommas(txCount)}</em></p>
                  <p className="c">Time stamp<em>{dateToUTC(createDate, true)}</em></p>
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

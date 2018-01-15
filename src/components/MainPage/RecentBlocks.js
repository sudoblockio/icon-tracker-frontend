import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { numberWithCommas, dateToUTC9 } from '../../utils/utils'

class RecentBlocks extends Component {
  render() {
    const { tmainBlock } = this.props.mainPage
    return (
      <li className="left">
        <p className="title">Recent Block<Link to='/blocks'><span>View all<em className="img"></em></span></Link></p>
        <div className="list-group">
          <ul className="list">
            {tmainBlock.map(block => {
              const { blockHeight, createDate, hash, txCount } = block
              return (
                <li key={blockHeight}>
                  <p className="icon">
                    <img src="../image/icon_02.png" />
                    <span>Block</span>
                    <span>{blockHeight}</span>
                  </p>
                  <p className="a">C-rep<em>{hash.substr(0, 42)}</em></p>
                  <p className="b">Transactions<em>{numberWithCommas(txCount)}</em></p>
                  <p className="c">Time stamp<em>{dateToUTC9(createDate, true)}</em></p>
                </li>
              )
            })}
          </ul>
        </div>

      </li>
    );
  }
}

export default withRouter(RecentBlocks);

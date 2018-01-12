import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class RecentBlocks extends Component {
  render() {
    const { tmainBlock } = this.props.mainPage
    return (
      <li className="left">
        <p className="title">Recent Block<Link to='/blocks'><span>View all<em className="img"></em></span></Link></p>
        <div className="list-group">
          <ul className="list">
            <li>
              <p className="icon">
                <img src="../image/icon_02.png" />
                <span>Block</span>
                <span>999999</span>
              </p>
              <p className="a">C-rep<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
              <p className="b">Transactions<em>100</em></p>
              <p className="c">Time stamp<em>2017-12-14 13:11:11(UTC+9)</em></p>
            </li>
            <li>
              <p className="icon">
                <img src="../image/icon_02.png" />
                <span>Block</span>
                <span>999999</span>
              </p>
              <p className="a">C-rep<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
              <p className="b">Transactions<em>100</em></p>
              <p className="c">Time stamp<em>2017-12-14 13:11:11(UTC+9)</em></p>
            </li>
          </ul>
        </div>

      </li>
    );
  }
}

export default withRouter(RecentBlocks);

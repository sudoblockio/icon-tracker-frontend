import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SearchBox } from '../';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header-wrap">
				<div className="wrap-holder">
					<div className="content">
            <Link to='/'><span className="logo"><em>Tracker</em></span></Link>
						<div className="link">
							<ul>
                <Link to='/wallets'><li>Wallet</li></Link>
                <Link to='/transactions'><li>Transactions</li></Link>
                <Link to='/blocks'><li>Blocks</li></Link>
              </ul>
							<SearchBox />
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default withRouter(Header);

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

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
                <Link to='/wallet/1'><li>Wallet</li></Link>
                <Link to='/transactions'><li>Transactions</li></Link>
                <Link to='/blocks'><li>Blocks</li></Link>
              </ul>
							<div className="search-group">
								<input type="text" className="txt-type-normal" placeholder="Enter Address, Tx hash, Block Height" value=""/>
								<span><em className="img"></em></span>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default withRouter(Header);

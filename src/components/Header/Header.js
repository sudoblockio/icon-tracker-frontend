import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SearchBox } from '../../components/';

class Header extends Component {

  render() {
    return (
      <div className="header-wrap">
				<div className="wrap-holder">
					<div className="content">
            <Link to='/'><span className="logo"><em>Tracker</em></span></Link>
						<div className="link">
							<ul>
                <Link to='/wallets'><li>Address</li></Link>
                <Link to='/blocks'><li>Block</li></Link>
                <Link to='/transactions'><li>Transaction</li></Link>
              </ul>
							<SearchBox {...this.props} />
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default Header;

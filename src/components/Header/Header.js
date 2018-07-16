import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SearchBox } from '../../components/';
import { withRouter } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header-wrap">
				<div className="wrap-holder">
					<div className="content">
            <Link to='/'><span className="logo"></span></Link>
						<div className="link">
							<ul>
                <li>
                  <span>Address<em className="img"></em></span>
									<ol className="sub-menu">                    
                    <li><span onClick={() => {this.props.history.push('/addresses')}}>Addresses List</span></li>                    
										<li><span onClick={() => {this.props.history.push('/contracts')}}>Contracts List</span></li>
									</ol>
                </li>
                <li><span onClick={() => {this.props.history.push('/blocks')}}>Block</span></li>
                <li><span onClick={() => {this.props.history.push('/transactions')}}>Transaction</span></li>
                <li>
                  <span>Token<em className="img"></em></span>
									<ol className="sub-menu">                    
                    <li><span onClick={() => {this.props.history.push('/tokens')}}>Token List</span></li>                    
										<li><span onClick={() => {this.props.history.push('/tokentransfers')}}>Token Transfer List</span></li>
									</ol>
                </li>
              </ul>
							<SearchBox {...this.props} />
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default withRouter(Header);

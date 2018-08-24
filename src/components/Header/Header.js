import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SearchBox } from 'components';
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
                    <li onClick={() => {this.props.history.push('/addresses')}}><span>Addresses</span></li>                    
										<li onClick={() => {this.props.history.push('/contracts')}}><span>Contracts</span></li>
									</ol>
                </li>
                <li onClick={() => {this.props.history.push('/blocks')}}><span>Block</span></li>
                <li onClick={() => {this.props.history.push('/transactions')}}><span>Transaction</span></li>
                <li>
                  <span>Token<em className="img"></em></span>
									<ol className="sub-menu">                    
                    <li onClick={() => {this.props.history.push('/tokens')}}><span>Tokens</span></li>                    
										<li onClick={() => {this.props.history.push('/tokentransfers')}}><span>Token Transfers</span></li>
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

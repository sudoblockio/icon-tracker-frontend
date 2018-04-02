import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-wrap">
    		<div className="screen0">
    			<div className="wrap-holder">
    				<p>©2018 ICON Foundation</p>
    				<div className="sns">
    					<ul>
    						<li className="icon"><a target='_black' href="https://www.icon.foundation"><span className="img"></span></a></li>
    						<li className="medium"><a target='_black' href="https://medium.com/@helloiconworld"><span className="img"></span></a></li>
                <li className="brunch"><a target='_black' href="https://brunch.co.kr/@helloiconworld"><span className="img"></span></a></li>
    						<li className="twitter"><a target='_black' href="https://twitter.com/helloiconworld"><span className="img"></span></a></li>
    						<li className="facebook"><a target='_black' href="https://www.facebook.com/helloicon"><span className="img"></span></a></li>
    						<li className="github"><a target='_black' href="https://github.com/icon-project"><span className="img"></span></a></li>
    					</ul>
    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}

export default withRouter(Footer);

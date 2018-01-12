import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <p>©2017 ICON Foundation</p>
            <div className="sns">
              <ul>
                <li className="icon"><a href=""><span className="img"></span></a></li>
                <li className="medium"><a href=""><span className="img"></span></a></li>
                <li className="twitter"><a href=""><span className="img"></span></a></li>
                <li className="facebook"><a href=""><span className="img"></span></a></li>
                <li className="github"><a href=""><span className="img"></span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);

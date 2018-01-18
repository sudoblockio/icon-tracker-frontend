import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="content-wrap nodata">
        <div className="screen0">
          <div className="wrap-holder">
            <div className="contents">
              <p className="title">SORRY.</p>
              <p className="txt">The string below is invalid.<br/>
                      Please double check your key.
              </p>
              <p className="address">{this.props.error || ''}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;

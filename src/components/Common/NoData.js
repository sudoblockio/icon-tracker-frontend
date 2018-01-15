import React, { Component } from 'react';

class NoData extends Component {
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
              <p className="address">{this.props.string}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoData;

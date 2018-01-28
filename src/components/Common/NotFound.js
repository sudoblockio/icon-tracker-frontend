import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillUnmount() {
    // 다른 component 에서 직접 mount 한 경우에는 searchErrorReset 가 정의되어 있지 않음
    if (typeof this.props.searchErrorReset === 'function') {
      this.props.searchErrorReset();
    }
  }

  render() {
    const { error } =  this.props
    return (
      <div className="content-wrap nodata">
        <div className="screen0">
          <div className="wrap-holder">
            <div className="contents">
              <p className="title">SORRY.</p>
              {error ?
                <p className="txt">
                  The string below is invalid.<br/>
                  Please double check your key.
                </p>
                :
                <p className="txt">
                  <br/>
                  <br/>
                  The requested order can not be processed.<br/>
                  Please check again as this may be abnormal access or unpredicted error.
                </p>
              }
              {error && <p className="address">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;

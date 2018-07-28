import React, { Component } from 'react';
import { InfoSummary, InfoChart, RecentBlocks, RecentTransactions } from 'components'

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.getMainInfo()
  }

  render() {
    return (
      <div className="content-wrap">
        <div className="screen0">
          <div className="wrap-holder">
            <ul className="content">
              <InfoSummary {...this.props}/>
              <InfoChart {...this.props}/>
            </ul>
          </div>
        </div>
        <div className="screen1">
          <div className="bg">
            <div className="wrap-holder">
              <ul className="content half">
                <RecentBlocks {...this.props}/>
                <RecentTransactions {...this.props}/>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;

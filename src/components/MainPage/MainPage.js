import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { postMainInfo } from '../../redux/api/rest'

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    postMainInfo().then(
      result => {
        console.log(result)
      }
    )
  }

  render() {
    return (
      <div className="content-wrap">
        <div className="screen0">
          <div className="wrap-holder">
            <ul className="content half">
              <li className="left">
                <p className="subTitle">Market Cap</p>
                <p className="num a">90,000,000,000<em className="subTitle">ICX</em></p>
                <p className="subTitle">ICX Supply</p>
                <p className="num b">800,000,000<em className="subTitle">ICX</em></p>
                <hr className="hr" />
                <p className="subTitle c">All Transactions<em>999,999,999</em></p>
                <p className="subTitle c">C-reps<em>50</em></p>
                <p className="subTitle c">Public Treasury<em>111,444</em></p>
              </li>
              <li className="right">
                <p className="subTitle">Daily Transactions</p>
                <div className="graph">
                  <img src="../image/chart.png" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="screen1">
          <div className="wrap-holder">
            <ul className="content half">
              <li className="left">
                <p className="title">Recent Block<span>View all<em className="img"></em></span></p>
                <div className="list-group">
                  <ul className="list">
                    <li>
                      <p className="icon">
                        <img src="../image/icon_02.png" />
                        <span>Block</span>
                        <span>999999</span>
                      </p>
                      <p className="a">C-rep<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
                      <p className="b">Transactions<em>100</em></p>
                      <p className="c">Time stamp<em>2017-12-14 13:11:11(UTC+9)</em></p>
                    </li>
                    <li>
                      <p className="icon">
                        <img src="../image/icon_02.png" />
                        <span>Block</span>
                        <span>999999</span>
                      </p>
                      <p className="a">C-rep<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
                      <p className="b">Transactions<em>100</em></p>
                      <p className="c">Time stamp<em>2017-12-14 13:11:11(UTC+9)</em></p>
                    </li>
                  </ul>
                </div>

              </li>
              <li className="right">
                <p className="title">Recent Transactions <span>View all<em className="img"></em></span></p>
                <div className="list-group">
                  <ul className="list">
                    <li>
                      <p className="icon"><img src="../image/icon_01.png" /></p>
                      <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
                      <p className="b">Amount<em>100.0000001 ICX</em></p>
                      <p className="c">Fee<em>0.1 ICX</em></p>
                    </li>

                    <li>
                      <p className="icon"><img src="../image/icon_01.png" /></p>
                      <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
                      <p className="b">Amount<em>100.0000001 ICX</em></p>
                      <p className="c">Fee<em>0.1 ICX</em></p>
                    </li>

                    <li>
                      <p className="icon"><img src="../image/icon_01.png" /></p>
                      <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
                      <p className="b">Amount<em>100.0000001 ICX</em></p>
                      <p className="c">Fee<em>0.1 ICX</em></p>
                    </li>

                    <li>
                      <p className="icon"><img src="../image/icon_01.png" /></p>
                      <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
                      <p className="b">Amount<em>100.0000001 ICX</em></p>
                      <p className="c">Fee<em>0.1 ICX</em></p>
                    </li>

                    <li>
                      <p className="icon"><img src="../image/icon_01.png" /></p>
                      <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
                      <p className="b">Amount<em>100.0000001 ICX</em></p>
                      <p className="c">Fee<em>0.1 ICX</em></p>
                    </li>

                    <li>
                      <p className="icon"><img src="../image/icon_01.png" /></p>
                      <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
                      <p className="b">Amount<em>100.0000001 ICX</em></p>
                      <p className="c">Fee<em>0.1 ICX</em></p>
                    </li>

                    <li>
                      <p className="icon"><img src="../image/icon_01.png" /></p>
                      <p className="a">TX Hash<em>0xB704eC3E412910C97d120424f5De0e7b63b2c04E</em></p>
                      <p className="b">Amount<em>100.0000001 ICX</em></p>
                      <p className="c">Fee<em>0.1 ICX</em></p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MainPage);

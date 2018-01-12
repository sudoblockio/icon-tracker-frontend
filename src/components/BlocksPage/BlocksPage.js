import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadingComponent } from '../../components/';

class BlocksPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.getBlocks();
  }

  render() {
    const { loading, data } = this.props;
    return (
			<div className="content-wrap">
				<div className="screen0">
					<div className="wrap-holder">
						<p className="title">Recent Blocks</p>
						<div className="contents">
              {
                loading ? (
                  <LoadingComponent />
                ) : (
                  <table className="table-typeE">
    								<thead>
    									<tr>
    										<th>Block</th>
    										<th>Time Stamp<em>(UTC+9)</em></th>
    										<th>No of Txns</th>
    										<th>C-Rep Address</th>
    										<th>Amount</th>
    										<th>Fee</th>
    									</tr>
    								</thead>
    								<tbody>
    									<tr>
    										<td>Pending</td>
    										<td>2017-12-14 01:53:49</td>
    										<td>1245</td>
    										<td className="break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
    										<td><span>2000.000001</span><em>ICX</em></td>
    										<td><span>20.1</span><em>ICX</em></td>
    									</tr>
    									<tr>
    										<td>Pending</td>
    										<td className="break">2017-12-14 01:53:49</td>
    										<td>1245</td>
    										<td className="break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
    										<td><span>2000.01</span><em>ICX</em></td>
    										<td><span>20.1</span><em>ICX</em></td>
    									</tr>
    									<tr>
    										<td>Pending</td>
    										<td>2017-12-14 01:53:49</td>
    										<td>1245</td>
    										<td className="on break no">-</td>
    										<td><span>200001</span><em>ICX</em></td>
    										<td className="no"><span>-</span></td>
    									</tr>
    									<tr>
    										<td>Pending</td>
    										<td>2017-12-14 01:53:49</td>
    										<td>1245</td>
    										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
    										<td><span>201</span><em>ICX</em></td>
    										<td><span>20.1</span><em>ICX</em></td>
    									</tr>

    								</tbody>
    							</table>
                )
              }


							<ul className="page">
								<li>
									<span className="start"><em className="img"></em></span>
								</li>
								<li>
									<span className="prev"><em className="img"></em></span>
								</li>
								<li className="pageNum">
									<p>Page</p>
									<input type="text" className="txt-type-page" placeholder="" value="" /> / 10000
								</li>
								<li>
									<span className="next"><em className="img"></em></span>
								</li>
								<li>
									<span className="end"><em className="img"></em></span>
								</li>

							</ul>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default withRouter(BlocksPage);

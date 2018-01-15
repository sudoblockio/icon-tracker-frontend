import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, Pagination } from '../../components/';
import { dateToUTC9, convertNumberToText } from '../../utils/utils';

class BlocksPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    const { params } = this.props.match;
    this.props.getBlocks(params['pageId']);
  }

  viewBlockDetail = (height) => {
    const { history } = this.props;
    history.push('/block/'+height)
  }

  getBlocksData = (pageId) => {
    this.props.history.push('/blocks/'+pageId);
    this.props.getBlocks(pageId);
  }

  render() {
    const { loading, data, pageNum, getBlocks, maxPageNum } = this.props;
    return (
			<div className="content-wrap">
				<div className="screen0">
					<div className="wrap-holder">
						<p className="title">Recent Blocks</p>
						<div className="contents">
              {
                loading ? (
                  <div style={{height: '600px'}}>
                    <LoadingComponent />
                  </div>
                ) : (
                  <table className="table-typeE">
    								<thead>
    									<tr>
    										<th>Block Height</th>
    										<th>Time Stamp<em>(UTC+9)</em></th>
    										<th>No of Txns</th>
    										<th>C-Rep Address</th>
    										<th>Amount</th>
    										<th>Fee</th>
    									</tr>
    								</thead>
    								<tbody>
                    {
                      data.map((row) => (
                        <TableRow
                          key={row.height}
                          data={row}
                          viewBlockDetail={() => this.viewBlockDetail(row.height)} />
                      ))
                    }
    								</tbody>
    							</table>
                )
              }

							<Pagination
                pageNum={pageNum}
                maxPageNum={maxPageNum}
                getData={this.getBlocksData} />
						</div>
					</div>
				</div>
			</div>
    );
  }
}

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { data, viewBlockDetail } = this.props;
    return (
      <tr>
        <td><span onClick={viewBlockDetail}>{data.height}</span></td>
        <td>{dateToUTC9(data.createDate)}</td>
        <td>{data.txCount}</td>
        <td className="break">{data.crep}</td>
        <td><span>{convertNumberToText(data.amount, 'icx')}</span><em>ICX</em></td>
        <td><span>{convertNumberToText(data.fee, 'icx')}</span><em>ICX</em></td>
      </tr>
    );
  }
}

export default withRouter(BlocksPage);

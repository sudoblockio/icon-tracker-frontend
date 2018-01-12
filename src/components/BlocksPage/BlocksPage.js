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
    this.props.getBlocks();
  }

  render() {
    const { loading, data, pageNum, getBlocks, totalNum } = this.props;
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
                        <TableRow key={row.height} data={row} />
                      ))
                    }
    								</tbody>
    							</table>
                )
              }

							<Pagination
                pageNum={pageNum}
                maxPageNum={Math.floor(totalNum / 20)}
                getData={getBlocks} />
						</div>
					</div>
				</div>
			</div>
    );
  }
}

const TableRow = ({data}) => {
  return (
    <tr>
      <td>{data.height}</td>
      <td>{dateToUTC9(data.createDate)}</td>
      <td>{data.txCount}</td>
      <td className="break">{data.crep}</td>
      <td><span>{convertNumberToText(data.amount, 'icx')}</span><em>ICX</em></td>
      <td><span>{convertNumberToText(data.fee, 'icx')}</span><em>ICX</em></td>
    </tr>
  )
}

export default withRouter(BlocksPage);

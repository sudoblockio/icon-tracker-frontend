import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { NoData, BlockInformation, BlockTransactions } from '../../components/';
import { dateToUTC9, convertNumberToText } from '../../utils/utils';

class BlockDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    const id = this.props.match.params.id
    this.props.getBlock(id);
  }

  render() {
    const { loading, data, pageNum } = this.props;
    const content = (data) => {
      // 데이터가 없을 경우
      if (data === "") {
        return (
          <NoData string={this.address}/>
        )
      }
      else {
        const { walletDetail, walletTx } = data;
        return (
          <div className="content-wrap">
    				<div className="screen0">
    					<BlockInformation />
    				</div>
    				<div className="screen1">
    					<BlockTransactions />
    				</div>
    			</div>
        )
      }
    }
    return (content(data));
  }
}

export default withRouter(BlockDetailPage);

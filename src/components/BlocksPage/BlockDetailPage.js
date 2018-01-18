import React, { Component } from 'react';
import moment from 'moment';
import { NotFound, BlockInformation, BlockTransactions } from '../../components/';
import { dateToUTC9, convertNumberToText } from '../../utils/utils';

class BlockDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.resetReducer();
    this.getBlock(this.props.url.pathname.split("/")[2], this.props.url.pathname.split("/")[3] || 1)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url.pathname !== this.props.url.pathname && nextProps.url.pathname.startsWith('/block/')) {
      this.getBlock(nextProps.url.pathname.split("/")[2], nextProps.url.pathname.split("/")[3] || 1);
    }
  }

  getBlock = (blockId, pageId = 1) => {
    const data = {
      blockId: blockId,
      pageId: pageId
    };
    this.props.getBlock(data);
  }

  render() {
    const { loading, data, pageNum, maxPageNum, error } = this.props;
    const content = (data) => {
      const { blockDetail, blockTx } = data;
      // 데이터가 없을 경우
      if (error !== "" && !loading) {
        return (
          <NotFound error={error}/>
        )
      } else {
        return (
          <div className="content-wrap">
    				<div className="screen0">
    					<BlockInformation
                blockDetail={blockDetail} />
    				</div>
    				<div className="screen1">
    					<BlockTransactions
                height={blockDetail.height}
                loading={loading}
                blockTx={blockTx}
                pageNum={pageNum}
                maxPageNum={maxPageNum} />
    				</div>
    			</div>
        )
      }
    }
    return (content(data));
  }
}

export default BlockDetailPage;

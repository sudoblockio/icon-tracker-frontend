import React, { Component } from 'react';
import { NotFound, BlockInformation, BlockTransactions } from '../../components/';
import { startsWith } from '../../utils/utils'

class BlockDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.allBlockInfo(this.props.url.pathname)
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.url.pathname
		const next = nextProps.url.pathname
		if (current !== next && startsWith(next, '/block')) {
			this.allBlockInfo(next)
		}
  }

  allBlockInfo = (pathname) => {
    const height = pathname.split("/")[2]
    console.log(height)
    this.props.blockInfo({ height })
    this.props.blockTxList({ height, page: 1, count: 10 })
  }

  getBlock = (blockId, pageId = 1) => {
    const data = {
      blockId: blockId,
      pageId: pageId
    };
    this.props.getBlock(data);
  }

  render() {
    const { blockDetail, blockTx } = this.props;
    const { loading, error } = blockDetail
    const content = () => {
      if (error !== "" && !loading) {
        return (
          <NotFound error={error}/>
        )
      } else {
        return (
          <div className="content-wrap">
    				<div className="screen0">
    					<BlockInformation
                blockDetail={blockDetail}
              />
    				</div>
    				<div className="screen1">
    					<BlockTransactions
                blockDetail={blockDetail}
                blockTx={blockTx}
              />
    				</div>
    			</div>
        )
      }
    }
    return content();
  }
}

export default BlockDetailPage;

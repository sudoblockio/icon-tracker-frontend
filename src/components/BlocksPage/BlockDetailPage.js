import React, { Component } from 'react';
import { 
  startsWith 
} from '../../utils/utils'
import {
  NotFound,
  BlockInfo,
  BlockTabs
} from '../../components/';

class BlockDetailPage extends Component {

  componentWillMount() {
    this.allDetailInfo(this.props.url.pathname)
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.url.pathname
		const next = nextProps.url.pathname
		if (current !== next && startsWith(next, '/block')) {
			this.allDetailInfo(next)
		}
  }

  allDetailInfo = (pathname) => {
    const height = pathname.split("/")[2]
    if (height) {
      this.props.blockInfo({ height })
      this.props.blockTxList({ height, page: 1, count: 10 })  
    }
  }

  render() {
    const { 
      block, 
      blockTx 
    } = this.props;
    
    const { 
      loading, 
      error 
    } = block
    
    const Content = () => {
      if (error !== "" && !loading) {
        return (
          <NotFound error={error}/>
        )
      } 
      else {
        return (
          <div className="content-wrap">
            <BlockInfo 
              block={block}
            />
            <BlockTabs 
              block={block}
              blockTx={blockTx}
              blockTxList={this.props.blockTxList}
            />
    			</div>
        )
      }
    }
    return Content();
  }
}

export default BlockDetailPage;

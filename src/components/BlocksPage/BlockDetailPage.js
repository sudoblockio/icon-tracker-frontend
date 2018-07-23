import React, { Component } from 'react';
import { 
  startsWith,
  findTabIndex
} from '../../utils/utils'
import {
  BLOCK_TABS
} from '../../utils/const'
import {
  NotFound,
  BlockInfo,
  BlockTabs
} from '../../components/';

class BlockDetailPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      initialTab: 0
    }
  }

  componentWillMount() {
    const { pathname, hash } = this.props.url
    this.allDetailInfo(pathname)
    this.setState({initialTab: findTabIndex(BLOCK_TABS, hash)})
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: current } = this.props.url
    const { pathname: next } = nextProps.url
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
    const { block } = this.props;
    const { loading, error } = block
    
    const Content = () => {
      if (error !== "" && !loading) {
        return (
          <NotFound error={error}/>
        )
      } 
      else {
        return (
          <div className="content-wrap">
            <BlockInfo block={block}/>
            <BlockTabs {...this.props} {...this.state}/>
    			</div>
        )
      }
    }
    return Content();
  }
}

export default BlockDetailPage;

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
    this.height = ''
    this.state = {
      on: 0
    }
  }

  componentWillMount() {
    const { pathname, hash } = this.props.url
    this.setState({ on: findTabIndex(BLOCK_TABS, hash) },
      () => {
        this.allDetailInfo(pathname)
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: current } = this.props.url
    const { pathname: next } = nextProps.url
    if (current !== next && startsWith(next, '/block')) {
      this.allDetailInfo(next)
    }
  }

  allDetailInfo = (pathname) => {
    this.height = pathname.split("/")[2]
    const { height } = this
    if (height) {
      this.props.blockInfo({ height })
      this.setTab(height, this.state.on)
    }
  }

  setTab = (index) => {
    const { height } = this
    this.setState({ on: index },
      () => {
        switch (index) {
          case 0:
            this.props.blockTxList({ height, page: 1, count: 10 })
            break
          default:
        }
      }
    )
  }

  render() {
    const { block } = this.props;
    const { loading, error } = block

    const Content = () => {
      if (error !== "" && !loading) {
        return (
          <NotFound error={error} />
        )
      }
      else {
        return (
          <div className="content-wrap">
            <BlockInfo block={block} />
            <BlockTabs {...this.props} {...this.state} setTab={this.setTab} />
          </div>
        )
      }
    }
    return Content();
  }
}

export default BlockDetailPage;

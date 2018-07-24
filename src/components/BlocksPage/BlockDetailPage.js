import React, { Component } from 'react';
import {
  startsWith,
  findTabIndex,
  noSpaceLowerCase
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
      on: 0
    }
  }

  componentWillMount() {
    this.allDetailInfo(this.props.url)
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: currentPath } = this.props.url
    const { pathname: nextPath } = nextProps.url
    if (currentPath !== nextPath && startsWith(nextPath, '/block')) {
      this.allDetailInfo(nextProps.url)
      return
    }

    const { hash: currentHash } = this.props.url
    const { hash: nextHash } = nextProps.url
    if (currentHash !== nextHash) {
      this.setTab(findTabIndex(BLOCK_TABS, nextHash))
    }
  }

  allDetailInfo = (url) => {
    const height = url.pathname.split("/")[2]
    if (height) {
      this.props.blockInfo({ height })
      this.setTab(findTabIndex(BLOCK_TABS, url.hash), height)
    }
  }

  setTab = (_index, _height) => {
    if (_index !== -1) {
      window.location.hash = noSpaceLowerCase(BLOCK_TABS[_index])
    }
    const index = _index !== -1 ? _index : 0
    this.setState({ on: index },
      () => {
        const height = _height ? _height : this.props.url.pathname.split("/")[2]
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

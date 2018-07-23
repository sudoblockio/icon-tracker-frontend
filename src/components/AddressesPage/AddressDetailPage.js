import React, { Component } from 'react';
import {
  startsWith,
  findTabIndex,
  noSpaceLowerCase
} from '../../utils/utils'
import {
  WALLET_TABS
} from '../../utils/const'
import {
  NotFound,
  WalletInfo,
  WalletTabs,
} from '../../components'

class AddressesDetailPage extends Component {

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
    if (currentPath !== nextPath && startsWith(nextPath, '/address')) {
      this.allDetailInfo(nextProps.url)
      return
    }

    const { hash: currentHash } = this.props.url
    const { hash: nextHash } = nextProps.url
    if (currentHash !== nextHash) {
      this.setTab(findTabIndex(WALLET_TABS, nextHash))
    }
  }

  allDetailInfo = (url) => {
    const address = url.pathname.split("/")[2]
    if (address) {
      this.props.addressInfo({ address })
      this.setTab(findTabIndex(WALLET_TABS, url.hash), address)
    }
  }

  setTab = (_index, _address) => {
    if (_index !== -1) {
      window.location.hash = noSpaceLowerCase(WALLET_TABS[_index])
    }
    const index = _index !== -1 ? _index : 0
    this.setState({ on: index },
      () => {
        const address = _address ? _address : this.props.url.pathname.split("/")[2]
        switch (index) {
          case 0:
            this.props.addressTxList({ address, page: 1, count: 10 })
            break
          case 1:
            this.props.addressTokenTxList({ address, page: 1, count: 10 })
            break
          default:
        }
      }
    )
  }

  render() {
    const { wallet } = this.props;
    const { loading, error } = wallet

    const Content = () => {
      if (!loading && error) {
        return <NotFound error={error} />
      }
      else {
        return (
          <div className="content-wrap">
            <WalletInfo wallet={wallet} setPopup={this.props.setPopup} />
            <WalletTabs {...this.props} {...this.state} setTab={this.setTab} />
          </div>
        )
      }
    }

    return Content();
  }
}

export default AddressesDetailPage;

import React, { Component } from 'react';
import {
  startsWith,
  findTabIndex
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
    this.address = ''
    this.state = {
      on: 0
    }
  }

  componentWillMount() {
    const { pathname, hash } = this.props.url
    this.setState({ on: findTabIndex(WALLET_TABS, hash) },
      () => {
        this.allDetailInfo(pathname)
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: current } = this.props.url
    const { pathname: next } = nextProps.url
    if (current !== next && startsWith(next, '/address')) {
      this.allDetailInfo(next)
    }
  }

  allDetailInfo = (pathname) => {
    this.address = pathname.split("/")[2]
    const { address } = this
    if (address) {
      this.props.addressInfo({ address })
      this.setTab(this.state.on)
    }
  }

  setTab = (index) => {
    const { address } = this
    this.setState({ on: index },
      () => {
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

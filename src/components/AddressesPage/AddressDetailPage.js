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
    this.state = {
      initialTab: 0
    }
  }

  componentWillMount() {
    const { pathname, hash } = this.props.url
    this.allDetailInfo(pathname)
    this.setState({initialTab: findTabIndex(WALLET_TABS, hash)})
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: current } = this.props.url
    const { pathname: next } = nextProps.url
    if (current !== next && startsWith(next, '/address')) {
      this.allDetailInfo(next)
    }
  }

  allDetailInfo = (pathname) => {
    const address = pathname.split("/")[2]
    if (address) {
      this.props.addressInfo({ address })
      this.props.addressTxList({ address, page: 1, count: 10 })
    }
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
            <WalletTabs {...this.props} {...this.state}/>
          </div>
        )
      }
    }

    return Content();
  }
}

export default AddressesDetailPage;

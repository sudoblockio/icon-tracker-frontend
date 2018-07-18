import React, { Component } from 'react';
import { 
  startsWith 
} from '../../utils/utils'
import {
  NotFound,
  WalletInfo,
  WalletTabs
} from '../../components'

class AddressesDetailPage extends Component {
  componentWillMount() {
    this.allAddressInfo(this.props.url.pathname)
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.url.pathname
    const next = nextProps.url.pathname
    if (current !== next && startsWith(next, '/address')) {
      this.allAddressInfo(next)
    }
  }

  allAddressInfo = (pathname) => {
    const address = pathname.split("/")[2]
    this.props.addressInfo({ address })
    this.props.addressTxList({ address, page: 1, count: 10 })
  }

  render() {
    const { 
      walletDetail, 
      walletTx, 
      walletTokenTx 
    } = this.props;

    const { 
      loading, 
      error 
    } = walletDetail
    
    const Content = () => {
      if (!loading && error) {
        return (
          <NotFound error={error} />
        )
      }
      else {
        return (
          <div className="content-wrap">
            <WalletInfo 
              walletDetail={walletDetail}
            />
            <WalletTabs 
              walletDetail={walletDetail}
              walletTx={walletTx}
              walletTokenTx={walletTokenTx}
              addressTxList={this.props.addressTxList}
              addressTokenTxList={this.props.addressTokenTxList}
            />
          </div>
        )
      }
    }

    return Content();
  }
}

export default AddressesDetailPage;

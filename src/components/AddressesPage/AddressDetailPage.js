import React, { Component } from 'react';
import { NotFound, WalletInformation, WalletTransactions } from '../../components'
import { startsWith } from '../../utils/utils'

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
    const { walletDetail, walletTx, walletTokenTx } = this.props;
    const { loading, error } = walletDetail
    const content = () => {
      if (error !== "" && !loading) {
        return (
          <NotFound error={error}/>
        )
      } 
      else {
        return (
          <div className="content-wrap">
            <div className="screen0">
              <WalletInformation 
                walletDetail={walletDetail}
              />
            </div>
            <div className="screen1">
              <WalletTransactions 
                walletDetail={walletDetail}
                walletTx={walletTx} 
                walletTokenTx={walletTokenTx}
                addressTxList={this.props.addressTxList}
                addressTokenTxList={this.props.addressTokenTxList}
              />
            </div>
          </div>
        )
      }
    }

    return content();
  }
}

export default AddressesDetailPage;

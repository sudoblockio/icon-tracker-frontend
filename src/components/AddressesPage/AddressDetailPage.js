import React, { Component } from 'react';
import { WalletInformation, WalletTransactions, NotFound } from '../../components'
import { startsWith } from '../../utils/utils'

class AddressesDetailPage extends Component {

  componentWillMount() {
    // this.getAddressDetail(this.props.url.pathname.split("/")[2], this.props.url.pathname.split("/")[3] || 1)
    this.props.setAddress(this.props.url.pathname.split("/")[2])
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url.pathname !== this.props.url.pathname && startsWith(nextProps.url.pathname, '/address/')) {
      // this.getAddressDetail(nextProps.url.pathname.split("/")[2], nextProps.url.pathname.split("/")[3] || 1);
      this.props.setAddress(this.props.url.pathname.split("/")[2])
    }
  }

  render() {
    const { loading, walletDetail, walletTx, tokenTx , error } = this.props;
    const content = () => {
      // 데이터가 없을 경우
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
                addressInfo={this.props.addressInfo}
              />
            </div>
            <div className="screen1">
              <WalletTransactions 
                walletDetail={walletDetail}
                walletTx={walletTx} 
                tokenTx={tokenTx}
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

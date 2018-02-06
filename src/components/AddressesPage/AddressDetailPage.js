import React, { Component } from 'react';
import { WalletInformation, WalletTransactions, NotFound } from '../../components'
import { startsWith } from '../../utils/utils'

class AddressesDetailPage extends Component {

  componentWillMount() {
    this.getAddressDetail(this.props.url.pathname.split("/")[2], this.props.url.pathname.split("/")[3] || 1)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url.pathname !== this.props.url.pathname && startsWith(nextProps.url.pathname, '/address/')) {
      this.getAddressDetail(nextProps.url.pathname.split("/")[2], nextProps.url.pathname.split("/")[3] || 1);
    }
  }

  getAddressDetail = (addressId, pageId = 1) => {
    const data = {
      addressId: addressId,
      pageId: pageId
    };
    this.props.getAddressDetail(data);
  }

  render() {
    const { loading, data, pageNum, maxPageNum, error } = this.props;
    const content = (data) => {
      // 데이터가 없을 경우
      if (error !== "" && !loading) {
        return (
          <NotFound error={error}/>
        )
      } else {
        const { walletDetail, walletTx } = data;
        return (
          <div className="content-wrap">
            <div className="screen0">
              <WalletInformation walletDetail={walletDetail}/>
            </div>
            <div className="screen1">
              <WalletTransactions walletAddress={walletDetail.address} walletTx={walletTx} pageNum={pageNum} maxPageNum={maxPageNum}/>
            </div>
          </div>
        )
      }
    }

    return (content(data));
  }
}

export default AddressesDetailPage;

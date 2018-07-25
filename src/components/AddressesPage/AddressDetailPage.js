import React, { Component } from 'react';
import {
  WALLET_TABS
} from '../../utils/const'
import {
  WalletInfo,
  WalletTabs,
  DetailPage
} from '../../components/';

class AddressesDetailPage extends Component {

  render() {
    const { wallet } = this.props;
    const { loading, error } = wallet

    return (
      <DetailPage
        {...this.props}
        loading={loading}
        error={error}
        TABS={WALLET_TABS}
        ROUTE="/address"
        getInfo={address => { this.props.addressInfo({ address }) }}
        getList={[
          address => {
            this.props.addressTxList({ address, page: 1, count: 10 })
          },
          address => {
            this.props.addressTokenTxList({ address, page: 1, count: 10 })
          },
        ]}
        InfoComponent={WalletInfo}
        TabsComponent={WalletTabs}
      />
    )
  }
}

export default AddressesDetailPage;

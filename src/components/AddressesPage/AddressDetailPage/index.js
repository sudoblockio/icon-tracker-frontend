import React, { Component } from 'react';
import AddressInfo from './AddressInfo'
import AddressTabs from './AddressTabs'
import {
    DetailPage
} from 'components';
import {
    WALLET_TABS
} from 'utils/const'

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
                InfoComponent={AddressInfo}
                TabsComponent={AddressTabs}
            />
        )
    }
}

export default AddressesDetailPage;

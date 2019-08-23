import React, { Component } from 'react';
import AddressInfo from './AddressInfo'
import AddressTabs from './AddressTabs'
import {
    DetailPage
} from 'components';
import {
    ADDRESS_TABS
} from 'utils/const'
import { getDelegation, getPRep } from '../../../redux/api/restV3/iiss';

class AddressesDetailPage extends Component {
    state = {
        hasDelegations: false,
        isPrep: false,
    }

    async componentWillReceiveProps(nextProps) {
        const { address: prev } = this.props.wallet.data
        const { address: next } = nextProps.wallet.data
        if (!prev && prev !== next) {
            const { delegations } = await getDelegation(next)
            const { name } = await getPRep(next)
            const hasDelegations = delegations.length > 0
            const isPrep = !!name
            this.setState({ hasDelegations, isPrep })
        }
    }
    
    render() {
        const { hasDelegations, isPrep } = this.state
        const { wallet } = this.props;
        const { loading, error, data } = wallet
        const { tokenList, internalTxCount } = data
        const TABS = [], getList = []
        TABS.push(ADDRESS_TABS[0])
        getList.push(address => {
            this.props.addressTxList({ address, page: 1, count: 10 })
        })
        
        if (internalTxCount && Number(internalTxCount) !== 0) {
            TABS.push(ADDRESS_TABS[1]) 
            getList.push(address => {
                this.props.addressInternalTxList({ address, page: 1, count: 10 })
            })
        }
        if (tokenList && tokenList.length !== 0) {
            TABS.push(ADDRESS_TABS[2])
            getList.push(address => {
                this.props.addressTokenTxList({ address, page: 1, count: 10 })
            })
        }
        if (hasDelegations) {
            TABS.push(ADDRESS_TABS[3])
            getList.push(address => {
                this.props.addressDelegationList({ address })
            })
        }
        if (isPrep) {
            TABS.push(ADDRESS_TABS[4])
            getList.push(address => {
                this.props.addressVotedList({ address })
            })
        }

        return (
            <DetailPage
                {...this.props}
                loading={loading}
                error={error}
                TABS={TABS}
                ROUTE="/address"
                getInfo={address => { this.props.addressInfo({ address }) }}
                getList={getList}
                InfoComponent={AddressInfo}
                TabsComponent={AddressTabs}
                hasDelegations={hasDelegations}
                isPrep={isPrep}
            />
        )
    }
}

export default AddressesDetailPage;

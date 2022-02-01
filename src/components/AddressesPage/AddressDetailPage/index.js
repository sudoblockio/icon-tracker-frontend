import React, { Component } from 'react';
import AddressInfo from './AddressInfo'
import AddressTabs from './AddressTabs'
import {
    DetailPage
} from '../../../components';
import {
    ADDRESS_TABS
} from '../../../utils/const'
import { addressInternalTxList , addressDelegationList, addressRewardList, addressVotedList, addressTokenTxList} from '../../../redux/store/addresses';
import {getBondList } from '../../../redux/store/iiss'
class AddressesDetailPage extends Component {
     constructor(props) {
         super(props)
         this.state = {
             internalTxns: ""
         }
     }
     checkTabs = async (address) => {
        let payload = {address: `${address}`, page:1, count:10}
        this.tokentransfers  =  await addressTokenTxList(payload)
        this.voted = await addressVotedList(address)
        this.rewards = await addressRewardList(payload)
        this.deleg = await addressDelegationList(payload)
        this.tokenTx = await addressTokenTxList(payload)
        this.intTx = await addressInternalTxList(payload)
        
    }

    async componentDidMount(){
        this.checkTabs(this.props.match.params.addressId)

    }

    render() {
        const { wallet, walletTokenTx, addressInternalTx } = this.props;
        const { loading, error, data } = wallet
        const deleg = this.deleg
        const { tokenList, /*internalTxCount,*/ is_prep, transaction_count, claimIScoreCount, hasDelegations, log_count } = data

        const TABS = [], getList = []   
        TABS.push(ADDRESS_TABS[0])
        getList.push(address => {
            this.props.addressTxList({ address, page: 1, count: 10 })
        })


        if (this.intTx? this.intTx.data.length : null) {
            TABS.push(ADDRESS_TABS[1]) 
            getList.push(address => {
                this.props.addressInternalTxList({ address, page: 1, count: 10 })
            })
        }
        if (this.tokentransfers? this.tokentransfers.data.length : null) {
            TABS.push(ADDRESS_TABS[2])
            getList.push(address => {
                this.props.addressTokenTxList({ address, page: 1, count: 10 })
                
            })
        }
        if (this.deleg? deleg.data.length : null) {
            TABS.push(ADDRESS_TABS[3])
            getList.push(address => {
                this.props.addressDelegationList({ address })
            })
        }
        if (this.voted? this.voted.data.length : null) {
            // TABS.push(ADDRESS_TABS[6])
            TABS.push(ADDRESS_TABS[4])
            getList.push(address => {
                this.props.addressVotedList({ address, page: 1, count: 10 })
            })
        }

        if (this.rewards? this.rewards.data.length : null) {
            TABS.push(ADDRESS_TABS[5])
            getList.push(address => {
                this.props.addressRewardList({ address })
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
                isPrep={is_prep}
                tokenList={payload => {this.props.addressTokenTxList({payload})}}
                balanceOf={payload => {this.props.getBalanceOf({payload})}}
                delegations={deleg}
                
            />
        )
    }
}

export default AddressesDetailPage;

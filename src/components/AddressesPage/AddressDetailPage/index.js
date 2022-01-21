import React, { Component } from 'react';
import AddressInfo from './AddressInfo'
import AddressTabs from './AddressTabs'
import {
    DetailPage
} from '../../../components';
import {
    ADDRESS_TABS
} from '../../../utils/const'

class AddressesDetailPage extends Component {
     constructor(props) {
         super(props)
         this.state = {
             internalTxns: ""
         }
     }
    
    async componentDidMount(){

        
    }
    render() {
        const { wallet } = this.props;
        const { loading, error, data } = wallet
        const { tokenList, /*internalTxCount,*/ is_prep, transaction_count, claimIScoreCount, hasDelegations, log_count } = data

        const TABS = [], getList = []

        TABS.push(ADDRESS_TABS[0])
        getList.push(address => {
            this.props.addressTxList({ address, page: 1, count: 10 })
        })
        console.log(log_count, "what is the log count")
        if (Number(log_count) !== 0) {
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
        if (is_prep) {
            TABS.push(ADDRESS_TABS[4])
            getList.push(address => {
                this.props.addressVotedList({ address, page: 1, count: 10 })
            })
        }
        if (data) {
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
                tokenList={address => {this.props.addressTokenTxList({address})}}
                balanceOf={payload => {this.props.getBalanceOf({payload})}}
            />
        )
    }
}

export default AddressesDetailPage;

import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AddressTransactions from './AddressTransactions'
import AddressInternalTransactions from './AddressInternalTransactions'
import AddressTokenTransfers from './AddressTokenTransfers'
import AddressDelegation from './AddressDelegation'
import AddressVoted from './AddressVoted'
import AddressReward from './AddressReward'
import AddressBonded from './AddressBonded'
import AddressBonders from './AddressBonders'
import {
    TX_TYPE,
    ADDRESS_TABS,
} from '../../../../utils/const'
import {
    NoBox,
    TabTable
} from '../../../../components'
import { addressTxList } from '../../../../redux/store/addresses';
import {addressRewardList, addressTokenTxList, addressVotedList, addressInternalTxList, } from '../../../../redux/store/addresses'
import {getBondList, getBonders, getDelegation} from '../../../../redux/store/iiss'

function WalletTabs(props){

    const [bondList, setBondList] = useState("")
    const [bonderList, setBonderList] = useState("")
    const [bondMap, setBondMap] = useState("")
    const [addrTx, setAddrTx ] = useState("")
    const [intTx, setIntTx] =  useState("")
    const [tokenTransfers, setTokenTransfers] = useState("")
    const [rewards, setRewards] = useState("")
    const [deleg, setDeleg] = useState("")
    const [tokenTx, setTokenTx] = useState("")
    const [voted, setVoted] = useState("")
    const [alist, setAList] = useState({})
    let bondObj={}
    const getEachBond = async (addr) => {
        let address = addr.address
        const bondAmount = await getBondList(addr)
        bondAmount[0]? bondObj[address]=Number(Number(bondAmount[0].value) / Math.pow(10,18)): bondObj[address]=bondAmount
        console.log(bondObj, "bond object")
        setBondMap(bondObj)
        
    }

    const checkTabs = async (address) => {
        let payload = {address: `${address}`, count:10, page:1}
        let txData = await addressTxList(payload)
        setAddrTx(txData)
        let bondData = await getBondList(payload)
        setBondList(bondData)
        let intTxData = await addressInternalTxList(payload)
        setIntTx(intTxData)
        let tokenTansfersData  =  await addressTokenTxList(payload)
        setTokenTransfers(tokenTansfersData)
        let rewardsData = await addressRewardList(payload)
        setRewards(rewardsData)
        let delegData = await getDelegation(payload)
        setDeleg(delegData)
        let tokenTxData = await addressTokenTxList(payload)
        setTokenTx(tokenTxData)
        let votedData = await addressVotedList(payload)
        setVoted(votedData)
        let bonderListData = await getBonders(payload)
        setBonderList(bonderListData)
        if(bonderListData.length){
        bonderListData.map(bonder =>{
            getEachBond({"address": bonder})
        })
    }
        
    }
    useEffect(() => {
        checkTabs(props.match.params.addressId)
    },[])
    const { on, wallet, addressInternalTx, walletTokenTx, addressDelegation, addressVoted, addressReward } = props
    const { loading, data } = wallet
    const { address} = data
    

    const TABS = []
    TABS.push(ADDRESS_TABS[0])
    if (intTx? intTx.data.length : null) {
        TABS.push(ADDRESS_TABS[1])
    }
    if (tokenTransfers? tokenTransfers.data.length : null) {
        TABS.push(ADDRESS_TABS[2])
    }
    if (deleg? deleg.delegations.length : null) {
        TABS.push(ADDRESS_TABS[3])
    }
    if (voted? voted.data.length : null) {
        TABS.push(ADDRESS_TABS[4])
    }
    if (rewards? rewards.data.length: null) {
        TABS.push(ADDRESS_TABS[5])
    }
     if (bondList ? bondList.length : null) {
         TABS.push(ADDRESS_TABS[6])
     }
     if (bonderList ? bonderList.length : null) {
        TABS.push(ADDRESS_TABS[7])
    }

    
        return (
            <TabTable
                {...props}
                TABS={TABS}
                on={on}
                loading={loading}
                TableContents={on => {
                    switch (TABS[on]) {
                        case ADDRESS_TABS[0]:
                            return (
                                <AddressTransactions
                                txData={addrTx}
                                goAllTx={() => { props.history.push(`/${TX_TYPE.ADDRESS_TX}/${address}`) }}
                                txType={TX_TYPE.ADDRESS_TX}
                                address={address}
                                total={addrTx.headers? addrTx.headers["x-total-count"]:0}
                                />
                                )
                        case ADDRESS_TABS[1]:
                            return (
                                <AddressInternalTransactions
                                    txData={addressInternalTx}
                                    goAllTx={() => { props.history.push(`/${TX_TYPE.ADDRESS_INTERNAL_TX}/${address}`) }}
                                    txType={TX_TYPE.ADDRESS_INTERNAL_TX}
                                    address={address}
                                />
                            )
                        case ADDRESS_TABS[2]:
                            return (
                                <AddressTokenTransfers
                                    txData={walletTokenTx}
                                    goAllTx={() => { props.history.push(`/${TX_TYPE.ADDRESS_TOKEN_TX}/${address}`) }}
                                    txType={TX_TYPE.ADDRESS_TOKEN_TX}
                                    address={address}
                                />
                            )
                        case ADDRESS_TABS[3]:
                            return (
                                <AddressDelegation
                                    txData={addressDelegation}
                                    goAllTx={() => { props.history.push(`/${TX_TYPE.ADDRESS_DELEGATIONS}/${address}`) }}
                                    txType={TX_TYPE.ADDRESS_DELEGATION}
                                    address={address}
                                />
                            )
                        case ADDRESS_TABS[4]:

                            return (
                                <AddressVoted
                                    txData={addressVoted}
                                    goAllTx={() => { props.history.push(`/${TX_TYPE.ADDRESS_VOTED}/${address}`) }}
                                    txType={TX_TYPE.ADDRESS_VOTED}
                                    address={address}
                                />
                            )
                        case ADDRESS_TABS[5]:
                            return (
                                <AddressReward
                                    txData={addressReward}
                                    goAllTx={() => { props.history.push(`/${TX_TYPE.ADDRESS_REWARD}/${address}`) }}
                                    txType={TX_TYPE.ADDRESS_REWARD}
                                    address={address}
                                />
                            )
                            case ADDRESS_TABS[6]:
                                return (
                                    <AddressBonded
                                        txData={bondList}
                                        goAllTx={() => { props.history.push(`/${TX_TYPE.ADDRESS_BONDED}/${address}`) }}
                                        txType={TX_TYPE.ADDRESS_BONDED}
                                        address={address}
                                    />
                                )
                                case ADDRESS_TABS[7]:
                                    return (
                                        <AddressBonders
                                            txData={bonderList}
                                            goAllTx={() => { props.history.push(`/${TX_TYPE.ADDRESS_BONDERS}/${address}`) }}
                                            txType={TX_TYPE.ADDRESS_BONDERS}
                                            address={address}
                                            bondMap={bondMap}
                                        />
                                    )
                        default:
                            return <NoBox text="No Data" />
                    }
                }}
            />
        )
    
}

export default withRouter(WalletTabs);

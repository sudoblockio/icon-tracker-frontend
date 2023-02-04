import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import AddressTransactions from "./AddressTransactions";
import AddressInternalTransactions from "./AddressInternalTransactions";
import AddressTokenTransfers from "./AddressTokenTransfers";
import AddressDelegation from "./AddressDelegation";
import AddressVoted from "./AddressVoted";
import AddressReward from "./AddressReward";
import AddressBonded from "./AddressBonded";
import AddressBonders from "./AddressBonders";
import { TX_TYPE, ADDRESS_TABS } from "../../../../utils/const";
import { NoBox, TabTable } from "../../../../components";
import { addressTxList } from "../../../../redux/store/addresses";
import {
  addressRewardList,
  addressTokenTxList,
  addressVotedList,
  addressInternalTxList,
} from "../../../../redux/store/addresses";
import { getBondList, getBonders, getDelegation } from "../../../../redux/store/iiss";

function AddressTabs(props) {
  const [bondList, setBondList] = useState("");
  const [bonderList, setBonderList] = useState("");
  const [bondMap, setBondMap] = useState("");
  const [addrTx, setAddrTx] = useState("");
  const [intTx, setIntTx] = useState("");
  const [tokenTransfers, setTokenTransfers] = useState("");
  const [rewards, setRewards] = useState("");
  const [deleg, setDeleg] = useState("");
  const [tokenTx, setTokenTx] = useState("");
  const [voted, setVoted] = useState("");
  const [alist, setAList] = useState({});

  const [tabs, setTabs] = useState([]);

  const { on, wallet, addressInternalTx, walletTokenTx, addressDelegation, addressVoted, addressReward } = props;
  const { loading, data } = wallet;
  const { address } = data;

  let bondObj = {};
  const getEachBond = async (addr) => {
    try {
      let address = addr.address;
      const bondAmount = await getBondList(addr);
      const addressId = props.match.params.addressId;

      const foundBond = bondAmount.find((f) => f.address === addressId);
      if (foundBond) {
        bondObj[address] = Number(Number(foundBond.value) / Math.pow(10, 18));
      } else {
        bondObj[address] = null;
      }
      setBondMap(bondObj);
    } catch (err) {
      console.log(err);
    }
  };

  // const checkTabs = async (address) => {
  //     let txData = await addressTxList(payload)
  //     setAddrTx(txData)
  //     let bondData = await getBondList(payload)
  //     setBondList(bondData)
  //     let intTxData = await addressInternalTxList(payload)
  //     setIntTx(intTxData)
  //     let tokenTansfersData  =  await addressTokenTxList(payload)
  //     setTokenTransfers(tokenTansfersData)
  //     let rewardsData = await addressRewardList(payload)
  //     setRewards(rewardsData)
  //     let delegData = await getDelegation(payload)
  //     setDeleg(delegData)
  //     let tokenTxData = await addressTokenTxList(payload)
  //     setTokenTx(tokenTxData)
  //     let votedData = await addressVotedList(payload)
  //     setVoted(votedData)
  //     let bonderListData = await getBonders(payload)
  //     setBonderList(bonderListData)
  //     if(bonderListData.length){
  //         bonderListData.map(bonder =>{
  //             getEachBond({"address": bonder})
  //         })
  //     }
  // }

  const addressId = props.match.params.addressId;
  const payload = { address: `${addressId}`, count: 10, page: 1 };

  async function listAddressTx() {
    try {
      let txData = await addressTxList(payload);
      setAddrTx(txData);
    } catch (err) {
      console.log(err);
    }
  }

  async function listBond() {
    try {
      let bondData = await getBondList(payload);
      setBondList(bondData);
    } catch (err) {
      console.log(err);
    }
  }

  async function listTxData() {
    try {
      let intTxData = await addressInternalTxList(payload);
      setIntTx(intTxData);
    } catch (err) {
      console.log(err);
    }
  }

  async function listAddrTokenTx() {
    try {
      let tokenTansfersData = await addressTokenTxList(payload);
      setTokenTransfers(tokenTansfersData);
    } catch (err) {
      console.log(err);
    }
  }

  async function listRewardsData() {
    try {
      let rewardsData = await addressRewardList(payload);
      setRewards(rewardsData);
    } catch (err) {
      console.log(err);
    }
  }

  async function listDelegData() {
    try {
      let delegData = await getDelegation(payload);
      setDeleg(delegData);
    } catch (err) {
      console.log(err);
    }
  }

  async function listAddressTokenTx() {
    try {
      let tokenTxData = await addressTokenTxList(payload);
      setTokenTx(tokenTxData);
    } catch (err) {
      console.log(err);
    }
  }

  async function listAddressVoted() {
    try {
      let votedData = await addressVotedList(payload);
      setVoted(votedData);
    } catch (err) {
      console.log(err);
    }
  }

  async function listBonders() {
    try {
      let bonderListData = await getBonders(payload);
      setBonderList(bonderListData);
      if (bonderListData.length) {
        bonderListData.map((bonder) => {
          getEachBond({ address: bonder });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  function handleClickTab(index) {
    setActiveTabIndex(index);
  }

  useEffect(() => {
    const TABS = [];
    TABS.push(ADDRESS_TABS[0]);
    if (intTx ? intTx.data.length : null) {
      TABS.push(ADDRESS_TABS[1]);
    }
    if (tokenTransfers ? tokenTransfers.data.length : null) {
      TABS.push(ADDRESS_TABS[2]);
    }
    if (deleg ? deleg.delegations.length : null) {
      TABS.push(ADDRESS_TABS[3]);
    }
    if (voted ? voted.data.length : null) {
      TABS.push(ADDRESS_TABS[4]);
    }
    if (rewards ? rewards.data.length : null) {
      TABS.push(ADDRESS_TABS[5]);
    }
    if (bondList ? bondList.length : null) {
      TABS.push(ADDRESS_TABS[6]);
    }
    if (bonderList ? bonderList.length : null) {
      TABS.push(ADDRESS_TABS[7]);
    }
    setTabs(TABS);
  }, [intTx, tokenTransfers, deleg, voted, rewards, bondList, bonderList]);

  useEffect(() => {
    listAddressTx();
    listBond();
    listTxData();
    listAddrTokenTx();
    listRewardsData();
    listDelegData();
    listAddressTokenTx();
    listAddressVoted();
    listBonders();
  }, [props.match.params.addressId]);

  return (
    <TabTable
      {...props}
      onClickTab={handleClickTab}
      TABS={tabs}
      on={activeTabIndex}
      loading={false}
      TableContents={(on) => {
        switch (tabs[on]) {
          case ADDRESS_TABS[0]:
            return (
              <AddressTransactions
                txData={addrTx}
                goAllTx={() => {
                  props.history.push(`/${TX_TYPE.ADDRESS_TX}/${address}`);
                }}
                txType={TX_TYPE.ADDRESS_TX}
                address={address}
                total={addrTx.headers ? addrTx.headers["x-total-count"] : 0}
              />
            );
          case ADDRESS_TABS[1]:
            return (
              <AddressInternalTransactions
                txData={intTx}
                goAllTx={() => {
                  props.history.push(`/${TX_TYPE.ADDRESS_INTERNAL_TX}/${address}`);
                }}
                txType={TX_TYPE.ADDRESS_INTERNAL_TX}
                address={address}
              />
            );
          case ADDRESS_TABS[2]:
            return (
              <AddressTokenTransfers
                txData={tokenTransfers}
                goAllTx={() => {
                  props.history.push(`/${TX_TYPE.ADDRESS_TOKEN_TX}/${address}`);
                }}
                txType={TX_TYPE.ADDRESS_TOKEN_TX}
                address={address}
              />
            );
          case ADDRESS_TABS[3]:
            return (
              <AddressDelegation
                txData={addressDelegation}
                goAllTx={() => {
                  props.history.push(`/${TX_TYPE.ADDRESS_DELEGATIONS}/${address}`);
                }}
                txType={TX_TYPE.ADDRESS_DELEGATION}
                address={address}
              />
            );
          case ADDRESS_TABS[4]:
            return (
              <AddressVoted
                txData={voted}
                goAllTx={() => {
                  props.history.push(`/${TX_TYPE.ADDRESS_VOTED}/${address}`);
                }}
                txType={TX_TYPE.ADDRESS_VOTED}
                address={address}
              />
            );
          case ADDRESS_TABS[5]:
            return (
              <AddressReward
                txData={rewards}
                goAllTx={() => {
                  props.history.push(`/${TX_TYPE.ADDRESS_REWARD}/${address}`);
                }}
                txType={TX_TYPE.ADDRESS_REWARD}
                address={address}
              />
            );
          case ADDRESS_TABS[6]:
            return (
              <AddressBonded
                txData={bondList}
                goAllTx={() => {
                  props.history.push(`/${TX_TYPE.ADDRESS_BONDED}/${address}`);
                }}
                txType={TX_TYPE.ADDRESS_BONDED}
                address={address}
              />
            );
          case ADDRESS_TABS[7]:
            return (
              <AddressBonders
                txData={bonderList}
                goAllTx={() => {
                  props.history.push(`/${TX_TYPE.ADDRESS_BONDERS}/${address}`);
                }}
                txType={TX_TYPE.ADDRESS_BONDERS}
                address={address}
                bondMap={bondMap}
              />
            );
          default:
            return <NoBox text="No Data" />;
        }
      }}
    />
  );
}

export default withRouter(AddressTabs);

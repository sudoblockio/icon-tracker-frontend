import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import {
    numberWithCommas,
    convertNumberToText,
    convertLoopToIcxDecimal,
    sortArrOfObjects,
} from '../../utils/utils'

import { getBalanceOf, getBalance, getStake, getBondList, getDelegation } from '../../redux/store/iiss'
import { contractDetail } from '../../redux/store/contracts'
import { addressTokens } from '../../redux/store/addresses'
import { IconConverter, } from 'icon-sdk-js'

import ClipLoader from 'react-spinners/ClipLoader'

function AddrContractsBal(props) {
    const { iscore, match } = props

    const urlId = match.params.addressId ? match.params.addressId : match.params.contractId

    const [deleg, setDeleg] = useState(null)

    const [isTokenBalLoading, setIsTokenBalLoading] = useState(true)

    const [contractDetailResMap, setContractDetailResMap] = useState({})
    const [getBalOfMap, setGetBalOfMap] = useState({})
    const [addressTokensRes, setAddressTokensRes] = useState(null)

    const [addrBond, setAddrBond] = useState('')
    const [addrBalance, setAddrBalance] = useState('')
    const [stakeAmt, setStake] = useState('')
    const [unstakeList, setUnstakeList] = useState('')
    const [unstakeSum, setUnstakeSum] = useState(0)

    const [tokens, setTokens] = useState([])

    /************************************************** */

    const [tokenMore, setTokenMore] = useState(false)
    const toggleTokenMore = () => {
        setTokenMore(!tokenMore)
    }

    const [icxMore, setIcxMore] = useState(false)
    const toggleIcxMore = () => {
        setIcxMore(!icxMore)
    }

    /************************************************** */

    const getAddrBond = async (addr) => {
        let payload = { address: `${addr}`, page: 1, count: 10 }

        const res = await getBondList(payload)
        if (res.length != 0) {
            setAddrBond(Number(res[0].value) / Math.pow(10, 18))
        }
    }

    const getAddrBalance = async () => {
        const balanceData = await getBalance(urlId)
        setAddrBalance(balanceData)
    }

    const getAddrStake = async (addr) => {
        const res = await getStake(addr)
        setStake(res.stake)
        setUnstakeList(res.unstakes)
    }

    /*******************************************************  */

    async function fetchAddressTokens() {
        let tokenRes = addressTokensRes || (await addressTokens(urlId));
        if (!addressTokensRes) {
            setAddressTokensRes(tokenRes);
        }

        if (tokenRes.status !== 204) {
            const tokenData = tokenRes.data || [];
            const tokenPromises = tokenData.map(async (contract) => {
                const [contractDetails, balanceDetails] = await Promise.all([
                    contractDetailResMap[contract]
                        ? Promise.resolve(contractDetailResMap[contract])
                        : contractDetail(contract).then((res) => {
                            if (res?.data) setContractDetailResMap((prev) => ({ ...prev, [contract]: res }));
                            return res;
                        }),
                    getBalOfMap[contract]
                        ? Promise.resolve(getBalOfMap[contract])
                        : getBalanceOf(urlId, contract).then((res) => {
                            setGetBalOfMap((prev) => ({ ...prev, [contract]: res }));
                            return res;
                        })
                ]);

                // Skip invalid contracts
                if (!contractDetails?.data) return null;
                if (!contractDetails?.data.name) return null;

                return {
                    ...contractDetails.data,
                    balance: balanceDetails,
                    nameLower: contractDetails.data.name.toLowerCase()
                };
            });

            const tokenResults = (await Promise.all(tokenPromises)).filter(Boolean); // Filter out null values
            const sortedTokenArray = sortArrOfObjects(
                [...tokenResults],
                'nameLower',
                'asc'
            );

            setTokens(sortedTokenArray);
        }
    }

    async function getDelegationData() {
        const payload = { address: `${urlId}`, count: 10, page: 1 }
        try {
            let delegData = await getDelegation(payload)
            const delegationSum = delegData.delegations.reduce((sum, item) =>
                sum + Number(item.value), 0) / Math.pow(10, 18);
            setDeleg(delegationSum)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAddressTokens()
        getAddrBalance()
        getAddrStake(urlId)
        getAddrBond(urlId)
        getDelegationData();
    }, [])

    useEffect(() => {
        if (!addressTokensRes || !tokens) return

        if (tokens.length >= addressTokensRes.data.length - 1) setIsTokenBalLoading(false)
    }, [tokens, addressTokensRes])

    useEffect(() => {
        let sum = 0
        if (unstakeList && unstakeList.length !== 0) {
            unstakeList.map((list) => {
                sum += Number(convertLoopToIcxDecimal(list.unstake))
            })
        }

        setUnstakeSum(sum)
    }, [unstakeList])



    const totalBal =
        Number(addrBond / Math.pow(10, 18)) +
        Number(addrBalance / Math.pow(10, 18)) +
        Number(stakeAmt / Math.pow(10, 18)) +
        Number(unstakeSum)

    return (
        <tr>
            <td>Balance</td>
            <td colSpan="3" className="balance">
                <div className={icxMore ? 'on' : ''}>
                    <p>
                        <span>
                            <i className="coin icon"></i>ICX
                        </span>
                        <span>
                            {`${totalBal ? numberWithCommas(totalBal) : 0}`}
                            <em>ICX</em>
                        </span>
                        <em className="drop-btn" onClick={toggleIcxMore}>
                            <i className="img"></i>
                        </em>
                    </p>
                    <p>
                        <span>Available</span>
                        <span>
                            {`${numberWithCommas(Number(addrBalance) / Math.pow(10, 18))}`}
                            <em>ICX</em>
                        </span>
                    </p>
                    <p>
                        <span>Staked</span>
                        <span>
                            {`${convertNumberToText(stakeAmt / Math.pow(10, 18))}`}
                            <em>ICX</em>
                        </span>
                    </p>

                    <p>
                        <span>Unstaking</span>
                        <span>
                            {`${convertNumberToText(unstakeSum)}`}
                            <em>ICX</em>
                        </span>
                    </p>
                    <div className="unstaking-list">
                        {unstakeList && unstakeList.length !== 0
                            ? unstakeList.map((dataList) => {
                                return (
                                    <p>
                                        <span className="unstaking-item">
                                            <em>
                                                Target Block Height{' '}
                                                {convertNumberToText(
                                                    IconConverter.toNumber(
                                                        dataList.unstakeBlockHeight
                                                    )
                                                )}
                                            </em>
                                            <span className="balance">
                                                {convertNumberToText(
                                                    convertLoopToIcxDecimal(dataList.unstake)
                                                )}
                                                <em>ICX</em>
                                            </span>

                                        </span>
                                    </p>
                                )
                            })
                            : ''}
                    </div>
                    <p>
                        <span>Bonded</span>
                        <span>
                            {addrBond ? addrBond : <span>&nbsp;</span>}
                            <em>ICX</em>
                        </span>
                    </p>



                    <p>
                        <span>Voted</span>
                        <span>
                            {`${convertNumberToText(deleg)}`}
                            <em>ICX</em>
                        </span>
                    </p>
                    <p>
                        <span>I_SCORE</span>
                        <span>
                            {`${convertNumberToText(iscore)}`}
                            <em>I-Score</em>
                        </span>
                    </p>
                </div>

                <div className={tokenMore ? 'on' : ''}>
                    <p>
                        <span>
                            <i className="coin"></i>Token
                        </span>
                        <span>
                            <span style={{ position: 'relative' }}>
                                {isTokenBalLoading && (
                                    <span style={{ position: 'absolute', left: '-15px' }}>
                                        <ClipLoader color="grey" size={12} />
                                    </span>
                                )}

                                {tokens.length}
                            </span>

                            <em>Tokens</em>
                        </span>
                        <em className="drop-btn" onClick={toggleTokenMore}>
                            <i className="img"></i>
                        </em>
                    </p>

                    {tokens.map((token, index) => (
                        <p key={index}>
                            <em
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    props.history.push(`/token/${token.address}`)
                                }}>
                                <span style={{ color: '#1aaaba' }}>{token.name}</span>
                            </em>
                            <span>{`${convertNumberToText(
                                Number(token.balance) / Math.pow(10, Number(token.decimals))
                            )}`}</span>
                        </p>
                    ))}
                </div>
            </td>
        </tr>
    )
}

export default withRouter(AddrContractsBal)

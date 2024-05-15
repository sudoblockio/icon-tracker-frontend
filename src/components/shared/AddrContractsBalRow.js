import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import {
    numberWithCommas,
    convertNumberToText,
    convertLoopToIcxDecimal,
    sortArrOfObjects,
} from '../../utils/utils'

import { getBalanceOf, getBalance, getStake, getBondList } from '../../redux/store/iiss'
import { contractDetail } from '../../redux/store/contracts'
import { addressTokens } from '../../redux/store/addresses'
import { IconConverter, IconAmount } from 'icon-sdk-js'

import ClipLoader from 'react-spinners/ClipLoader'

function AddContractsBal(props) {
    const { delegated, iscore, match } = props

    const urlId = match.params.addressId ? match.params.addressId : match.params.contractId

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

    const setTokenBal = async (tokenContract, { index, tokenCount }) => {
        let res = {}
        if (contractDetailResMap[tokenContract]) {
            res = contractDetailResMap[tokenContract]
        } else {
            res = await contractDetail(tokenContract)
            setContractDetailResMap(res)
            if (!res.data) return
        }

        let getBalRes = {}
        if (getBalOfMap[tokenContract]) {
            getBalRes = getBalOfMap[tokenContract]
        } else {
            getBalRes = await getBalanceOf(urlId, tokenContract)
            setGetBalOfMap((prev) => ({ ...prev, [tokenContract]: getBalRes }))
        }

        setTokens((prev) => {
            const oldTokensWithLowerCaseName = [...prev].map((token) => ({
                ...token,
                nameLower: token.name.toLowerCase(),
            }))
            const sortedTokenArray = sortArrOfObjects(
                [
                    ...oldTokensWithLowerCaseName,
                    { ...res.data, balance: getBalRes, nameLower: res.data.name.toLowerCase() },
                ],
                'nameLower',
                'asc'
            )

            return sortedTokenArray
        })
    }

    async function fetchAddressTokens() {
        let tokenRes = {}
        if (addressTokensRes) {
            tokenRes = addressTokensRes
        } else {
            tokenRes = await addressTokens(urlId)
            setAddressTokensRes(tokenRes)
        }

        if (tokenRes.status !== 204)
            tokenRes?.data?.forEach((contract, index) => {
                setTokenBal(contract, { index, tokenCount: tokenRes.data.length })
            })
    }

    /************************************************** */

    useEffect(() => {
        fetchAddressTokens()

        getAddrBalance()
        getAddrStake(urlId)
        getAddrBond(urlId)
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
        Number(unstakeSum / Math.pow(10, 18))

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
                    <p>
                        <span>Bonded</span>
                        <span>
                            {addrBond ? addrBond : <span>&nbsp;</span>}
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
                                            </span>
                                            <em>ICX</em>
                                        </span>
                                    </p>
                                )
                            })
                            : ''}
                    </div>

                    <p>
                        <span>Voted</span>
                        <span>
                            {`${convertNumberToText(delegated)}`}
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

export default withRouter(AddContractsBal)

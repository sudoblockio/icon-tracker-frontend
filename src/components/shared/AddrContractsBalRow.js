import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { IconConverter, IconAmount } from 'icon-sdk-js'

import { LoadingComponent } from '../../components'

import {
  numberWithCommas,
  convertNumberToText,
  convertLoopToIcxDecimal,
  sortArrOfObjects,
} from '../../utils/utils'

import {
  prepList,
  getPRepsRPC,
  getBalanceOf,
  getBalance,
  getStake,
  getBondList,
  getPRep,
} from '../../redux/store/iiss'
import { contractDetail } from '../../redux/store/contracts'
import { addressTokens } from '../../redux/store/addresses'
import { getRevision } from '../../redux/store/iiss'

function AddContractsBal(props) {
  const [icxMore, setIcxMore] = useState(false)
  const [tokenMore, setTokenMore] = useState(false)

  const [links, setLinks] = useState('')
  const [totalVoted, setTotalVoted] = useState('')

  const [addrBalance, setAddrBalance] = useState('')
  const [stakeAmt, setStake] = useState('')
  const [unstakeList, setUnstakeList] = useState('')
  const [addrBond, setAddrBond] = useState('')

  const [tokens, setTokens] = useState([])

  const [commissionRate, setCommissionRate] = useState(null)
  const [maxCommissionChangeRate, setMaxCommissionChangeRate] = useState(null)
  const [maxCommissionRate, setMaxCommissionRate] = useState(null)
  const [chainCanJail, setChainCanJail] = useState(false)

  const { wallet } = props
  console.log({ wallet })
  const { loading, data } = wallet

  const { prep, iscore } = data
  const { delegated } = prep || {}

  const id = props.match.params.addressId
    ? props.match.params.addressId
    : props.match.params.contractId

  let media = [
    'twitter',
    'wechat',
    'youtube',
    'telegram',
    'steemit',
    'reddit',
    'keybase',
    'github',
    'facebook',
  ]
  let checkLinks = {
    twitter: '',
    wechat: '',
    youtube: '',
    telegram: '',
    steemit: '',
    reddit: '',
    keybase: '',
    github: '',
    facebook: '',
  }
  let tokenName = {}
  let tokenMap = {}

  const getAddrStake = async (addr) => {
    const res = await getStake(addr)
    setStake(res.stake)
    setUnstakeList(res.unstakes)
  }
  let unstakeSum = 0
  if (unstakeList && unstakeList.length !== 0) {
    unstakeList.map((list) => {
      unstakeSum += Number(convertLoopToIcxDecimal(list.unstake))
    })
  }
  const getContractName = async (tokenContract) => {
    const res = await contractDetail(tokenContract)
    if (!res.data) return

    tokenName[res.data.name] = await getBalanceOf(id, tokenContract)
    tokenMap = Object.entries(tokenName)

    const balance = await getBalanceOf(id, tokenContract)

    setTokens((prev) => {
      const oldTokensWithLowerCaseName = [...prev].map((token) => ({
        ...token,
        nameLower: token.name.toLowerCase(),
      }))
      const sortedTokenArray = sortArrOfObjects(
        [
          ...oldTokensWithLowerCaseName,
          { ...res.data, balance, nameLower: res.data.name.toLowerCase() },
        ],
        'nameLower',
        'asc'
      )

      return sortedTokenArray
    })
  }

  const getPrepSocialMedia = async (address) => {
    const allPreps = await prepList()
    const prepArray = allPreps.filter((preps) => preps.address === address)
    const thisPrep = prepArray ? prepArray[0] : prepArray
    media.map((site) => {
      if (checkLinks && thisPrep) {
        checkLinks[site] !== thisPrep[site]
          ? (checkLinks[site] = thisPrep[site])
          : console.log('no links')
      }
    })
    setLinks(checkLinks)
  }
  const getVoted = async () => {
    const { totalDelegated: totalVotedLoop } = await getPRepsRPC()
    const totalVoted = !totalVotedLoop
      ? 0
      : IconConverter.toNumber(
          IconAmount.of(totalVotedLoop || 0x0, IconAmount.Unit.LOOP)
            .convertUnit(IconAmount.Unit.ICX)
            .value.toString(10)
        )
    setTotalVoted(totalVoted)
    let tokenRes = await addressTokens(id)
    tokenRes.status !== 204
      ? tokenRes.data.forEach((contract) => getContractName(contract))
      : console.log('no tokens')
  }

  const getTokens = async () => {
    let tokenRes = await addressTokens(id)

    tokenRes.status === 200
      ? tokenRes.data.forEach((contract) => {
          contractDetail(contract).then((contractRes) => {
            getBalanceOf(id, contract).then((balance) => {
              console.log('Res-Token-Res', id, balance)
              tokenMap[`${contractRes.data.name}`] = balance
            })
          })
        })
      : console.log('no tokens')
  }

  const getAddrBalance = async () => {
    const balanceData = await getBalance(id)
    setAddrBalance(balanceData)
  }

  const getAddrBond = async (addr) => {
    let payload = { address: `${addr}`, page: 1, count: 10 }
    const res = await getBondList(payload)
    if (res.length != 0) {
      setAddrBond(Number(res[0].value) / Math.pow(10, 18))
    }
  }

  const toggleIcxMore = () => {
    setIcxMore(!icxMore)
  }

  const toggleTokenMore = () => {
    setTokenMore(!tokenMore)
  }

  async function getRev() {
    const rev = await getRevision()
    // if chain revision is higher than rev 25 then
    // unjail functionality is available
    setChainCanJail(parseInt(rev, 16) >= 25)
  }

  useEffect(() => {
    getContractName()
    getTokens()
    getVoted()
    getPrepSocialMedia(id)
    getAddrStake(id)
    getAddrBond(id)
    getAddrBalance()
    getRev()
    // Fetch additional P-Rep information including commission-related data
    const fetchPrepInfo = async () => {
      try {
        const prepInfo = await getPRep(id)
        if (prepInfo) {
          setCommissionRate(prepInfo.commissionRate)
          setMaxCommissionChangeRate(prepInfo.maxCommissionChangeRate)
          setMaxCommissionRate(prepInfo.maxCommissionRate)
        }
      } catch (error) {
        console.error('Error fetching P-Rep information', error)
      }
    }

    fetchPrepInfo()
  }, [id])

  const totalBal =
    Number(addrBond / Math.pow(10, 18)) +
    Number(addrBalance / Math.pow(10, 18)) +
    Number(stakeAmt / Math.pow(10, 18)) +
    Number(unstakeSum / Math.pow(10, 18))

  const Content = () => {
    if (loading) {
      return <LoadingComponent height="206px" />
    } else {
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
              {/* <div className="unstaking-list">
                {unstakeList && unstakeList.length !== 0
                  ? unstakeList.map((dataList) => {
                      return (
                        <p>
                          <span className="unstaking-item">
                            <em>
                              Target Block Height{' '}
                              {convertNumberToText(
                                IconConverter.toNumber(dataList.unstakeBlockHeight)
                              )}
                            </em>
                            <span className="balance">
                              {convertNumberToText(convertLoopToIcxDecimal(dataList.unstake))}
                            </span>
                            <em>ICX</em>
                          </span>
                        </p>
                      )
                    })
                  : ''}
              </div> */}
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
                  {tokens.length}
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
  }
  return Content()
}

export default withRouter(AddContractsBal)

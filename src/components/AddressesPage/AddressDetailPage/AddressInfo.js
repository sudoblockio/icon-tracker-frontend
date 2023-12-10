import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { IconConverter, IconAmount } from 'icon-sdk-js'

import { CopyButton, QrCodeButton, LoadingComponent, ReportButton } from '../../../components'
import PrepUpdateModal from '../../../components/PrepUpdateModal/prepUpdateModal'
import {
    numberWithCommas,
    convertNumberToText,
    isValidNodeType,
    convertLoopToIcxDecimal,
    getBadgeTitle,
    isUrl,
    addAt,
    addUnregisteredStyle,
    sortArrOfObjects,
} from '../../../utils/utils'
import { SocialMediaType } from '../../../utils/const'
import NotificationManager from '../../../utils/NotificationManager'
import {
    prepList,
    getPRepsRPC,
    getBalanceOf,
    getBalance,
    getStake,
    getBondList,
} from '../../../redux/store/iiss'
import { contractDetail } from '../../../redux/store/contracts'
import { addressTokens } from '../../../redux/store/addresses'

import compStyles from './AddressInfo.module.css'

const _isNotificationAvailable = NotificationManager.available()

function AddressInfo(props) {
    const [icxMore, setIcxMore] = useState(false)
    const [tokenMore, setTokenMore] = useState(false)
    const [showNode, setShowNode] = useState('none')
    const [links, setLinks] = useState('')
    const [totalVoted, setTotalVoted] = useState('')

    const [addrBalance, setAddrBalance] = useState('')
    const [stakeAmt, setStake] = useState('')
    const [unstakeList, setUnstakeList] = useState('')
    const [addrBond, setAddrBond] = useState('')

    const [tokens, setTokens] = useState([])
    const [isPrepModalOpen, setIsPrepModalOpen] = useState(false)

    const { wallet, walletAddress } = props
    const { loading, data, error } = wallet

    const { prep, iscore } = data
    const {
        delegated,
        grade,
        last_updated_block,
        name,
        node_address,
        status,
        node_state,
        total_blocks,
        validated_blocks,
        website,
    } = prep || {}

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

    function togglePrepModal() {
        setIsPrepModalOpen(!isPrepModalOpen)
    }

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

        tokenName[res.data.name] = await getBalanceOf(props.match.params.addressId, tokenContract)
        tokenMap = Object.entries(tokenName)

        const balance = await getBalanceOf(props.match.params.addressId, tokenContract)

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
        let tokenRes = await addressTokens(props.match.params.addressId)
        tokenRes.status !== 204
            ? tokenRes.data.forEach((contract) => getContractName(contract))
            : console.log('no tokens')
    }

    const getTokens = async () => {
        let tokenRes = await addressTokens(props.match.params.addressId)

        tokenRes.status === 200
            ? tokenRes.data.forEach((contract) => {
                  contractDetail(contract).then((contractRes) => {
                      getBalanceOf(props.match.params.addressId, contract).then((balance) => {
                          console.log('Res-Token-Res', props.match.params.addressId, balance)
                          tokenMap[`${contractRes.data.name}`] = balance
                      })
                  })
              })
            : console.log('no tokens')
    }

    const getAddrBalance = async () => {
        const balanceData = await getBalance(props.match.params.addressId)
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

    const goBlock = (height) => {
        window.open('/block/' + height, '_blank')
    }

    const onSocialClick = async (link) => {
        if (isUrl(link)) {
            window.open(link, '_blank')
        }
    }
    const clickShowBtn = () => {
        setShowNode('table-row')
    }

    function enableUpdateButton() {
        //
    }

    useEffect(() => {
        getContractName()
        getTokens()
        getVoted()
        getPrepSocialMedia(props.match.params.addressId)
        getAddrStake(props.match.params.addressId)
        getAddrBond(props.match.params.addressId)
        getAddrBalance()
    }, [props.match.params.addressId])

    const totalBal =
        Number(addrBond / Math.pow(10, 18)) +
        Number(addrBalance / Math.pow(10, 18)) +
        Number(stakeAmt / Math.pow(10, 18)) +
        Number(unstakeSum / Math.pow(10, 18))

    const produced = IconConverter.toNumber(total_blocks)
    const validated = IconConverter.toNumber(validated_blocks)
    const productivity = !produced ? 'None' : `${((validated / produced) * 100).toFixed(2)}%`
    const _lastGenerateBlockHeight = !last_updated_block
        ? 'None'
        : IconConverter.toNumber(last_updated_block)
    // const tokenCxs = tokens ? tokens : [];
    const badge = getBadgeTitle(grade, node_state)

    const Content = () => {
        if (loading) {
            return <LoadingComponent height="206px" />
        } else {
            const { address, nodeType, reportedCount, is_prep } = data
            const _address = address ? address : error
            const isConnected = walletAddress === _address
            const disabled = !_isNotificationAvailable
            const scam = reportedCount >= 100 ? true : false

            let totalVotes
            !Number(delegated)
                ? (totalVotes = 0)
                : (totalVotes = Number(Number(delegated) / Number(totalVoted)))

            return (
                <div className="screen0">
                    <PrepUpdateModal
                        prepInfo={data.prep}
                        isOpen={isPrepModalOpen}
                        onClose={togglePrepModal}
                    />
                    <div className="wrap-holder">
                        {isConnected ? (
                            <p className="title">
                                My Address
                                {is_prep && (
                                    <span
                                        className={
                                            'title-tag' + addUnregisteredStyle(status, grade)
                                        }>
                                        {badge}
                                    </span>
                                )}
                                <span className="connected">
                                    <i className="img" />
                                    Connected to ICONex
                                </span>
                                <span className={`toggle${disabled ? ' disabled' : ''}`}></span>
                            </p>
                        ) : (
                            <p className="title">
                                Address
                                {is_prep && (
                                    <>
                                        <span
                                            className={
                                                'title-tag' + addUnregisteredStyle(status, grade)
                                            }>
                                            {badge}
                                        </span>
                                    </>
                                )}
                            </p>
                        )}
                        <div className="contents">
                            <div className="table-box">
                                <table className="table-typeB address">
                                    <thead>
                                        <tr>
                                            <th>Address</th>
                                            <th>value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {is_prep && (
                                            <tr className="p-rep">
                                                <td>Name</td>
                                                <td colSpan="3">
                                                    <span>{name}</span>
                                                    {website && (
                                                        <span
                                                            className="home"
                                                            onClick={() => {
                                                                onSocialClick(website)
                                                            }}>
                                                            <i className="img"></i>
                                                        </span>
                                                    )}
                                                    {SocialMediaType.map((type, index) => {
                                                        const mediaValue = links[type]

                                                        if (!mediaValue) {
                                                            return null
                                                        }

                                                        return (
                                                            <span
                                                                key={index}
                                                                className={type}
                                                                onClick={() => {
                                                                    onSocialClick(mediaValue)
                                                                }}>
                                                                {isUrl(mediaValue) ? (
                                                                    <i className="img"></i>
                                                                ) : (
                                                                    [
                                                                        <i
                                                                            key="i"
                                                                            className="img tooltip"></i>,
                                                                        <div
                                                                            key="div"
                                                                            className="help-layer">
                                                                            <p className="txt">
                                                                                {addAt(mediaValue)}
                                                                            </p>
                                                                            <div className="tri"></div>
                                                                        </div>,
                                                                    ]
                                                                )}
                                                            </span>
                                                        )
                                                    })}

                                                    {is_prep && isConnected ? (
                                                        <span
                                                            className={compStyles.buttonUpdatePrep}>
                                                            <button
                                                                disabled={!is_prep || !isConnected}
                                                                onClick={togglePrepModal}
                                                                className={compStyles.button}>
                                                                Update
                                                            </button>
                                                        </span>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <span
                                                        className={`active ${
                                                            node_state === 'Synced'
                                                                ? 'on'
                                                                : node_state === 'Inactive'
                                                                  ? 'off'
                                                                  : node_state === 'BlockSync'
                                                                    ? 'Active'
                                                                    : 'Inactive'
                                                        }`}>
                                                        <i></i>
                                                        {node_state}
                                                    </span>
                                                </td>
                                            </tr>
                                        )}
                                        {is_prep && (
                                            <tr className="">
                                                <td>Total Votes</td>
                                                <td colSpan="3">
                                                    <span>
                                                        {convertNumberToText(delegated)}

                                                        <em>
                                                            ( {(totalVotes * 100).toPrecision(3)}% )
                                                        </em>
                                                    </span>
                                                </td>
                                            </tr>
                                        )}
                                        {is_prep && (
                                            <tr className="last">
                                                <td>
                                                    Productivity
                                                    <br />
                                                    (Produced / (Produced + Missed))
                                                </td>
                                                <td>
                                                    <span>
                                                        {productivity}
                                                        <em>
                                                            ( {numberWithCommas(validated)} /{' '}
                                                            {numberWithCommas(produced)} )
                                                        </em>
                                                    </span>
                                                </td>
                                                <td>Last Blockheight</td>
                                                {_lastGenerateBlockHeight === 'None' ||
                                                _lastGenerateBlockHeight < 0 ? (
                                                    <td>
                                                        <span>None</span>
                                                    </td>
                                                ) : (
                                                    <td>
                                                        <span
                                                            className="mint"
                                                            onClick={() => {
                                                                goBlock(_lastGenerateBlockHeight)
                                                            }}>
                                                            {numberWithCommas(
                                                                _lastGenerateBlockHeight
                                                            )}
                                                        </span>
                                                    </td>
                                                )}
                                            </tr>
                                        )}
                                        <tr className="">
                                            <td>Address</td>
                                            <td
                                                colSpan={is_prep ? '3' : '1'}
                                                className={scam ? 'scam' : ''}>
                                                {scam && <span className="scam-tag">Scam</span>}
                                                {_address}
                                                <QrCodeButton address={data.address} />
                                                <CopyButton
                                                    data={_address}
                                                    title={'Copy Address'}
                                                    isSpan
                                                />
                                                <span
                                                    className="show-node-addr"
                                                    style={
                                                        is_prep
                                                            ? { display: '' }
                                                            : { display: 'none' }
                                                    }
                                                    onClick={clickShowBtn}>
                                                    Show node address
                                                </span>
                                                {isValidNodeType(nodeType) && (
                                                    <span className="crep">{`${nodeType}`}</span>
                                                )}
                                                {!isConnected && <ReportButton address={address} />}
                                            </td>
                                        </tr>
                                        <tr className="node-addr" style={{ display: showNode }}>
                                            <td>Node Address</td>
                                            <td colSpan="3">
                                                <i className="img node-addr"></i>
                                                {node_address}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Balance</td>
                                            <td colSpan="3" className="balance">
                                                <div className={icxMore ? 'on' : ''}>
                                                    <p>
                                                        <span>
                                                            <i className="coin icon"></i>ICX
                                                        </span>
                                                        <span>
                                                            {`${
                                                                totalBal
                                                                    ? numberWithCommas(totalBal)
                                                                    : 0
                                                            }`}
                                                            <em>ICX</em>
                                                        </span>
                                                        <em
                                                            className="drop-btn"
                                                            onClick={toggleIcxMore}>
                                                            <i className="img"></i>
                                                        </em>
                                                    </p>
                                                    <p>
                                                        <span>Available</span>
                                                        <span>
                                                            {`${numberWithCommas(
                                                                Number(addrBalance) /
                                                                    Math.pow(10, 18)
                                                            )}`}
                                                            <em>ICX</em>
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span>Staked</span>
                                                        <span>
                                                            {`${convertNumberToText(
                                                                stakeAmt / Math.pow(10, 18)
                                                            )}`}
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
                                                            {`${addrBond}`}
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
                                                                                  Target Block
                                                                                  Height{' '}
                                                                                  {convertNumberToText(
                                                                                      IconConverter.toNumber(
                                                                                          dataList.unstakeBlockHeight
                                                                                      )
                                                                                  )}
                                                                              </em>
                                                                              <span className="balance">
                                                                                  {convertNumberToText(
                                                                                      convertLoopToIcxDecimal(
                                                                                          dataList.unstake
                                                                                      )
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
                                                            {tokens.length}
                                                            <em>Tokens</em>
                                                        </span>
                                                        <em
                                                            className="drop-btn"
                                                            onClick={toggleTokenMore}>
                                                            <i className="img"></i>
                                                        </em>
                                                    </p>

                                                    {tokens.map((token, index) => (
                                                        <p key={index}>
                                                            <em
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    props.history.push(
                                                                        `/token/${token.address}`
                                                                    )
                                                                }}>
                                                                <span style={{ color: '#1aaaba' }}>
                                                                    {token.name}
                                                                </span>
                                                            </em>
                                                            <span>{`${convertNumberToText(
                                                                Number(token.balance) /
                                                                    Math.pow(
                                                                        10,
                                                                        Number(token.decimals)
                                                                    )
                                                            )}`}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    return Content()
}

export default withRouter(AddressInfo)

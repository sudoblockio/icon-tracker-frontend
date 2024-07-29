import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { IconConverter, IconAmount } from 'icon-sdk-js'
// import { Tooltip as ReactTooltip } from "react-tooltip";



import { CopyButton, QrCodeButton, LoadingComponent, ReportButton } from '../../../components'
import PrepUpdateModal from '../../PrepUpdateModal/PrepUpdateModal'
import {
  numberWithCommas,
  convertNumberToText,
  isValidNodeType,
  getBadgeTitle,
  isUrl,
  addAt,
  addUnregisteredStyle,
} from '../../../utils/utils'
import { SocialMediaType } from '../../../utils/const'
import NotificationManager from '../../../utils/NotificationManager'
import { prepList, getPRepsRPC, getPRep, getStake, getBalance } from '../../../redux/store/iiss'

import { getRevision } from '../../../redux/store/iiss'
import { chainMethods } from '../../../utils/rawTxMaker'
import { requestJsonRpc } from '../../../utils/connect'
import config from '../../../config'

import compStyles from './AddressInfo.module.css'
import AddrContractsBalRow from '../../shared/AddrContractsBalRow'
import StakingModal from '../../StakingModal/StakingModal'

const { nid } = config
const { requestUnjail } = chainMethods
const _isNotificationAvailable = NotificationManager.available()

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

function AddressInfo(props) {
  const [showNode, setShowNode] = useState('none')
  const [links, setLinks] = useState('')
  const [totalVoted, setTotalVoted] = useState('')

  const [isPrepModalOpen, setIsPrepModalOpen] = useState(false)
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false)

  const [commissionRate, setCommissionRate] = useState(null)
  const [maxCommissionChangeRate, setMaxCommissionChangeRate] = useState(null)
  const [maxCommissionRate, setMaxCommissionRate] = useState(null)
  const [chainCanJail, setChainCanJail] = useState(false)

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
    jail_flags,
    total_blocks,
    validated_blocks,
    website,
  } = prep || {}

  function togglePrepModal() {
    setIsPrepModalOpen(!isPrepModalOpen)
  }

  const [stakedAmt, setStakedAmt] = useState(null)
  // const [unstakeBlockHeight, setUnstakeList] = useState(null);

  const getAddrStake = async (addr) => {
    const res = await getStake(addr)
    const stakedAmount = Number(res.stake / Math.pow(10, 18))
    setStakedAmt(stakedAmount)
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

  async function executeUnjail() {
    const txData = requestUnjail(props.match.params.addressId, nid)

    try {
      await requestJsonRpc(txData.params)
    } catch (err) {
      console.log('Error from wallet')
      console.log(err)
    }
  }

  async function fetchPrepInfo() {
    try {
      const prepInfo = await getPRep(props.match.params.addressId)
      if (prepInfo) {
        setCommissionRate(prepInfo.commissionRate)
        setMaxCommissionChangeRate(prepInfo.maxCommissionChangeRate)
        setMaxCommissionRate(prepInfo.maxCommissionRate)
      }
    } catch (error) {
      console.error('Error fetching P-Rep information', error)
    }
  }

  // Jail flags are accumulative
  const getJailBadges = (jail_flag) => {
    let flagNames = []

    if (jail_flag & 1) {
      flagNames.push(<span className={`jail-badge in-jail`}>{'Jail'}</span>)
    }
    if (jail_flag & 2) {
      flagNames.push(<span className={`jail-badge unjailing`}>{'Unjailing'}</span>)
    }
    if (jail_flag & 4) {
      flagNames.push(
        <span className={`jail-badge validation-failure`}>{'Validation Failure'}</span>
      )
    }
    if (jail_flag & 8) {
      flagNames.push(<span className={`jail-badge double-sign`}>{'Double Sign'}</span>)
    }

    return flagNames
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

  const getVoted = async () => {
    if (totalVoted !== '') return

    const { totalDelegated: totalVotedLoop } = await getPRepsRPC()
    const totVotd = !totalVotedLoop
      ? 0
      : IconConverter.toNumber(
        IconAmount.of(totalVotedLoop || 0x0, IconAmount.Unit.LOOP)
          .convertUnit(IconAmount.Unit.ICX)
          .value.toString(10)
      )

    setTotalVoted(totVotd)
  }

  async function getRev() {
    const rev = await getRevision()
    // if chain revision is higher than rev 25 then
    // unjail functionality is available
    setChainCanJail(parseInt(rev, 16) >= 25)
  }

  function toggleStakingModal() {
    setIsStakingModalOpen((prev) => !prev)
  }

  const [availBal, setAvailBal] = useState(0);
  const [isShowStakingTooltip, setIsShowStakingTooltip] = useState(false);
  const getAddrBalance = async () => {
    const balanceData = await getBalance(props.match.params.addressId)
    setAvailBal(Number(balanceData) / Math.pow(10, 18))
  }
  const isDisabledStake = availBal === 0;

  useEffect(() => {
    if (!props.match.params.addressId) return

    getAddrBalance();
    getRev()
    fetchPrepInfo()
    getPrepSocialMedia(props.match.params.addressId)
    getVoted()
    getAddrStake(props.match.params.addressId)
  }, [props.match.params.addressId])

  const produced = IconConverter.toNumber(total_blocks)
  const validated = IconConverter.toNumber(validated_blocks)
  const productivity = !produced ? 'None' : `${((validated / produced) * 100).toFixed(2)}%`
  const _lastGenerateBlockHeight = !last_updated_block
    ? 'None'
    : IconConverter.toNumber(last_updated_block)
  const badge = getBadgeTitle(grade, node_state)
  const jailBadges = getJailBadges(parseInt(jail_flags, 16))

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
            isOpen={true}
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
                
                <span className={compStyles.stakeSpan}>
                  {isShowStakingTooltip && <div>* Minimum 1CX required to stake</div>}
                  <button
                    onClick={toggleStakingModal}
                    className={compStyles.button}
                    onMouseOver={() => { setIsShowStakingTooltip(isDisabledStake && true) }}
                    onMouseOut={() => { setIsShowStakingTooltip(isDisabledStake && false) }}
                    disabled={isDisabledStake}
                  >
                    Stake
                  </button>

                </span>
                {stakedAmt > 0 && (
                  <span>
                    <button
                      onClick={() => {
                        props.history.push(`/voting`)
                      }}
                      className={compStyles.button}>
                      Vote
                    </button>
                  </span>
                )}
                {isStakingModalOpen && (
                  <StakingModal onClose={toggleStakingModal} wallet={wallet} />
                )}
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
                            className={`active ${node_state === 'Synced'
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
                          {jailBadges}
                          {chainCanJail && is_prep && isConnected ? (
                            <span>
                              <button
                                disabled={!is_prep || !isConnected}
                                onClick={executeUnjail}
                                className={compStyles.button}>
                                Unjail
                              </button>
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    )}
                    {is_prep && (
                      <tr className="">
                        <td>Total Votes</td>
                        <td colSpan="3">
                          <span>
                            {convertNumberToText(Math.round(delegated))}

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
                    {is_prep && (
                      <tr className="last">
                        <td>
                          Commission %
                          <br />
                          (Max Change / Max Rate)
                        </td>
                        <td colSpan="3">
                          {' '}
                          {/* This assumes you have 4 columns in total */}
                          <span>
                            {commissionRate !== undefined
                              ? numberWithCommas(
                                Number(
                                  commissionRate / 100
                                ).toFixed()
                              )
                              : 0}
                            %
                            <em>
                              (
                              {numberWithCommas(
                                maxCommissionChangeRate !==
                                  undefined
                                  ? numberWithCommas(
                                    Number(
                                      maxCommissionChangeRate /
                                      100
                                    ).toFixed()
                                  )
                                  : 0
                              )}
                              % /{' '}
                              {numberWithCommas(
                                maxCommissionRate !== undefined
                                  ? numberWithCommas(
                                    Number(
                                      maxCommissionRate /
                                      100
                                    ).toFixed()
                                  )
                                  : 0
                              )}
                              % )
                            </em>
                          </span>
                        </td>
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
                              ? {
                                display: '',
                              }
                              : {
                                display: 'none',
                              }
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
                    <tr
                      className="node-addr"
                      style={{
                        display: showNode,
                      }}>
                      <td>Node Address</td>
                      <td colSpan="3">
                        <i className="img node-addr"></i>
                        {node_address}
                      </td>
                    </tr>
                    {/* <tr>
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
                                          Target Block Height{' '}
                                          {convertNumberToText(
                                            IconConverter.toNumber(dataList.unstakeBlockHeight)
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
                    </tr> */}

                    <AddrContractsBalRow
                      {...props}
                      delegated={delegated}
                      iscore={iscore}
                    // loading={loading}
                    // icxMore={icxMore}
                    // totalBal={totalBal}
                    // toggleIcxMore={toggleIcxMore}
                    // addrBalance={addrBalance}
                    // stakeAmt={stakeAmt}
                    // unstakeSum={unstakeSum}
                    // addrBond={addrBond}
                    // tokenMore={tokenMore}
                    // tokens={tokens}
                    // toggleTokenMore={toggleTokenMore}
                    // isTokenBalLoading={isTokenBalLoading}
                    />
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

import { useEffect, useState } from 'react'
import style from './VotingPage.module.scss'

import clsx from 'clsx'
import ReactSlider from 'react-slider'
import Checkbox from 'rc-checkbox'

import { calculatePercentage, numberWithCommas } from '../../utils/utils'
import { useVotingPage } from './useVotingPage'
import TableRow from './TableRow'
import VotingPopup from './VotingPopup'

export default function VotingPage(props) {
    const { walletAddress } = props
    const {
        state,
        handleChangeCheckbox,
        handleChangeVoteAmt,
        handleChangeVotePercent,
        updateAvailVoteAmt,
        handleSubmitVoting,
        toggleIsOpenPopup,
        handleDeleteVoted
    } = useVotingPage(walletAddress, props.history)

    const [openRow, setOpenRow] = useState(null)

    const convert = (hex) => {
        return numberWithCommas(Number(hex / Math.pow(10, 18)).toFixed())
    }

    const isConnected = walletAddress.length > 0
    if (!isConnected) {
        alert('Please connect to a wallet to vote')
        window.location = '/addresses'
    }


    function handleInputOnFocus(index, votedAmt) {
        setOpenRow(index)
        updateAvailVoteAmt(Number(votedAmt))
    }

    function onChangeCheckbox(prep) {
        const selectedLen = Object.entries(state.selectedMap).length
        handleChangeCheckbox(prep)
        handleInputOnFocus(selectedLen, 0)
    }

    const prepsList = state.preps
    const votedList = Object.entries(state.selectedMap).map(([key, value]) => { return value })

    const delegatedPercent = calculatePercentage(state.totVotedAmt, state.stakedAmount)


    return (
        <div className={clsx(style.wrapper, 'content-wrap')}>
            <div className="screen0">
                <div className="wrap-holder">

                    {state.isOpenPopup &&
                        <VotingPopup
                            updateAvailVoteAmt={updateAvailVoteAmt}
                            handleChangeVoteAmt={handleChangeVoteAmt}
                            handleChangeVotePercent={handleChangeVotePercent}
                            state={state}
                            handleDeleteVoted={handleDeleteVoted}
                            onClose={toggleIsOpenPopup}
                            onSubmit={handleSubmitVoting}
                        />

                    }

                    <span onClick={toggleIsOpenPopup} className={style.btnFab}>
                        <button>
                            <span>
                                ({votedList.length})
                            </span>
                        </button>
                    </span>


                    {/* <div className={style.graph}>
                        <div className={clsx(style.label, style.top)}>
                            <div>
                                <span>{delegatedPercent}% Delegated</span>
                            </div>
                            <div>
                                <span>{100 - delegatedPercent}% Non-delegated</span>
                            </div>
                        </div>
                        <div className={style.bar}>
                            <div className={style.delegated} style={{ width: `${delegatedPercent}%` }}>
                            </div>
                            <div className={style.nonDelegated} style={{ width: `${100 - delegatedPercent}%` }}>
                            </div>
                        </div>
                        <div className={clsx(style.label, style.bottom)}></div>
                    </div> */}

                    {/* <div className={style.header}>
                        <div>
                            <span>Staked Amount</span>
                            <span>{state.stakedAmount}</span>
                        </div>
                        <div>
                            <span>Total Voted</span>
                            <span>{state.totVotedAmt}</span>
                        </div>
                        <div>
                            <span>Total Available</span>
                            <span>{state.totAvailVoteAmt}</span>
                        </div>
                    </div> */}

                    {/* <div className={style.summaryWrapper}>
                        <h4>Selected P-Reps</h4>
                        <table className="table-typeP">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Vote</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(state.selectedMap).map(([key, value], index) => (
                                    <>
                                        <tr className={index === openRow && style.open}>
                                            <td>{value.name}</td>
                                            <td>
                                                <input
                                                    onFocus={handleInputOnFocus.bind(
                                                        this,
                                                        index,
                                                        value.voteAmt
                                                    )}
                                                    onChange={(e) => {
                                                        const { value: amount } = e.target
                                                        handleChangeVoteAmt(value.address, amount)
                                                    }}
                                                    value={value.voteAmt}
                                                    type="text"
                                                    className={clsx('txt-type-search')}
                                                />
                                            </td>
                                        </tr>

                                        {index === openRow && (
                                            <tr className={style.sliderWrapper}>
                                                <td></td>
                                                <td>
                                                    <ReactSlider
                                                        className={style.slider}
                                                        thumbClassName={style.thumb}
                                                        trackClassName={style.track}
                                                        renderThumb={(props, state) => {
                                                            return <div {...props}></div>
                                                        }}
                                                        onChange={(result, index) => {
                                                            handleChangeVoteAmt(
                                                                value.address,
                                                                result
                                                            )
                                                        }}
                                                        // onAfterChange={handleAfterSliderChange}
                                                        value={value.voteAmt}
                                                        min={0}
                                                        max={state.currMax}
                                                    />
                                                    <div
                                                        className={clsx(
                                                            style.labels,
                                                            style.bottomLabels
                                                        )}>
                                                        <span>{0} ICX</span>
                                                        <span>{state.currMax} ICX</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>

                        <div className={style.footer}>
                            <button onClick={handleSubmitVoting}>Vote</button>
                        </div>
                    </div> */}

                    <div className={style.prepsWrapper}>
                        {/* <h4>P-Reps </h4> */}
                        <table className="table-typeP">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Power</th>
                                    <th>Commision</th>
                                    <th>Monthly Reward</th>
                                    <th>Votes</th>
                                    <th>Bonded /<br />% Bonded</th>
                                </tr>
                            </thead>

                            <tbody>
                                {prepsList?.map((prep) => <TableRow onChangeCheckbox={onChangeCheckbox} prep={prep} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
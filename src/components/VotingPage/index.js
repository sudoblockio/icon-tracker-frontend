import { useEffect, useState } from 'react'
import style from './VotingPage.module.scss'

import clsx from 'clsx'
import ReactSlider from 'react-slider'
import Checkbox from 'rc-checkbox'

import { calculatePercentage, numberWithCommas } from '../../utils/utils'
import { useVotingPage } from './useVotingPage'
import TableRow from './TableRow'
import VotedTable from './VotedTable'

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
    let totVotedAmt = 0;
    let totVotedPercent = 0;
    votedList.forEach(item => {
        totVotedAmt += Number(item.voteAmt)
        totVotedPercent += Number(item.votePercent)
    })


    return (
        <div className={clsx(style.wrapper, 'content-wrap')}>
            <div className="screen0">
                <div className="wrap-holder">

                    <div className={style.header}>
                        <h4>Voting</h4>
                    </div>

                    <div className={style.tablesWrapper}>
                        <div className={style.prepsWrapper}>
                            <input type="text" className="txt-type-search search-type-fix" placeholder='Search P-rep name/address' />
                            <div className={style.tableWrapper}>
                                <table className="table-typeP">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Bonded /<br />% Bonded</th>
                                            <th>Monthly Rewards <br /> ICX/USD </th>
                                            <th>Commision % <br /> (Max Change/Max Rate)</th>
                                            {/* <th>Votes</th> */}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {prepsList?.map((prep) => <TableRow onChangeCheckbox={onChangeCheckbox} prep={prep} />)}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={style.votedWrapper}>
                            <div className={style.caption}>
                                Voted Candidates
                            </div>
                            <div className={style.tableWrapper}>
                                <VotedTable updateAvailVoteAmt={updateAvailVoteAmt}
                                    handleChangeVoteAmt={handleChangeVoteAmt}
                                    handleChangeVotePercent={handleChangeVotePercent}
                                    state={state}
                                    handleDeleteVoted={handleDeleteVoted}
                                    onClose={toggleIsOpenPopup}
                                    onSubmit={handleSubmitVoting}
                                />
                                <div className={style.footer}>
                                    <div>Total</div>
                                    <div className={clsx(style.total)}>
                                        <div>
                                            <label>ICX Amount:</label>
                                            <span>
                                                {totVotedAmt}
                                            </span>
                                            {(state.validationErrors.amount || state.validationErrors.percent) &&
                                                <div className={style.error}>
                                                    {
                                                        state.validationErrors?.amount?.msg
                                                    }
                                                </div>}

                                        </div>
                                        <div>
                                            <label>Percent:</label>
                                            <span>
                                                {totVotedPercent}
                                            </span>
                                            {(state.validationErrors.amount || state.validationErrors.percent) &&
                                                <div className={style.error}>
                                                    {
                                                        state.validationErrors?.percent?.msg
                                                    }
                                                </div>}


                                        </div>
                                        <div className={style.button}>
                                            <button onClick={handleSubmitVoting}>Vote</button>
                                        </div>
                                    </div>



                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
import style from './index.module.scss'

import clsx from 'clsx'

import TableRow from './TableRow'
import VotedTable from './VotedTable'

import { useVotingPage } from './useVotingPage'
import ClipLoader from 'react-spinners/ClipLoader'

import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import { useState } from 'react'
import AutoVotePopup from './AutoVotePopup'

const TABLE_HEADERS = [
    { name: ["Name"], sortKey: "name", },
    { name: ["Commission %", "(Max Change/Max Rate)"], sortKey: "commission_rate" },
    { name: ["%Bonded", "Bonded"], sortKey: "bond_percent" },
    { name: ["Monthly Rewards", "ICX/USD"] },
    { name: ["Votes"] }]

const Loader = ({ height }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: height
            }}>
            <ClipLoader size={30} color="#299fac" />
        </div>
    )
}


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
        handleDeleteVoted,
        handleClickHeader,
        handleChangeSearch,
        handleSubmitAutoVote
    } = useVotingPage(walletAddress, props.history)

    const [isOpenAutoVotePopup, setIsOpenAutoVotePopup] = useState(false);

    function toggleAutoVotePopup() {
        setIsOpenAutoVotePopup(prev => !prev)
    }

    const isConnected = walletAddress.length > 0
    if (!isConnected) {
        alert('Please connect to a wallet to vote')
        window.location = '/addresses'
    }


    function handleInputOnFocus(index, votedAmt) {
        updateAvailVoteAmt(Number(votedAmt))
    }

    function onChangeCheckbox(prep) {
        const selectedLen = Object.entries(state.selectedMap).length
        handleChangeCheckbox(prep)
        handleInputOnFocus(selectedLen, 0)
    }


    const { filteredPreps } = state;

    const votedList = Object.entries(state.selectedMap).map(([key, value]) => { return value })
    let totVotedAmt = 0;
    let totVotedPercent = 0;
    votedList.forEach(item => {
        totVotedAmt += Number(item.voteAmt) || 0
        totVotedPercent += Number(item.votePercent) || 0
    })



    return (
        <div className={clsx(style.wrapper, 'content-wrap')}>
            <div className="screen0">
                <div className="wrap-holder">
                    <div className={style.header}>
                        <h4 >
                            Voting
                            <span
                                onClick={toggleAutoVotePopup}
                                className={style.autoBtn}>
                                <span >
                                    <CiCircleCheck />  Auto Vote
                                </span>
                            </span>
                            <AutoVotePopup maxVoteAmt={state.maxVoteAmt} isOpen={isOpenAutoVotePopup} onClose={toggleAutoVotePopup} onSubmit={handleSubmitAutoVote} />

                        </h4>
                    </div>

                    <div className={style.tablesWrapper}>
                        <div className={style.prepsWrapper}>
                            <input type="text"
                                className="txt-type-search search-type-fix"
                                placeholder='Search P-rep name/address'
                                onChange={handleChangeSearch}
                            />
                            <div className={style.tableWrapper}>
                                <table className="table-typeP">
                                    {state.isLoadingPreps ?
                                        <Loader height={"500px"} />
                                        :
                                        <>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    {
                                                        TABLE_HEADERS.map(({ name, sortKey }) =>
                                                            <th
                                                                onClick={sortKey ? handleClickHeader.bind(this, sortKey) : null}
                                                                className={clsx(sortKey && "pointer")}
                                                            >
                                                                {name.map(n => <> {n} <br /> </>)}
                                                                {sortKey === state.sortKey && <>
                                                                    {state.sortOrder === "" ? <IoChevronUp /> : <IoChevronDown />}
                                                                </>}
                                                            </th>)
                                                    }
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {filteredPreps?.map((prep) =>
                                                    <TableRow
                                                        totalVoted={state.totalVoted}
                                                        onChangeCheckbox={onChangeCheckbox}
                                                        prep={prep}
                                                    />
                                                )}
                                            </tbody>
                                        </>}

                                </table>
                            </div>
                        </div>

                        <div className={style.votedWrapper}>
                            <div className={style.caption}>
                                Voted Candidates
                            </div>
                            <div className={style.tableWrapper}>
                                {state.isLoadingPreps ? <Loader height={"400px"} /> : <VotedTable updateAvailVoteAmt={updateAvailVoteAmt}
                                    handleChangeVoteAmt={handleChangeVoteAmt}
                                    handleChangeVotePercent={handleChangeVotePercent}
                                    state={state}
                                    handleDeleteVoted={handleDeleteVoted}
                                    onClose={toggleIsOpenPopup}
                                    onSubmit={handleSubmitVoting}
                                />}

                            </div>
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
        </div >
    )
}
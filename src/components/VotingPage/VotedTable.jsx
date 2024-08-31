import React, { useState } from "react"
import style from "./VotedTable.module.scss"

import clsx from "clsx";
import ReactSlider from "react-slider";

import { RxCross2 } from "react-icons/rx";


export default function VotedTable({
    state,
    handleChangeVoteAmt,
    updateAvailVoteAmt,
    handleChangeVotePercent,
    handleDeleteVoted,
    onSubmit
}) {
    const { selectedMap } = state;

    const [openRow, setOpenRow] = useState(null)

    function handleInputOnFocus(index, votedAmt) {
        setOpenRow(index)
        updateAvailVoteAmt(Number(votedAmt))
    }

    // const getMainBadge = (grade, node_state) => {
    //     const className = node_state === 'Synced' ? 'prep-tag' : node_state === 'Inactive' ? 'prep-tag off' : 'prep-tag block-synced'
    //     switch (grade) {
    //         case 0:
    //         case '0x0':
    //             return <span className={className}><i></i>Main P-Rep</span>
    //         case 1:
    //         case '0x1':
    //             return <span className={className}><i></i>Sub P-Rep</span>
    //         case 2:
    //         case '0x2':
    //             return <span className={className}><i></i>Candidate</span>
    //         default:
    //             return null
    //     }
    // }

    const votedList = Object.entries(selectedMap).map(([key, value]) => { return value })
    // let totVotedAmt = 0;
    // let totVotedPercent = 0;
    // votedList.forEach(item => {
    //     totVotedAmt += Number(item.voteAmt)
    //     totVotedPercent += Number(item.votePercent)
    // })

    return (
        <table className={clsx("table-typeP", style.wrapper)}>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th className={style.voteHeader}>
                        <span>Amount (ICX)</span>
                        <span>Vote %</span>
                    </th>

                </tr>
            </thead>
            <tbody>
                {votedList.map((value, index) => (
                    <>
                        <tr key={value.address} className={clsx(index === openRow && style.open)}>
                            <td onClick={handleDeleteVoted.bind(this, value)} >
                                <span className={style.cross}>
                                    <RxCross2 />
                                </span>
                            </td>
                            <td className={Number(value.grade) > 2 || value.grade === '0x3' ? 'black' : 'on'}>
                                <span className={style.nameRow}>
                                    <span className={style.nameAddr}>
                                        <span>
                                            {value.name}
                                        </span>
                                        <span className={style.addr}>
                                            {value.address}
                                        </span>
                                    </span>
                                </span>

                            </td>
                            <td>
                                <div className={style.vote}>
                                    <span>
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
                                    </span>
                                    <span>
                                        <input
                                            onFocus={handleInputOnFocus.bind(
                                                this,
                                                index,
                                                value.votePercent
                                            )}
                                            onChange={(e) => {
                                                const { value: percent } = e.target
                                                handleChangeVotePercent(value.address, percent)
                                            }}
                                            value={value.votePercent}
                                            type="text"
                                            className={clsx('txt-type-search')}
                                        />
                                    </span>
                                </div>
                            </td>
                        </tr >

                        {index === openRow && (
                            <tr className={style.sliderWrapper}>
                                <td></td>
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
                                            handleChangeVotePercent(value.address, result)
                                        }}
                                        value={value.votePercent}
                                        min={0}
                                        max={100}
                                    />
                                </td>
                            </tr>
                        )}
                    </>
                ))}
            </tbody>
        </table>
    )
};


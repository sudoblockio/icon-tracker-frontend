import React, { useState } from "react"
import style from "./VotingPopup.module.scss"

import Modal from "react-modal";
import clsx from "clsx";
import ReactSlider from "react-slider";

// import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function VotingPopup({
    state,
    handleChangeVoteAmt,
    updateAvailVoteAmt,
    handleChangeVotePercent,
    handleDeleteVoted,
    onClose,
    onSubmit
}) {
    const { selectedMap } = state;

    const [openRow, setOpenRow] = useState(null)

    function handleInputOnFocus(index, votedAmt) {
        setOpenRow(index)
        updateAvailVoteAmt(Number(votedAmt))
    }

    const getMainBadge = (grade, node_state) => {
        const className = node_state === 'Synced' ? 'prep-tag' : node_state === 'Inactive' ? 'prep-tag off' : 'prep-tag block-synced'
        switch (grade) {
            case 0:
            case '0x0':
                return <span className={className}><i></i>Main P-Rep</span>
            case 1:
            case '0x1':
                return <span className={className}><i></i>Sub P-Rep</span>
            case 2:
            case '0x2':
                return <span className={className}><i></i>Candidate</span>
            default:
                return null
        }
    }

    const votedList = Object.entries(selectedMap).map(([key, value]) => { return value })
    let totVotedAmt = 0;
    let totVotedPercent = 0;
    votedList.forEach(item => {
        totVotedAmt += Number(item.voteAmt)
        totVotedPercent += Number(item.votePercent)
    })

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            style={customStyles}
        >
            <div className={style.innerWrapper}>
                <div className={style.header}>
                    <h4>Voted Candidates</h4>
                </div>

                <table className="table-typeP">
                    {/* <thead>
                        <tr>
                            <th>Name</th>
                            <th>Vote</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {votedList.map((value, index) => (
                            <>
                                <tr className={index === openRow && style.open}>
                                    <td onClick={handleDeleteVoted.bind(this, value)} >
                                        <RxCross2 />
                                    </td>
                                    <td className={Number(value.grade) > 2 || value.grade === '0x3' ? 'black' : 'on'}>
                                        <ul className={style.custom001}>
                                            <li>
                                                {value.logo_256 ? (
                                                    <img
                                                        src={value.logo_256 ? value.logo_256 : value.logo_svg}
                                                        alt="logo"
                                                    // onError={this.onError}
                                                    // onLoad={this.loadImage}
                                                    // style={this.state.loaded ? {} : { display: 'none' }}
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </li>
                                            <li>
                                                <span
                                                    className="ellipsis pointer"
                                                // onClick={() => {
                                                //     this.goAddress(address)
                                                // }}
                                                >
                                                    {getMainBadge(value.grade, value.node_state)}
                                                    {value.name}
                                                </span>
                                                <em
                                                    className="ellipsis pointer"
                                                // onClick={() => {
                                                // this.goAddress(address)
                                                // }}
                                                >
                                                    {value.address}
                                                </em>
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <div className={style.vote}>
                                            <span>
                                                <label>Amount (ICX)</label>
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
                                                <label>Percent</label>
                                                <input
                                                    onFocus={handleInputOnFocus.bind(
                                                        this,
                                                        index,
                                                        value.voteAmt
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
                                                value={value.voteAmt}
                                                min={0}
                                                max={state.currMax}
                                            />
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                        <tr>
                            <td></td>
                            <td>Total</td>
                            <td>
                                <div className={clsx(style.vote, style.total)}>
                                    <span>
                                        <label>Amount (ICX)</label>
                                        <input
                                            value={totVotedAmt}
                                            type="text"
                                            className={clsx('txt-type-search')}
                                        />
                                        <div className={style.error}>
                                            {
                                                state.validationErrors.amount &&
                                                state.validationErrors.amount.msg
                                            }
                                        </div>
                                    </span>

                                    <span>
                                        <label>Percent</label>
                                        <input
                                            value={totVotedPercent}
                                            type="text"
                                            className={clsx('txt-type-search')}
                                        />
                                        <div className={style.error}>
                                            {
                                                state.validationErrors.percent &&
                                                state.validationErrors.percent.msg
                                            }
                                        </div>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={style.footer}>
                    <button onClick={onClose}>Cancel</button>
                    <button disabled={state.validationErrors.percent || state.validationErrors.amount} onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </Modal >

    )
};


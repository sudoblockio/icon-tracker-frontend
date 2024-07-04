import React from 'react'
import style from './StakingModal.module.scss'

import clsx from 'clsx'
import ReactSlider from 'react-slider'

import { useStakingModal } from './useStakingModal'
import GenericModal from '../GenericModal/genericModal'
import { calculatePercentage } from '../../utils/utils'

import ClipLoader from 'react-spinners/ClipLoader'

export default function StakingModal({ wallet, onClose }) {
    const { state, handleChangeForm, handleSubmit, handleAfterSliderChange } =
        useStakingModal(wallet)

    function truncDecimal(value) {
        return Number(value.toFixed(2))
    }

    const newStakePercent = calculatePercentage(state.newStake, state.balance)
    const availPercent = calculatePercentage(state.balance - state.newStake, state.balance)
    const votedPercent = calculatePercentage(state.totVoted, state.balance)
    // const votedPercent = 10;

    function getStyle({ width }) {
        return { width: `${Number(width)}%`, minWidth: `${Number(width)}%` }
    }

    const formatNumber = (number, decimals) => {
        return (Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
      };
    

    return (
        <GenericModal onClose={onClose} isOpen={true}>
            <div className={style.innerWrapper}>
                <h4>Staking</h4>
                <div className={style.subtext}>The amount of voted ICX cannot be unstaked</div>
                {state.isLoading ? (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ClipLoader color="grey" size={30} />
                    </div>
                ) : (
                    <form onChange={handleChangeForm} onSubmit={handleSubmit}>
                        {
                            <div className={style.sliders}>
                                {votedPercent > 0 &&
                                    <div className={style.votedBlock} style={getStyle({ width: votedPercent })}>
                                        <div className={style.bar}></div>
                                    </div>
                                }
                                {availPercent < 92 &&     <div className={style.sliderLabel}>
                                    <span className={style.caption}>Voted</span>
                                    <span className={style.value}>{votedPercent}%</span>
                                </div>}
                             

                                <div className={style.sliderWrapper} style={{ ...getStyle({ width: 100 - votedPercent }), }}>
                                    <div className={style.sliderLabel} style={{ left: `${newStakePercent}%`, top: '-3.5em' }}>
                                        <span className={style.caption}>Staked</span>
                                        <span className={style.value}>  {newStakePercent}%</span>
                                    </div>
                                    <ReactSlider
                                        className={style.slider}
                                        thumbClassName={style.thumb}
                                        trackClassName={style.track}
                                        renderThumb={(props, state) => {
                                            return <div {...props}></div>
                                        }}
                                        onChange={(result, index) => {
                                            handleChangeForm({
                                                target: {
                                                    name: 'newStake',
                                                    value: Math.min(result, state.maxStake),
                                                },
                                            })
                                        }}
                                        onAfterChange={handleAfterSliderChange}
                                        value={state.newStake}
                                        min={state.minStake}
                                        max={state.maxStake}
                                    />
                                </div>
                                {availPercent > 0 &&
                                    <div className={style.availBlock} style={getStyle({ width: availPercent })} ></div>
                                }
                                <div className={style.sliderLabel} style={{left: `${100-availPercent}%`}}>
                                    <span className={style.caption}>Available</span>
                                    <span className={style.value}>  {availPercent}%</span>
                                </div>

                            </div>}


                        <div className={style.row}>
                            <div className={style.inputWrapper}>
                                <label>Enter the stake amount (ICX)</label>
                                <input
                                    value={state.newStake}
                                    type="text"
                                    name="newStake"
                                    placeholder="Stake Amount"
                                />
                            </div>
                            <div className={style.inputWrapper}>
                                <label>Enter the stake %</label>
                                <input
                                    value={newStakePercent}
                                    type="text"
                                    name="newStake"
                                    placeholder="Stake Amount"
                                />
                            </div>
                        </div>


                        <div className={style.row}>
                            <div className={style.card}>
                                <div className={style.label}>
                                    Voted (ICX)
                                </div>
                                <div className={style.value}>
                                    {state.totVoted} ICX ({votedPercent}%)
                                </div>
                            </div>

                            <div className={style.card}>
                                <div className={style.label}>
                                    Available  (ICX)
                                </div>
                                <div className={style.value}>
                                    {truncDecimal(state.available)} ICX  ({availPercent}%)
                                </div>
                            </div>
                        </div>

                        {state.isErrStaking && (
                            <div className={style.error}>
                                Stake amount can't be less than already voted amount
                            </div>
                        )}

                    </form>
                )}

                <div className={style.preFooter}>
                    <div className={style.row}>
                        <div className={clsx(style.computed, style.step)}>
                            <div className={style.caption}>
                                Step Limit / Step Price
                            </div>
                            <div className={style.value}>
                                {state.stepLimit || '-'} / {formatNumber(state.stepPrice, 8)} ICX
                            </div>
                        </div>
                        <div className={clsx(style.computed, style.step)}>
                            <div className={style.caption}>
                               Estimated Maximum Fee
                            </div>
                            <div className={style.value}>
                               {formatNumber(state.stepLimit *  state.stepPrice, 8)} ICX
                            </div>
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={clsx(style.computed, style.step)}>
                            <div className={style.caption}>
                                Estimated time to Unstake
                            </div>
                            <div className={style.value}>
                                ------
                            </div>
                        </div>
                    </div>

                </div>



                <div className={style.footer}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </GenericModal >
    )
}

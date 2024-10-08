import React, { useEffect, useRef, useState } from "react"
import style from "./AutoVotePopup.module.scss"

import parse from 'html-react-parser';
import { Tooltip } from 'react-tooltip'
import { MdInfoOutline } from "react-icons/md";
import ReactSlider from "react-slider";


import Checkbox from "../CommonComponent/Checkbox"
import DropdownMenu from "../CommonComponent/DropdownMenu"
import GenericModalV2 from "../GenericModalV2/GenericModal";


const CHECKBOX_OPTS = [
    { label: "Exclude jailed candidates", type: "JAILED" },
]

const PRIORITY_OPTS = [
    { label: "Most Optimised", value: "mostOptimised" },
    { label: "Commission Rate", value: "commissionRate" },
    { label: "Bond Percent", value: "bondPercent" },

]

const INPUT_DEFAULT_VALUES = {
    prepCount: 10,
    commissionRateCutoff: 12.5,
    overBondCutoff: 5
    // voteAmt: 1000,
}

const INPUTS = [
    {
        name: "prepCount",
        label: "No. of validators",
        defaultValue: INPUT_DEFAULT_VALUES["prepCount"],
        info: `<p>Number of validators(prep) nodes you want to split your vote across</p>`,
        unit: null,
    },
    {
        name: "voteAmt",
        label: "Vote Amount",
        info: `<p>Total amount of votes you want to delegate</p>`,
        unit: `ICX`
    },
    {
        name: "commissionRateCutoff",
        label: "Commission rate cutoff",
        defaultValue: INPUT_DEFAULT_VALUES["commissionRateCutoff"],
        info: "<p>Only select validators with commission rate less than the cutoff</p>",
        unit: '%'
    },
    {
        name: "overBondCutoff",
        label: "Over bond percent cutoff",
        defaultValue: INPUT_DEFAULT_VALUES["overBondCutoff"],
        info: "<p>Only select validators with over bonding % greater than the cutoff</p>",
        unit: '%'
    }
]

const PRIORITY_INFO = `<div className=${style.infoPopup}>
                            <p>Validators will be selected based on the priority value chosen</p></br>  
                            <p>Most Optimised  -  Balanced between low commission rate and high bonding %</p>  
                            <p>Commission Rate - Validators with lower commission rate would be given more priority</p>
                            <p>Bond Percent - Validators with higher bond % would be given more priority</p>
                        </div>
`

export default function AutoVotePopup({ isOpen, onClose, onSubmit, maxVoteAmt }) {
    const voteAmtRef = useRef();

    const [state, setState] = useState({
        formData: {
            prepCount: INPUT_DEFAULT_VALUES["prepCount"],
            overBondCutoff: INPUT_DEFAULT_VALUES["overBondCutoff"],
            commissionRateCutoff: INPUT_DEFAULT_VALUES["commissionRateCutoff"],
            priority: PRIORITY_OPTS[0],
            voteAmt: 10,
            excludeJailed: true
        },
        formErrors: {
            voteAmt: { isError: false }
        }
    });


    function handleChangeCheckbox() {
        setState(prev => ({ ...prev, formData: { ...prev.formData, excludeJailed: !prev.formData.excludeJailed } }))
    }

    function handleChangeForm(e) {
        const { name, value } = e.target;

        if (name === "voteAmt") {
            if (value > maxVoteAmt) {
                setState(prev => ({
                    ...prev,
                    formErrors: {
                        ...prev.formErrors,
                        voteAmt: {
                            isError: true,
                            message: `Amount can't be greather than ${maxVoteAmt} ICX`
                        }
                    }
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    formErrors: {
                        ...prev.formErrors,
                        voteAmt: {
                            isError: false,
                            message: ""
                        }
                    }
                }))
            }
        }
        setState(prev => ({ ...prev, formData: { ...prev.formData, [name]: Number(value) } }))
    }

    async function handleSubmitForm(e) {
        e.preventDefault();
        await onSubmit({ ...state.formData, priority: state.formData.priority.value })
        onClose();
    }

    function handleChangePriority(e) {
        setState(prev => ({ ...prev, formData: { ...prev.formData, priority: e } }))
    }

    function handleChangeVoteAmt(value) {
        voteAmtRef.current.value = value;
        setState(prev => ({ ...prev, formData: { ...prev.formData, voteAmt: value } }))
    }

    useEffect(() => {
        handleChangePriority(PRIORITY_OPTS[0])
    }, [])


    useEffect(() => {
        voteAmtRef.current.focus();
        voteAmtRef.current.value = maxVoteAmt;
        setState(prev => ({ ...prev, formData: { ...prev.formData, voteAmt: maxVoteAmt } }))
    }, [isOpen, maxVoteAmt])

    const isSubmitDisabled = state.formErrors.voteAmt.isError

    return (
        <GenericModalV2 isOpen={isOpen} onClose={onClose}>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <h4>Auto Vote</h4>
                    <span onClick={onClose}>&times;</span>
                </div>




                <div className={style.formWrapper}>
                    <form onChange={handleChangeForm} onSubmit={handleSubmitForm}>
                        <div className={style.inputs}>
                            {
                                INPUTS.map(({ name, label, info, defaultValue, unit }) =>
                                    <div className={style.inputWrapper}>
                                        <label>
                                            <span>
                                                {label}
                                            </span>
                                            <a id={`${name}-hover`}><MdInfoOutline /></a>
                                        </label>

                                        <div className={style.input}>
                                            <input
                                                ref={name === "voteAmt" ? voteAmtRef : null}
                                                step="any"
                                                type="number"
                                                name={name}
                                                defaultValue={defaultValue}
                                            />
                                            {unit && <span>{unit}</span>}
                                        </div>


                                        {name === "voteAmt" &&
                                            <>
                                                {state.formErrors.voteAmt.isError &&
                                                    <p className={style.error}>
                                                        {state.formErrors.voteAmt.message}
                                                    </p>
                                                }

                                                <div className={style.sliderWrapper}>
                                                    <ReactSlider
                                                        className={style.slider}
                                                        thumbClassName={style.thumb}
                                                        trackClassName={style.track}
                                                        renderThumb={(props, state) => {
                                                            return <div {...props}></div>
                                                        }}
                                                        onChange={(result, index) => {
                                                            handleChangeVoteAmt(result)
                                                        }}
                                                        value={state.formData.voteAmt}
                                                        min={0}
                                                        max={maxVoteAmt}

                                                    />
                                                </div>
                                            </>

                                        }

                                        <Tooltip anchorSelect={`#${name}-hover`}>
                                            {parse(info)}
                                        </Tooltip>
                                    </div>
                                )
                            }

                        </div>

                        <div className={style.inputWrapper}>
                            <label>
                                <span>
                                    Priority
                                </span>
                                <a id="priority-hover">
                                    <MdInfoOutline />
                                </a>
                            </label>
                            <Tooltip anchorSelect={`#priority-hover`}>
                                {parse(PRIORITY_INFO)}
                            </Tooltip>
                            <DropdownMenu value={state.formData.priority} onChange={handleChangePriority} options={PRIORITY_OPTS} />
                        </div>

                        <div className={style.checkboxes}>
                            {CHECKBOX_OPTS.map(item =>
                                <div className={style.checkboxWrapper}>
                                    <Checkbox checked={state.formData.excludeJailed} onChange={handleChangeCheckbox} />
                                    <label>{item.label}</label>
                                </div>
                            )}
                        </div>

                        <div className={style.btnWrapper}>
                            <button disabled={isSubmitDisabled}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </GenericModalV2>
    )
};


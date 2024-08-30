import React, { useEffect, useState } from "react"
import style from "./AutoVotePopup.module.scss"

import parse from 'html-react-parser';
import { Tooltip } from 'react-tooltip'
import { MdInfoOutline } from "react-icons/md";


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
    },
    {
        name: "voteAmt",
        label: "Vote Amount",
        info: `<p>Total amount of votes you want to delegate</p>`,
    },
    {
        name: "commissionRateCutoff",
        label: "Commission rate cutoff",
        defaultValue: INPUT_DEFAULT_VALUES["commissionRateCutoff"],
        info: "<p>Number of validators(prep) nodes you want to split your vote across</p>"
    },
    {
        name: "overBondCutoff",
        label: "Over bond percent cutoff",
        defaultValue: INPUT_DEFAULT_VALUES["overBondCutoff"],
        info: "<p>Number of validators(prep) nodes you want to split your vote across</p>"
    }
]

export default function AutoVotePopup({ isOpen, onClose, onSubmit }) {
    const [state, setState] = useState({
        formData: {
            prepCount: INPUT_DEFAULT_VALUES["prepCount"],
            overBondCutoff: INPUT_DEFAULT_VALUES["overBondCutoff"],
            commissionRateCutoff: INPUT_DEFAULT_VALUES["commissionRateCutoff"],
            priority: PRIORITY_OPTS[0],
            voteAmt: 0,
            excludeJailed: true
        }
    });


    function handleChangeCheckbox(type) {
        setState(prev => ({ ...prev, formData: { ...prev.formData, excludeJailed: !prev.formData.excludeJailed } }))
    }

    function handleChangeForm(e) {
        const { name, value } = e.target;
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

    useEffect(() => {
        handleChangePriority(PRIORITY_OPTS[1])
    }, [])

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
                                INPUTS.map(({ name, label, info, defaultValue }) =>
                                    <div className={style.inputWrapper}>
                                        <label>
                                            <span>
                                                {label}
                                            </span>
                                            <a id={`${name}-hover`}><MdInfoOutline /></a>
                                        </label>
                                        <input step="any" type="number" name={name} defaultValue={defaultValue} />

                                        <Tooltip anchorSelect={`#${name}-hover`}>
                                            {parse(info)}
                                        </Tooltip>
                                    </div>
                                )
                            }

                        </div>

                        <div className={style.inputWrapper}>
                            <label>Priority</label>
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
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </GenericModalV2>
    )
};


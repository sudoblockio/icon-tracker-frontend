import React from "react"
import style from "./AutoVotePopup.module.scss"
import GenericModal from "../GenericModal/genericModal"
import Checkbox from "../CommonComponent/Checkbox"
import DropdownMenu from "../CommonComponent/DropdownMenu"

const CHECKBOX_OPTS = [
    { label: "Exclude jailed candidates", type: "JAILED" },
    // { label: "Exclude over bonded candidates", type: "OVERBONDED" },
    // { label: "Exclude candidates with commision rate more than 10%", type: "COMMISSION" },
]

const PRIORITY_OPTS = [
    { label: "Commission Rate", value: "commissionRate" },
    { label: "Bonding Percent", value: "bondingPercent" },
]

export default function AutoVotePopup({ isOpen, onClose }) {
    function handleChangeCheckbox(type) {

    }

    return (
        <GenericModal isOpen={isOpen} onClose={onClose}>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <h4>Auto Vote</h4>
                    <span>&times;</span>
                </div>

                <div className={style.formWrapper}>
                    <form>

                        {/* <div className={style.row}> */}
                        <div className={style.inputWrapper}>
                            <label>Priority</label>
                            <DropdownMenu options={PRIORITY_OPTS} />
                        </div>


                        <div className={style.inputWrapper}>
                            <label>Number of candidates</label>
                            <input type="number" name="candidateCount" defaultValue={10} />
                        </div>

                        {/* </div> */}


                        <div className={style.inputWrapper}>
                            <label>Commission Rate Cut-off</label>
                            <input type="number" name="commissionCutoff" defaultValue={12.5} />
                        </div>

                        <div className={style.inputWrapper}>
                            <label>Over bonding percentage</label>
                            <input type="number" name="overBonding" defaultValue={10} />
                        </div>



                        <div className={style.checkboxes}>
                            {CHECKBOX_OPTS.map(item =>
                                <div className={style.checkboxWrapper}>
                                    <Checkbox checked={true} />
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
        </GenericModal>
    )
};


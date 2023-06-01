import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "./index.module.css";
import { chainMethods } from "../../utils/rawTxMaker";
import { requestJsonRpc } from "../../utils/connect";
import utils from "./utils";
import config from "../../config";

const { nid } = config;
const {
  typesOfProposals,
  proposalTypesData,
  stripString,
  getContentOfType
} = utils;

function ProposalSubmitPage({ walletAddress }) {
  const [typeState, setTypeState] = useState("text");
  const [valueState, setValueState] = useState(getContentOfType("text"));
  const [titleState, setTitleValue] = useState("Proposal Title");
  const [descriptionState, setDescriptionState] = useState(
    "Network Proposal description"
  );

  function handleTextareaValueChange(newValueState) {
    console.log("value state change");
    console.log(typeof newValueState);
    console.log(newValueState);
    setValueState(newValueState);
  }

  function handleTitleInputChange(evt) {
    setTitleValue(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    console.log("description changed");
    setDescriptionState(evt.target.value);
  }

  function handleTypeChange(evt) {
    console.log("dropdown change");
    console.log(evt.target.value);
    setTypeState(evt.target.value);
    setValueState(getContentOfType(evt.target.value));
  }

  function handleSubmitClick() {
    console.log("submit clicked");
  }

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>Create Proposal</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.containerItem}>
            <p className={styles.containerItemTitle}>Title</p>
            <input
              type="text"
              name={"name"}
              value={titleState}
              onChange={handleTitleInputChange}
              placeholder={"placeholder"}
              className={styles.containerItemInput}
            />
          </div>
          <div className={styles.containerItem}>
            <p className={styles.containerItemTitle}>Description</p>
            <textarea
              type="text"
              name={"name"}
              value={descriptionState}
              onChange={handleDescriptionChange}
              placeholder={"placeholder"}
              className={styles.containerItemTextarea}
            />
          </div>
          <div className={styles.containerItem}>
            <p className={styles.containerItemTitle}>Type</p>
            <DropdownItem value={typeState} onSelectChange={handleTypeChange} />
          </div>
          <div className={styles.containerItem}>
            <p className={styles.containerItemTitle}>Value</p>
            <TextAreaValueItem
              value={valueState}
              onChange={handleTextareaValueChange}
            />
          </div>
          <div className={styles.containerItem}>
            <button className={styles.submitButton} onClick={handleSubmitClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextAreaValueItem({ value, onChange }) {
  function handleChange(evt) {
    onChange(evt.target.value);
  }

  return (
    <textarea
      type="text"
      name={"textAreaValueItem"}
      value={value}
      onChange={handleChange}
      placeholder={""}
      className={styles.containerItemTextarea}
    />
  );
}

function DropdownItem({ value, onSelectChange }) {
  return (
    <div className={styles.dropdownItem}>
      <div className={styles.dropdownItemContent}>
        <select
          className={styles.dropdownItemSelect}
          onChange={onSelectChange}
          value={value || "text"}
        >
          {typesOfProposals.map(type => {
            return <option value={type}>{type}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default withRouter(ProposalSubmitPage);

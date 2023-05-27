import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "./index.module.css";
import { chainMethods } from "../../utils/rawTxMaker";
import { requestJsonRpc } from "../../utils/connect";
import utils from "../../utils/utils2";
import config from "../../config";

const { nid } = config;

function ProposalSubmitPage({ walletAddress }) {
  const [typeState, setTypeState] = useState("mainnet");

  function handleTypeChange() {
    console.log("type state change");
  }

  function handleTitleInputChange(evt) {
    console.log("input change");
    console.log(evt);
  }

  function onDropdownChange(evt) {
    console.log("dropdown change");
    setTypeState(evt.target.value);
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
              value={"value"}
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
              value={"value"}
              onChange={handleTitleInputChange}
              placeholder={"placeholder"}
              className={styles.containerItemTextarea}
            />
          </div>
          <div className={styles.containerItem}>
            <p className={styles.containerItemTitle}>Type</p>
            <DropdownItem value={typeState} onSelectChange={onDropdownChange} />
          </div>
          <div className={styles.containerItem}>
            <p className={styles.containerItemTitle}>Value</p>
            <textarea
              type="text"
              name={"name"}
              value={"value"}
              onChange={handleTitleInputChange}
              placeholder={"placeholder"}
              className={styles.containerItemTextarea}
            />
          </div>
          <div className={styles.containerItem}>
            <button 
              className={styles.submitButton}
              onClick={handleSubmitClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ value, onSelectChange }) {
  return (
    <div className={styles.dropdownItem}>
      <div className={styles.dropdownItemContent}>
        <select
          className={styles.dropdownItemSelect}
          onChange={onSelectChange}
          value={value || "mainnet"}
        >
          <option value="mainnet">Mainnet</option>
          <option value="berlin">Berlin</option>
          <option value="lisbon">Lisbon</option>
        </select>
      </div>
    </div>
  );
}

export default withRouter(ProposalSubmitPage);

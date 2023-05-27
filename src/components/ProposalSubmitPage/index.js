import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "./index.module.css";
import { chainMethods } from "../../utils/rawTxMaker";
import { requestJsonRpc } from "../../utils/connect";
import utils from "../../utils/utils2";
import config from "../../config";

const { nid } = config;

function ProposalSubmitPage({
  walletAddress
}) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h2>Create Proposal</h2>
      </div>
    </div>
  );
}

export default withRouter(ProposalSubmitPage);

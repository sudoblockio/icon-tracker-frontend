import React, { useState } from "react";
import styles from "./ProposalSubmitModal.module.css";
import GenericModal from "../GenericModal/genericModal";
import { chainMethods } from "../../utils/rawTxMaker";
import { requestJsonRpc } from "../../utils/connect";
import utils from "../../utils/utils2";
import config from "../../config";

const { nid } = config;

export default function ProposalSubmitModal({ isOpen, onClose }) {

  return (
    <div>
      <GenericModal isOpen={isOpen} onClose={onClose} useSmall={false}>
        <div>
          <div className={styles.main}>
            <div className={styles.defaultSection}></div>
            <div className={styles.defaultSection}>
              <h2>Create Proposal:</h2>
            </div>
          </div>
        </div>
      </GenericModal>
    </div>
  );
}

import React, { useState } from "react";
import styles from "./ProposalSubmitModal.module.css";
import GenericModal from "../GenericModal/genericModal";
import { chainMethods } from "../../utils/rawTxMaker";
import { requestJsonRpc } from "../../utils/connect";
import utils from "../../utils/utils2";
import config from "../../config";

const { nid } = config;

export default function ProposalSubmitModal({ isOpen, onClose, walletAddress }) {

  return (
    <div>
      <GenericModal isOpen={isOpen} onClose={onClose} useSmall={false}>
        <div>
          <div className={styles.main}>
            <div className={styles.title}>
              <h2>Create Proposal:</h2>
            </div>
          </div>
        </div>
      </GenericModal>
    </div>
  );
}

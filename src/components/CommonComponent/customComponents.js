import React, { useState, useEffect } from "react";
import styles from "./customComponents.module.css";
import GenericModal from "../GenericModal/genericModal";

export function Hr() {
  return (
    <div
      style={{ height: "2px", width: "100%", backgroundColor: "#d6d3d1" }}
    ></div>
  );
}

export function LoadingComponent() {
  return (
    <div className={styles.imgLoading}>
      {[1, 2, 3, 4, 5].map((foo, index) => (
        <div
          className={styles.imgLoadingItem}
        key={`loading-component-${index}`}></div>
      ))}
    </div>
  );
}

export function WalletResponseModal({
  isOpen,
  onClose,
  txData,
  walletResponse
}) {
  // useEffect(() => {
  //   console.log("wallet response");
  //   console.log(walletResponse);
  //   console.log("txData");
  //   console.log(txData);
  // });
  return (
    <GenericModal isOpen={isOpen} onClose={onClose} useSmall={true}>
      <div className={styles.modalContainer}>
        {walletResponse == null ? (
          <LoadingComponent />
        ) : walletResponse.isError === true ? (
          <>
            <h2>Transaction Result</h2>
            <p>Unexpected Error processing tx with installed wallet</p>
            <p>
              Error message:{" "}
              {walletResponse.message == null ? "null" : walletResponse.message}
            </p>
          </>
        ) : txData.txExists === true ? (
          <>
            <h2>Transaction Result</h2>
            <p>Transaction State: {txData.status ? "SUCCESS" : "FAILED"}</p>
            <p>Transaction hash: {txData.txHash}</p>
          </>
        ) : (
          <>
            <h2>Transaction Result</h2>
            <p>Transaction State: **FETCHING TX**</p>
            <p>Transaction hash: Null</p>
          </>
        )}
      </div>
    </GenericModal>
  );
}

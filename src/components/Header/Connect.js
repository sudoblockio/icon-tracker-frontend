import React, { useState, useEffect, Component } from "react";
import { requestAddress } from "../../utils/connect";
import { CopyButton } from "../../components";
import checkIconex from "check-iconex";
import NotificationManager from "../../utils/NotificationManager";

import styles from "./Connect.module.css";

const Connect = props => {
  const [disabled, setDisabled] = useState(false);
  const [walletAddress, setWalletAddress] = useState(props.walletAddress);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { isChrome, iconexInstalled, hasIconWallet } = await checkIconex(
        1000,
        2000
      );
      setDisabled(!(isChrome && iconexInstalled && hasIconWallet));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (props.walletAddress !== walletAddress) {
      setWalletAddress(props.walletAddress);
      window.dispatchEvent(
        new CustomEvent("CUSTOM_FX", { detail: { type: "SET_WALLET" } })
      );
    }
  }, [props.walletAddress]);

  const getWalletAddress = async () => {
    if (disabled) {
      window.open(
        "https://chrome.google.com/webstore/detail/iconex/flpiciilemghbmfalicajoolhkkenfel",
        "_blank"
      );
      return;
    }

    if (walletAddress) {
      return;
    }

    const address = await requestAddress();
    setWalletAddress(address);
    window.dispatchEvent(
      new CustomEvent("CUSTOM_FX", { detail: { type: "SET_WALLET" } })
    );
    props.setAddress(address);
    props.history.push(`/address/${address}`);
  };

  const disconnect = () => {
    setWalletAddress(undefined);
    props.clearWallet();
    NotificationManager.deregisterServiceWorker();
  };

  const handleMouseEnter = e => {
    setIsHover(true);
  };

  const handleMouseLeave = e => {
    setIsHover(false);
  };

  return (
    <div
      className={
        walletAddress ? `${styles.connect} ${styles.join}` : `${styles.connect}`
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={isHover ? "on" : ""}>
        <em className="img" />
      </span>
      {walletAddress ? (
        <div
          className={styles.subMenu}
          style={isHover ? { display: "block" } : { display: "none" }}
        >
          <p>
            <span>Wallet Address</span>
            <CopyButton
              data={walletAddress}
              title={"Copy Address"}
              wallet={true}
            />
          </p>
          <span className={styles.btn} onClick={disconnect}>
            Disconnect
          </span>
          <span
            className={styles.btn}
            onClick={() => props.history.push(`/address/${walletAddress}`)}
          >
            View Details
          </span>
        </div>
      ) : (
        <div
          className={styles.subMenu}
          style={isHover ? { display: "block" } : { display: "none" }}
        >
          <div className={styles.connectionSelectContainer}>
            <span className={styles.btn2} onClick={getWalletAddress}>
              Connect with ICONEX or Hana.
            </span>
            <span className={styles.btn2}>Connect with Ledger</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connect;

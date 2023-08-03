// Modal react component for login with ICON
//
import { useEffect, useState } from "react";
import Image from "next/image";
import Icx from "./utils/hw-app-icx/Icx2.js";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import { v4 as uuidv4 } from "uuid";
import { getIcxBalance } from "./utils/lib";
import GenericModal from "../GenericModal/genericModal";

import "@fontsource/lato";
import styles from "./LoginModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
const LOGIN_METHODS = {
  iconex: "ICONEX",
  ledger: "LEDGER"
};

async function retrieveICONLedgerAddresses(count = 20) {
  const PATH = "44'/4801368'/0'/0'";
  // connects to a ledger device and retrieve a set amount of ICON
  // addresses (count)
  let addressesData = [
    // {
    //   bip44Path: "44'/4801368'/0'/0'/n'" // bip44 path of the address
    //   icxAddress: 'hx49394...' // ICX address for the corresponding bip44path
    // }
  ];
  try {
    // connects to ledger device via webhid
    const transport = await TransportWebHID.create();

    const appIcx = new Icx(transport);
    for (let i = 0; i < count; i++) {
      let currentPath = PATH + `/${i.toString()}'`;
      const icxAddress = await appIcx.getAddress(currentPath, false, true);

      addressesData.push({
        bip44Path: currentPath,
        icxAddress: icxAddress.address.toString()
      });
    }

    return addressesData;
  } catch (err) {
    // handles error
    console.log(`Error: ${err}`);
    throw new Error(err.message);
  }
}

function getLoginDataInitState() {
  // initialize loginData
  // after user login the following set of data will be
  // passed to parent component
  return {
    selectedWallet: null,
    methodUsed: null,
    bip44Path: null,
    successfulLogin: false
  };
}

function LoginModal({ onRequestClose, onRetrieveData, isOpen }) {
  const [ledgerModalOn, setLedgerModalOn] = useState(false);
  const [ledgerModalIsWaiting, setLedgerModalIsWaiting] = useState(true);
  const [ledgerDidConnect, setLedgerDidConnect] = useState(false);
  const [ledgerAddressesState, setLedgerAddressesState] = useState(null);
  const [
    indexOfLedgerAddressSelected,
    setIndexOfLedgerAddressSelected
  ] = useState(0);
  const [loginData, setLoginData] = useState(getLoginDataInitState());
  const [walletsIcxBalance, setWalletsIcxBalance] = useState(null);
  const [ledgerError, setLedgerError] = useState("");

  function closeLedgerModal() {
    setLedgerModalOn(false);
  }

  function closeModal() {
    // send signal to close LoginModal
    onRequestClose();
  }

  function handleLoginData(newLoginData) {
    // updates local loginData state and sends loginData to parent component
    setLoginData(newLoginData);
    onRetrieveData(newLoginData);
  }

  async function getWalletsBalance(wallets) {
    // get the ICX balance of a list of wallets
    let walletsBalance = [];
    for (const wallet of wallets) {
      let balance = await getIcxBalance(wallet.icxAddress);
      walletsBalance.push(balance);
    }
    setWalletsIcxBalance(walletsBalance);
  }

  async function handleLedgerLogin() {
    // login with ledger using webUSB method

    // open ledger modal window and show 'connecting' animation
    setLedgerModalOn(true);
    setLedgerModalIsWaiting(true);
    let ledgerWallets = [];

    try {
      const ledgerAddresses = await retrieveICONLedgerAddresses();
      // const ledgerAddresses = MOCK_DATA; // for testing purposes

      // if ledger connected succesfully
      // get the balance of each wallet
      getWalletsBalance(ledgerAddresses);

      for (const wallet of ledgerAddresses) {
        ledgerWallets.push(wallet);
      }

      setLedgerAddressesState(ledgerWallets);
      setLedgerDidConnect(true);
    } catch (e) {
      // catch error mesage
      // if ledger connection failed
      console.log("error during ledger login");
      setLedgerDidConnect(false);
      setLedgerError(e.message);
    }
    // close 'connection animation and show ledger addresses
    setLedgerModalIsWaiting(false);
  }

  function onSelectLedgerWallet(walletIndex) {
    // user selected a ledger wallet but havent click 'cancel' or 'select' button

    // set state of selected wallet
    setIndexOfLedgerAddressSelected(walletIndex);

    // set wallet info on loginData
    let newLoginData = loginData;
    newLoginData.selectedWallet = ledgerAddressesState[walletIndex].icxAddress;
    newLoginData.bip44Path = ledgerAddressesState[walletIndex].bip44Path;
    setLoginData(newLoginData);
  }

  function handleLedgerWalletSelect() {
    // user selected a ledger wallet and clicked "select" button
    let newLoginData = loginData;
    newLoginData.methodUsed = LOGIN_METHODS.ledger;
    newLoginData.successfulLogin = true;

    // update loginData on local state and send data to parent component
    handleLoginData(newLoginData);

    // close modal
    closeLedgerModal();
    closeModal();
  }
  function handleLedgerWalletCancel() {
    // user selected a ledger wallet and clicked "cancel" button
    const blankLoginData = getLoginDataInitState();

    // reset login data back to initial values
    for (let label in loginData) {
      loginData[label] = blankLoginData[label];
    }
    closeLedgerModal();
  }

  useEffect(() => {
    function iconexRelayResponseEventHandler(evnt) {
      const { type, payload } = evnt.detail;
      const localLoginData = getLoginDataInitState();

      switch (type) {
        case "RESPONSE_ADDRESS":
          localLoginData.selectedWallet = payload;
          localLoginData.methodUsed = LOGIN_METHODS.iconex;
          localLoginData.successfulLogin = true;
          break;

        case "CANCEL":
          console.log("ICONex/Hana wallet selection window closed by user");
          break;

        default:
          console.error("Error on ICONEX_RELAY_RESPONSE");
          console.error("type: " + type);
          console.error("payload: ", payload);
      }

      // send data to parent component
      handleLoginData(localLoginData);

      // close LoginModal
      closeModal();
    }
    // create event listener for Hana and ICONex wallets
    window.addEventListener(
      "ICONEX_RELAY_RESPONSE",
      iconexRelayResponseEventHandler
    );

    // return the following function to perform cleanup of the event listener
    // on component unmount
    return function removeCustomEventListener() {
      window.removeEventListener(
        "ICONEX_RELAY_RESPONSE",
        iconexRelayResponseEventHandler
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main}>
      <LoginSelectionModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleLedgerLogin={handleLedgerLogin}
      />
      <LedgerModal
        isOpen={ledgerModalOn}
        closeModal={closeLedgerModal}
        ledgerModalIsWaiting={ledgerModalIsWaiting}
        ledgerDidConnect={ledgerDidConnect}
        ledgerAddressesState={ledgerAddressesState}
        indexOfLedgerAddressSelected={indexOfLedgerAddressSelected}
        onSelectLedgerWallet={onSelectLedgerWallet}
        handleLedgerWalletCancel={handleLedgerWalletCancel}
        handleLedgerWalletSelect={handleLedgerWalletSelect}
        walletsIcxBalance={walletsIcxBalance}
        ledgerError={ledgerError}
      />
    </div>
  );
}

function LoginSelectionModal({ isOpen, closeModal, handleLedgerLogin }) {
  function handleIconLogin() {
    // login with ICONex or Hana wallets
    window.dispatchEvent(
      new CustomEvent("ICONEX_RELAY_REQUEST", {
        detail: {
          type: "REQUEST_ADDRESS"
        }
      })
    );
  }

  return isOpen ? (
    <GenericModal isOpen={isOpen} onClose={closeModal} useSmall={true}>
      <div className={styles.title}>
        <h2>Login with ICON</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.bodySection} onClick={handleIconLogin}>
          <div className={styles.bodySectionItem}>
            <p>Login using ICONex | Hana wallet</p>
          </div>
          <div className={styles.bodySectionItem}>
            <span className={styles.bodySectionItemImg}>
              <Image
                src="/icon-logo.png"
                alt="icon logo"
                width={48}
                height={48}
              />
            </span>
            <span className={styles.bodySectionItemImg}>
              <Image
                src="/hana-logo.jpg"
                alt="icon logo"
                width={48}
                height={48}
              />
            </span>
          </div>
        </div>
        <hr />
        <div className={styles.bodySection} onClick={handleLedgerLogin}>
          <div className={styles.bodySectionItem}>
            <p>Login using Ledger</p>
          </div>
          <div className={styles.bodySectionItem}>
            <span className={styles.bodySectionItemImg}>
              <Image
                src="/ledger-logo.png"
                alt="icon logo"
                width={96}
                height={48}
              />
            </span>
          </div>
        </div>
      </div>
    </GenericModal>
  ) : (
    <></>
  );
}

function LedgerModal({
  isOpen,
  closeModal,
  ledgerModalIsWaiting,
  ledgerDidConnect,
  ledgerAddressesState,
  indexOfLedgerAddressSelected,
  onSelectLedgerWallet,
  handleLedgerWalletCancel,
  handleLedgerWalletSelect,
  walletsIcxBalance,
  ledgerError
}) {
  return isOpen ? (
    <GenericModal isOpen={isOpen} onClose={closeModal} useSmall={true}>
      {" "}
      {ledgerModalIsWaiting ? (
        <div className={styles.ledger}>
          <div className={styles.ledgerSection}>
            <Image
              src="/icon-logo.png"
              className={styles.ledgerLogo}
              alt="icon logo"
              width={48}
              height={48}
            />
            <p>Connecting to ledger...</p>
          </div>
        </div>
      ) : ledgerDidConnect ? (
        <div className={styles.ledger}>
          <div className={styles.ledgerSection}>
            <div className={styles.ledgerSectionWallet}>
              {ledgerAddressesState.map((wallet, index) => {
                return (
                  <div
                    className={
                      indexOfLedgerAddressSelected === index
                        ? `${styles.ledgerSectionWalletSection} ${styles.ledgerAddressSelected}`
                        : `${styles.ledgerSectionWalletSection}`
                    }
                    key={uuidv4()}
                    onClick={() => onSelectLedgerWallet(index)}
                  >
                    <div className={styles.ledgerSectionWalletIndex}>
                      <p>{index + 1}</p>
                    </div>
                    <div className={styles.ledgerSectionWalletContent}>
                      <div className={styles.ledgerSectionWalletAddress}>
                        <p>{wallet.icxAddress}</p>
                      </div>
                      <div className={styles.ledgerSectionWalletBalance}>
                        {walletsIcxBalance == null ? (
                          <p>Balance: -.- ICX</p>
                        ) : (
                          <p>Balance: {walletsIcxBalance[index]} ICX</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.ledgerSectionContainerBtn}>
              <button onClick={handleLedgerWalletCancel}>Cancel</button>
              <button onClick={handleLedgerWalletSelect}>Select</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.ledger}>
          <div className={styles.ledgerSection}>
            <Image
              src="/cancel-logo.png"
              className={styles.ledgerLogo}
              alt="icon logo"
              width={48}
              height={48}
            />
            <p>
              Failed to connect Ledger, try refreshing the page and/or
              reconnecting device.
            </p>
            {ledgerError && <p>Error: {ledgerError}</p>}
          </div>
        </div>
      )}
    </GenericModal>
  ) : (
    <></>
  );
}
export default LoginModal;

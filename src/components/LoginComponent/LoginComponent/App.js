import { useState, useEffect } from "react";
import Image from "next/image";
import { LoginModal, utils } from "../LoginModal";
import styles from "./App.module.css";

// Make sure LOCAL_KEY is a unique string
const LOCAL_KEY = "_UNIQUE_KEY_";

function App() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [localData, setLocalData] = useState(utils.getInitLocalData());
  //  localData: {
  //    auth: {
  //      selectedWallet: 'hx93940...',
  //      methodUsed: 'ICONEX' | 'LEDGER1',
  //      successfulLogin: bool
  //    }
  // }

  function toggleLogin() {
    // toggles between login and logout
    if (localData.auth.successfulLogin) {
      handleLogout();
    } else {
      handleLogin();
    }
  }

  function handleLogin() {
    // login with ICON
    setLoginModalIsOpen(true);
  }

  function handleLogout() {
    // close user session
    handleLocalDataChange(utils.getInitLocalData());
  }

  function handleLocalDataChange(newLocalData) {
    //
    setLocalData(newLocalData);

    // write login data locally to make user session persistance
    utils.saveDataToLocal(newLocalData, LOCAL_KEY);
  }

  function closeLoginModal() {
    // this function handles the closing of the LoginModal
    // dataFromModal is the login data passed from the component
    // to the parent after the login process
    setLoginModalIsOpen(false);
  }

  function getDataFromLoginModal(loginData) {
    // Callback function that gets called from within LoginModal
    // to pass login data into parent
    const newLocalData = {
      auth: loginData
    };

    handleLocalDataChange(newLocalData);
  }

  useEffect(() => {
    // get local login data on first render
    const userLocalData = utils.getLocalData(LOCAL_KEY);

    // set loginData state
    handleLocalDataChange(userLocalData);
  }, []);

  return (
    <div className={styles["App"]}>
      <header className={styles["App-header"]}>
        <Image
          src="/icon-logo.png"
          className={styles["App-logo"]}
          alt="icon logo"
          width={100}
          height={100}
        />
        <h2>Login with ICON</h2>
        <button className={styles["App-button-login"]} onClick={toggleLogin}>
          {localData.auth.successfulLogin ? <p>Log out</p> : <p>Log in</p>}
        </button>
        <LoginModal
          isOpen={loginModalIsOpen}
          onRequestClose={closeLoginModal}
          onRetrieveData={getDataFromLoginModal}
        />
        <p>Login data: {JSON.stringify(localData)}</p>
      </header>
    </div>
  );
}

export default App;

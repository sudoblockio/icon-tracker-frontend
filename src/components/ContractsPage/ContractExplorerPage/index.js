import React, { useState } from "react";
import MiscComponents from "./MiscContractComponents";
import ButtonSet from "./ButtonSet";
import styles from "./ContractExplorerPage.module.css";

const { ReadMethod, WriteMethod } = MiscComponents;

function ContractExplorerPage(props) {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.pageTitle}>Contract Writer</div>
        <div className={`${styles.pageContent}`}>
          <div
            className={`${styles.pageContentHeader} ${styles.paperContainer}`}
          >
            <InputItem  label={`Address`}/>
            <Separator />
            <DropdownItem label={`Network`} />
          </div>
          <div className={`${styles.pageContentBody} ${styles.paperContainer}`}>
            <ButtonSet 
              activeButton={activeSection}
              handleActiveChange={setActiveSection}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InputItem({ label }) {
  return (
    <div className={styles.inputItem}>
      <div className={styles.inputItemLabel}>{label}</div>
      <div className={styles.inputItemContent}>
        <input
          className={styles.inputItemInput}
          type="text"
          placeholder="cx0000.."
        />
      </div>
    </div>
  )
}

function DropdownItem({ label }) {
  return (
    <div className={styles.dropdownItem}>
      <div className={styles.dropdownItemLabel}>{label}</div>
      <div className={styles.dropdownItemContent}>
        <select className={styles.dropdownItemSelect}>
          <option value="mainnet">Mainnet</option>
          <option value="berlin">Berlin</option>
          <option value="lisbon">Lisbon</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  )
}

function Separator() {
  return <div className={styles.separator}></div>;
}
export default ContractExplorerPage;

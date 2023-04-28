import React, { useState } from "react";
import MiscComponents from "./MiscContractComponents";
import ButtonSet from "./ButtonSet";
import styles from "./ContractExplorerPage.module.css";

const { ReadMethod, WriteMethod } = MiscComponents;

function ContractExplorerPage(props) {
  const [activeSection, setActiveSection] = useState(0);
  const [networkState, setNetworkState] = useState("mainnet");

  function onNetworkChange(e) {
    console.log(e.target.value);
    setNetworkState(e.target.value);
  }

  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.pageTitle}>Contract Writer</div>
        <div className={`${styles.pageContent}`}>
          <div
            className={`${styles.pageContentHeader} ${styles.paperContainer}`}
          >
            <InputItem label={`Address`} />
            <Separator />
            <DropdownItem label={`Network`} onSelectChange={onNetworkChange} />
            {networkState === "custom" && (
              <>
                <Separator />
                <CustomNetworkItem
                  endpointLabel={`Endpoint`}
                  endpointNid={`NID`}
                />
              </>
            )}
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

function InputItem({
  label,
  useSmall = false,
  placeholder = "cx0000..",
  halfSize = false
}) {
  return (
    <div className={halfSize ? `${styles.inputItem} ${styles.inputItemHalfSize}` : `${styles.inputItem}`}>
      <div className={styles.inputItemLabel}>{label}</div>
      <div
        className={
          !useSmall
            ? `${styles.inputItemContent}`
            : `${styles.inputItemContent} ${styles.inputItemContentSmall}`
        }
      >
        <input
          className={styles.inputItemInput}
          type="text"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function DropdownItem({ label, onSelectChange }) {
  return (
    <div className={styles.dropdownItem}>
      <div className={styles.dropdownItemLabel}>{label}</div>
      <div className={styles.dropdownItemContent}>
        <select className={styles.dropdownItemSelect} onChange={onSelectChange}>
          <option value="mainnet">Mainnet</option>
          <option value="berlin">Berlin</option>
          <option value="lisbon">Lisbon</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  );
}

function CustomNetworkItem({ endpointLabel, endpointNid }) {
  return (
    <div className={styles.customNetworkItem}>
      <InputItem label={endpointLabel} />
      <Separator useVertical={true} />
      <InputItem label={endpointNid} useSmall={true} placeholder="3" />
    </div>
  );
}

function Separator({ useVertical = false }) {
  return (
    <div
      className={
        useVertical ? `${styles.separatorVertical}` : `${styles.separator}`
      }
    ></div>
  );
}
export default ContractExplorerPage;

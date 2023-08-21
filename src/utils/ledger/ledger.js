import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Icx from "./hw-app-icx";
import { generateHashKey } from "./utils";

function getIcxPath() {
  return "44'/4801368'/0'/0'";
}

async function signTransaction(serializedTx, accountPath) {
  try {
    const transport = await TransportWebHID.create();
    const appIcx = new Icx(transport);
    const signature = await appIcx.signTransaction(accountPath, serializedTx);
    transport.close();
    return signature;
  } catch (error) {
    console.log(`Error connecting to Ledger: ${error.message}`);
    throw new Error(`Error connecting to Ledger: ${error.message}`);
  }
}

async function getAddresses(count = 20) {
  const PATH = getIcxPath();
  const AddressesData = [];
  try {
    const transport = await TransportWebHID.create();
    const appIcx = new Icx(transport);
    for (let i = 0; i < count; i++) {
      const currentPath = PATH + "/" + `/${i.toString()}'`;
      const icxAddress = await appIcx.getAddress(currentPath, false, true);
      AddressesData.push({
        icxAddress: icxAddress.address.toString(),
        bip44Path: currentPath
      });
    }
    transport.close();
    return AddressesData;
  } catch (error) {
    console.log(`Error connecting to Ledger: ${error.message}`);
    throw new Error(`Error connecting to Ledger: ${error.message}`);
  }
}

function getSerializedTx(txObj) {
  return generateHashKey(txObj);
}


const ledger = {
  getAddresses,
  getIcxPath,
  getSerializedTx,
  signTransaction
};

export default ledger;

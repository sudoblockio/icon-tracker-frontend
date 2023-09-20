import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Icx from "./hw-app-icx";
import { generateHashKey } from "./utils";

function getIcxPath() {
  return "44'/4801368'/0'/0'";
}

async function signTransaction(serializedTx, accountPath) {
  console.log('signing transaction with ledger');
  console.log(serializedTx);
  console.log(accountPath);
  let transport = null;
  try {
    transport = await TransportWebHID.create();
    const appIcx = new Icx(transport);
    const signature = await appIcx.signTransaction(accountPath, serializedTx);
    transport.close();
    return signature;
  } catch (error) {
    console.log(error);
    console.log(`Error connecting to Ledger: ${error.message}`);
    throw new Error(`Error connecting to Ledger: ${error.message}`);
  }

  if (transport != null) {
    transport.close();
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

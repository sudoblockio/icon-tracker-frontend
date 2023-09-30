import { connect } from "react-redux";
import { Header } from "../../components";
import { search } from "../../redux/store/search";
import {
  setAddress,
  clearWallet,
  setWalletType,
  setBip44Path
} from "../../redux/actions/storageActions";

function mapStateToProps(state) {
  return {
    loading: state.search.loading,
    walletAddress: state.storage.walletAddress,
    walletType: state.storage.walletType,
    bip44Path: state.storage.bip44Path
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: param => dispatch(search(param)),
    setAddress: payload => dispatch(setAddress(payload)),
    clearWallet: () => dispatch(clearWallet()),
    setWalletType: payload => dispatch(setWalletType(payload)),
    setBip44Path: payload => dispatch(setBip44Path(payload))
  };
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;

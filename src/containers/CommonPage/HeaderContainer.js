import { connect } from "react-redux";
import { Header } from "../../components";
import { search } from "../../redux/store/search";
import {
  setAddress,
  clearWallet,
  setWalletType
} from "../../redux/actions/storageActions";

function mapStateToProps(state) {
  return {
    loading: state.search.loading,
    walletAddress: state.storage.walletAddress,
    walletType: state.storage.walletType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: param => dispatch(search(param)),
    setAddress: payload => dispatch(setAddress(payload)),
    clearWallet: () => dispatch(clearWallet()),
    setWalletType: payload => dispatch(setWalletType(payload))
  };
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;

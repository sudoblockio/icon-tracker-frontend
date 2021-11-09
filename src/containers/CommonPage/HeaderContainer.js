import { connect } from 'react-redux';
import { Header } from '../../components';
import { search } from '../../redux/store/search';
import { setAddress, clearWallet } from "../../redux/actions/storageActions"

function mapStateToProps(state) {
  return {
    loading: state.search.loading,
    walletAddress: state.storage.walletAddress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: param => dispatch(search(param)),
    setAddress: payload => dispatch(setAddress(payload)),
    clearWallet: () => dispatch(clearWallet())
  };
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;

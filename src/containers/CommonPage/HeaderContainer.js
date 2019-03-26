import { connect } from 'react-redux';
import { Header } from 'components';
import { search } from '../../redux/actions/searchActions';
import { setWalletAddress, clearWalletAddress } from "../../redux/actions/storageActions"

function mapStateToProps(state) {
  return {
    loading: state.search.loading,
    walletAddress: state.storage.walletAddress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: param => dispatch(search(param)),
    setWalletAddress: payload => dispatch(setWalletAddress(payload)),
    clearWalletAddress: () => dispatch(clearWalletAddress())
  };
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;

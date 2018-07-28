import { connect } from 'react-redux';
import { Header } from 'components';
import { search } from '../../redux/actions/searchActions';

function mapStateToProps(state) {
  return {
    loading: state.search.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: (param) => dispatch(search(param)),
  };
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;

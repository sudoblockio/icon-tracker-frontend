import { connect } from 'react-redux';
import { NotFoundPage } from 'components';
import { searchErrorReset } from '../../redux/actions/searchActions'

function mapStateToProps(state) {
  return {
    error: state.search.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchErrorReset: () => {dispatch(searchErrorReset())}
  };
}

const NotFoundPageContainer = connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);

export default NotFoundPageContainer;

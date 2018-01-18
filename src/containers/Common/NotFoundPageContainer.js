import { connect } from 'react-redux';
import { NotFound } from '../../components/';

function mapStateToProps(state) {
  return {
    error: state.search.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const NotFoundPageContainer = connect(mapStateToProps, mapDispatchToProps)(NotFound);

export default NotFoundPageContainer;

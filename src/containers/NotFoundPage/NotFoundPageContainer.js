import { connect } from 'react-redux';
import { NotFound } from '../../components/';
import { search } from '../../redux/actions/searchActions';

function mapStateToProps(state) {
  return {
    url: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const NotFoundPageContainer = connect(mapStateToProps, mapDispatchToProps)(NotFound);

export default NotFoundPageContainer;

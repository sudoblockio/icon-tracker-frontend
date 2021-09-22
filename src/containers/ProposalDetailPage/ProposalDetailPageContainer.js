
import { connect } from 'react-redux';
import { ProposalDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { 
  setPopup 
} from '../../redux/store/popup'

function mapStateToProps(state) {
  return {
    url: state.router.location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPopup: (payload) => dispatch(setPopup(payload))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProposalDetailPage));

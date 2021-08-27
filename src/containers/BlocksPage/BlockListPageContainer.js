import { connect } from 'react-redux';
import { BlockListPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { blockList } from '../../redux/store/blocks';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.blocks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    blockList: payload => dispatch(blockList(payload)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlockListPage));

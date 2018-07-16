import { connect } from 'react-redux';
import { BlocksPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { blockList } from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    blocks: state.blocks.blocks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    blockList: payload => dispatch(blockList(payload)),
  };
}

const BlocksPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BlocksPage));

export default BlocksPageContainer;

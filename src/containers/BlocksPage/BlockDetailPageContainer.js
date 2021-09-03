import { connect } from 'react-redux';
import { BlockDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
// import { blockInfo } from '../../redux/store/blocks';
import {
  blockInfo,
  blockTxList,
} from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.blocks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    blockInfo: (payload) => dispatch(blockInfo(payload)),
    blockTxList: (payload) => dispatch(blockTxList(payload)),
  };
}

const BlockDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BlockDetailPage));

export default BlockDetailPageContainer;

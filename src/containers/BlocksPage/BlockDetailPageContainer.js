import { connect } from 'react-redux';
import { BlockDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { blockInfo, blockTxList } from '../../redux/store/blocks';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.blocks,
    // block: state.blocks.block

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

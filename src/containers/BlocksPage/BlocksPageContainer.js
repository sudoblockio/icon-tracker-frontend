import { connect } from 'react-redux';
import { BlocksPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { getBlocks, resetBlocksReducer } from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    loading: state.blocks.blocks.loading,
    data: state.blocks.blocks.data,
    pageNum: state.blocks.blocks.pageNum,
    maxPageNum: state.blocks.blocks.maxPageNum,
    url: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBlocks: (pageId) => dispatch(getBlocks(pageId)),
    resetReducer: () => dispatch(resetBlocksReducer())
  };
}

const BlocksPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BlocksPage));

export default BlocksPageContainer;

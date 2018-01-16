import { connect } from 'react-redux';
import { BlocksPage } from '../../components/';
import { getBlocks, resetBlocksReducer } from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    loading: state.blocks.blocks.loading,
    data: state.blocks.blocks.data,
    pageNum: state.blocks.blocks.pageNum,
    maxPageNum: state.blocks.blocks.maxPageNum
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBlocks: (pageId) => dispatch(getBlocks(pageId)),
    resetReducer: () => dispatch(resetBlocksReducer())
  };
}

const BlocksPageContainer = connect(mapStateToProps, mapDispatchToProps)(BlocksPage);

export default BlocksPageContainer;

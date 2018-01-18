import { connect } from 'react-redux';
import { BlockDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { getBlock, resetBlockReducer } from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    loading: state.blocks.block.loading,
    data: state.blocks.block.data,
    pageNum: state.blocks.block.pageNum,
    maxPageNum: state.blocks.block.maxPageNum,
    url: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBlock: (payload) => dispatch(getBlock(payload)),
    resetReducer: () => dispatch(resetBlockReducer())
  };
}

const BlockDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BlockDetailPage));

export default BlockDetailPageContainer;

import { connect } from 'react-redux';
import { BlockDetailPage } from '../../components/';
import { getBlock, resetBlockReducer } from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    loading: state.blocks.block.loading,
    data: state.blocks.block.data,
    pageNum: state.blocks.block.pageNum,
    maxPageNum: state.blocks.block.maxPageNum,
    location: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBlock: (payload) => dispatch(getBlock(payload)),
    resetReducer: () => dispatch(resetBlockReducer())
  };
}

const BlockDetailPageContainer = connect(mapStateToProps, mapDispatchToProps)(BlockDetailPage);

export default BlockDetailPageContainer;

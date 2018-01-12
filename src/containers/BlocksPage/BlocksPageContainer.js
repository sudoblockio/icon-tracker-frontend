import { connect } from 'react-redux';
import { BlocksPage } from '../../components/';
import { getBlocks } from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    loading: state.blocks.blocks.loading,
    data: state.blocks.blocks.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBlocks: () => dispatch(getBlocks())
  };
}

const BlocksPageContainer = connect(mapStateToProps, mapDispatchToProps)(BlocksPage);

export default BlocksPageContainer;

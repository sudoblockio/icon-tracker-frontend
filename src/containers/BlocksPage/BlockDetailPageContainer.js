import { connect } from 'react-redux';
import { BlockDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { blockInfo, blockTxList, blockList } from '../../redux/store/blocks';


const mapStateToProps = (state) => {
  console.log(state, "state from BlockDetailPageContainer")
  return {
    url: state.router.location,
    ...state.blocks,
    // blocks: state.blocks.data,
    // block: state.blocks.block.data,
    // blockTx: state.blocks.blockTx.data
    
  }
}


function mapDispatchToProps(dispatch) {
  return {
    blockTxList: (payload) => dispatch(blockTxList(payload)),
    blockInfo: (payload) => dispatch(blockInfo(payload)),
    blockList: (payload) => dispatch(blockList(payload))
  };
}

const BlockDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BlockDetailPage));

export default BlockDetailPageContainer;

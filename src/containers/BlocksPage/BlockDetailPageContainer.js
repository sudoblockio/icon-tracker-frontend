import { connect } from 'react-redux';
import { BlockDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { blockInfo, blockTxList } from '../../redux/store/blocks';


const mapStateToProps = (state) => {
  console.log(state, "state from BlockDetailPageContainer")
  return {
    url: state.router.location,
    // ...state.blocks,
    blocks: state.blocks.blocks,
    block: state.blocks.block,
    blockTx: state.blocks.blockTx
    
  }
}


function mapDispatchToProps(dispatch) {
  return {
    blockTxList: (payload) => dispatch(blockTxList(payload)),
    blockInfo: (payload) => dispatch(blockInfo(payload)),
  };
}

const BlockDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BlockDetailPage));

export default BlockDetailPageContainer;

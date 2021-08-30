import { connect } from 'react-redux';
import { MainPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { getMainInfo, getMainChart } from '../../redux/actions/mainPageActions'
import { blockList} from '../../redux/store/blocks'
function mapStateToProps(state) {
  return {
      blocks: state.blocks.blocks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    blockList: payload => dispatch(blockList(payload)),
    getMainChart: () => dispatch(getMainChart())
  };
}

const MainPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));

export default MainPageContainer;

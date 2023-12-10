import { connect } from 'react-redux'
import { BlockDetailPage } from '../../components'
import { withRouter } from 'react-router-dom'
import { blockInfoAction, blockTxListAction, blockIntTxListAction } from '../../redux/store/blocks'

function mapStateToProps(state) {
    return {
        url: state.router.location,
        ...state.blocks,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        blockInfo: (payload) => dispatch(blockInfoAction(payload)),
        blockTxList: (payload) => dispatch(blockTxListAction(payload)),
        blockIntTxList: (payload) => dispatch(blockIntTxListAction(payload)),
    }
}

const BlockDetailPageContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BlockDetailPage)
)

export default BlockDetailPageContainer

import { connect } from 'react-redux';
import { ContractDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import {
    contractInfoAction,
    contractDetailPopupAction,
    contractDetailAction,
    contractTxListAction,
    contractInternalTxListAction,
    contractTokenTxListAction,
    contractEventLogListAction,
    icxGetScoreAction,
    icxCallAction,
    readContractInformationAction
} from '../../redux/store/contracts'
import { tokenSummary } from '../../redux/actions/tokensActions'

function mapStateToProps(state) {
    console.log(state, "token cx state")
    return {
        url: state.router.location,
        ...state.contracts,
        walletAddress: state.storage.walletAddress,
        contractDetails: state.contracts.contractDetail.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTokenSummary: payload => dispatch(tokenSummary(payload)),
        contractInfo: payload => dispatch(contractInfoAction(payload)),
        contractDetail: payload => dispatch(contractDetailAction(payload)),
        contractDetailPopup: payload => dispatch(contractDetailPopupAction(payload)),
        contractTxList: payload => dispatch(contractTxListAction(payload)),
        contractInternalTxList: payload => dispatch(contractInternalTxListAction(payload)),
        contractTokenTxList: payload => dispatch(contractTokenTxListAction(payload)),
        contractEventLogList: payload => dispatch(contractEventLogListAction(payload)),
        icxGetScore: payload => dispatch(icxGetScoreAction(payload)),
        icxCall: payload => dispatch(icxCallAction(payload)),        
        readContractInformation: payload => dispatch(readContractInformationAction(payload))
    };
}

const ContractDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractDetailPage));

export default ContractDetailPageContainer;

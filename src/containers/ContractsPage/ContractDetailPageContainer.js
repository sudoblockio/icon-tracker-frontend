import { connect } from 'react-redux';
import { ContractDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import {
    contractInfoAction,
    contractDetailPopupAction,
    contractTxListAction,
    contractInternalTxListAction,
    contractTokenTxListAction,
    contractEventLogListAction,
    icxGetScoreAction,
    icxCallAction,
    readContractInformationAction
} from '../../redux/store/contracts'

function mapStateToProps(state) {
    return {
        url: state.router.location,
        ...state.contracts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        contractInfo: payload => dispatch(contractInfoAction(payload)),
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

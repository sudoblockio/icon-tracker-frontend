import { connect } from 'react-redux';
import { ContractDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import {
    contractInfo,
    contractTxList,
    contractTokenTxList,
    contractEventLogList,
    icxGetScore,
    icxCall,
    readContractInformation
} from '../../redux/actions/contractsActions'

function mapStateToProps(state) {
    return {
        url: state.router.location,
        ...state.contracts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        contractInfo: payload => dispatch(contractInfo(payload)),
        contractTxList: payload => dispatch(contractTxList(payload)),
        contractTokenTxList: payload => dispatch(contractTokenTxList(payload)),
        contractEventLogList: payload => dispatch(contractEventLogList(payload)),
        icxGetScore: payload => dispatch(icxGetScore(payload)),
        icxCall: payload => dispatch(icxCall(payload)),        
        readContractInformation: payload => dispatch(readContractInformation(payload))
    };
}

const ContractDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractDetailPage));

export default ContractDetailPageContainer;

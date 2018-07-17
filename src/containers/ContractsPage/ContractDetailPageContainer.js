import { connect } from 'react-redux';
import { ContractDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import {
    contractInfo,
    contractTxList,
    contractTokenTxList,
    icxGetScore
} from '../../redux/actions/contractAction'

function mapStateToProps(state) {
    return {
        url: state.router.location,
        contract: state.contract.contract,
        contractTx: state.contract.contractTx,
        contractTokenTx: state.contract.contractTokenTx,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        contractInfo: payload => dispatch(contractInfo(payload)),
        contractTxList: payload => dispatch(contractTxList(payload)),
        contractTokenTxList: payload => dispatch(contractTokenTxList(payload)),
        icxGetScore: payload => dispatch(icxGetScore(payload))
    };
}

const ContractDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractDetailPage));

export default ContractDetailPageContainer;

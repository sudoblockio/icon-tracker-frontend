import { connect } from 'react-redux';
import { ContractDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import {
    selectContractInfo,
    selectContractTransactionList,
    selectContractTokenTransferList
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
        selectContractInfo: payload => dispatch(selectContractInfo(payload)),
        selectContractTransactionList: payload => dispatch(selectContractTransactionList(payload)),
        selectContractTokenTransferList: payload => dispatch(selectContractTokenTransferList(payload)),
    };
}

const ContractDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractDetailPage));

export default ContractDetailPageContainer;

import { connect } from "react-redux";
import { ProposalSubmitPage } from "../../components";
import { withRouter } from "react-router-dom";
import { setPopup } from "../../redux/store/popups";
import { addressInfoAction } from "../../redux/store/addresses";

function mapStateToProps(state) {
  return {
    walletAddress: state.storage.walletAddress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPopup: payload => dispatch(setPopup(payload)),
    addressInfo: payload => dispatch(addressInfoAction(payload))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProposalSubmitPage)
);

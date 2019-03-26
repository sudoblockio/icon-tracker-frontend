import React, { Component } from "react";
import { requestAddress } from "../../utils/connect";
import { CopyButton } from "components";
class Connect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: this.props.walletAddress
    };
  }
  
  getWalletAddress = async () => {
    if (this.state.walletAddress) {
      return;
    }
    const walletAddress = await requestAddress();
    this.setState({ walletAddress }, () => { this.props.setWalletAddress(walletAddress) });
  }

  disconnect = () => {
    this.setState({ walletAddress: undefined }, () => { this.props.clearWalletAddress() })
  }
  
  render() {
    const { walletAddress } = this.state;
    return (
      <div className={`connect ${walletAddress ? "join" : ""}`}>
        <span onClick={this.getWalletAddress}>
          <em className="img" />
        </span>
        {walletAddress ? (
          <div className="sub-menu">
            <p>
              <span>Wallet Address</span>
              <CopyButton data={walletAddress} title={"Copy Address"} wallet={true} />
            </p>
            <span className="btn" onClick={this.disconnect}>
              Disconnect
            </span>
            <span
              className="btn"
              onClick={() => {
                this.props.history.push(`/address/${walletAddress}`);
              }}
            >
              View Details
            </span>
          </div>
        ) : (
            ""
          )}
      </div>
    );
  }
}

export default Connect;

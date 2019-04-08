import React, { Component } from "react";
import { requestAddress } from "../../utils/connect";
import { CopyButton } from "components";
import checkIconex from 'check-iconex'
import { deregisterServiceWorker } from "../../notification";

class Connect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      walletAddress: this.props.walletAddress
    };
  }

  async componentDidMount() {
    const { isChrome, iconexInstalled, hasIconWallet } = await checkIconex(1000, 2000)
    this.setState({ disabled: !(isChrome && iconexInstalled && hasIconWallet)})
  }

  getWalletAddress = async () => {
    if (this.state.walletAddress) {
      return;
    }
    const walletAddress = await requestAddress();
    this.setState({ walletAddress }, () => {
      window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "SET_WALLET" } }))
      this.props.setAddress(walletAddress)
      this.props.history.push(`/address/${walletAddress}`);
    });
  }

  disconnect = () => {
    this.setState({ walletAddress: undefined }, () => {
      this.props.clearWallet()
      deregisterServiceWorker()
    })
  }

  render() {
    const { walletAddress, disabled } = this.state;
    return (
      <div className={`connect ${walletAddress ? "join" : ""}`}>
        <span onClick={this.getWalletAddress} className={disabled ? 'disabled' : ''}>
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

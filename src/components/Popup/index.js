import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddressQrCode from './AddressQrCode';
import ContractDetail from './ContractDetail';
import ContractVerification from './ContractVerification';
import Scam from './Scam';
import Search from './Search';
import { initPopup } from '../../redux/store/popups';
import { POPUP_TYPE } from '../../utils/const';

class Popup extends Component {
  componentWillReceiveProps(nextProps) {
    const { type: current } = this.props;
    const { type: next } = nextProps;

    if (current === '' && next !== '') {
      this.openPopup(next);
    }
  }

  openPopup = type => {
    switch (type) {
      case POPUP_TYPE.QR:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'qr' }
          })
        );
        break;
      case POPUP_TYPE.DETAIL:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'detail' }
          })
        );
        break;
      case POPUP_TYPE.SCAM:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'scam' }
          })
        );
        break;
      case POPUP_TYPE.VERIFICATION:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'verification' }
          })
        );
        break;
      case POPUP_TYPE.SEARCH:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'search' }
          })
        );
        break;
      case POPUP_TYPE.ABOUT:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'about' }
          })
        );
        break;
      case POPUP_TYPE.SUGGEST:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'suggest' }
          })
        );
        break;
      case POPUP_TYPE.COMMISSION:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'commission' }
          })
        );
        break;
      case POPUP_TYPE.GOVERNANCE:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'governance' }
          })
        );
        break;
      case POPUP_TYPE.SPONSOR:
        window.dispatchEvent(
          new CustomEvent('CUSTOM_FX', {
            detail: { type: 'POPUP_OPEN', param: 'sponsor' }
          })
        );
        break;
      default:
    }
  };

  closePopup = () => {
    this.props.initPopup();
    window.dispatchEvent(
      new CustomEvent('CUSTOM_FX', {
        detail: { type: 'POPUP_CLOSE', param: '' }
      })
    );
  };
  closeDetail = () => {
    this.props.initPopup();
    window.dispatchEvent(
      new CustomEvent('CUSTOM_FX', {
        detail: { type: 'POPUP_CLOSE', param: 'detail' }
      })
    );
  };
  closeScam = () => {
    this.props.initPopup();
    window.dispatchEvent(
      new CustomEvent('CUSTOM_FX', {
        detail: { type: 'POPUP_CLOSE', param: 'scam' }
      })
    );
  };
  closeSearch = () => {
    this.props.initPopup();
    window.dispatchEvent(
      new CustomEvent('CUSTOM_FX', {
        detail: { type: 'POPUP_CLOSE', param: 'search' }
      })
    );
  };
  closeAbout = () => {
    this.props.initPopup();
    window.dispatchEvent(
      new CustomEvent('CUSTOM_FX', {
        detail: { type: 'POPUP_CLOSE', param: 'about' }
      })
    );
  };
  closeAbout = () => {
    this.props.initPopup();
    window.dispatchEvent(
      new CustomEvent('CUSTOM_FX', {
        detail: { type: 'POPUP_CLOSE', param: 'suggest' }
      })
    );
  };
  closeAbout = () => {
    this.props.initPopup();
    window.dispatchEvent(
      new CustomEvent('CUSTOM_FX', {
        detail: { type: 'POPUP_CLOSE', param: 'commission' }
      })
    );
  };
  closeGovernance = () => {
    this.props.initPopup();
    window.dispatchEvent(
      new CustomEvent('CUSTOM_FX', {
        detail: { type: 'POPUP_CLOSE', param: 'governance' }
      })
    );
  };
  closeSponsor = () => {
    this.props.initPopup();
    window.dispatchEvent(
      new CustomEvent('CUSTOM_FX', {
        detail: { type: 'POPUP_CLOSE', param: 'sponsor' }
      })
    );
  };

  render() {
    console.log(this.props, "popup props")
    const { type, data } = this.props;
    const isQr = type === POPUP_TYPE.QR;
    const qrData = isQr ? data : {};
    const isDetail = type === POPUP_TYPE.DETAIL;
    const detailData = isDetail ? data : {};
    const isScam = type === POPUP_TYPE.SCAM;
    const scamData = isScam ? data : {};
    const isSearch = type === POPUP_TYPE.SEARCH;
    const searchData = isSearch ? data : {};
    return (
      <React.Fragment>
        <div key='qr' className='popup-wrap qr'>
          <div className='dimmed' />
          <div className='popup'>
            <span className='close' onClick={this.closePopup}>
              <em className='img' />
            </span>
            {isQr && <AddressQrCode data={qrData} />}
          </div>
        </div>
        <div key='detail' className='popup-wrap detail'>
          <div className='dimmed' />
          <div className='popup contract'>
            <span className='close' onClick={this.closePopup}>
              <em className='img' />
            </span>
            {isDetail && (
              <ContractDetail
                data={detailData}
                closeDetail={this.closeDetail}
              />
            )}
          </div>
        </div>
        <div key='scam' className='popup-wrap scam'>
          <div className='dimmed' />
          <div className='popup scam'>
            <span className='close' onClick={this.closePopup}>
              <em className='img' />
            </span>
            {isScam && <Scam data={scamData} closeScam={this.closeScam} />}
          </div>
        </div>
        <div
          key='about'
          className='popup-wrap about'
          style={{ display: 'none' }}
        >
          <div className='dimmed'></div>
          <div className='popup'>
            <h1 className='title'>About Governance</h1>
            <p className='txt'>
              ICON Network is a blockchain network operated by Public
              Representative (P-Rep). Therefore, Users (ICONist) must vote for
              high qualified P-Reps so that ICON Network to be more stable. Each
              P-Reps can submit the Monthly Reward Variable for Representative
              (i_rep) that affects the total reward amount for the ICON Network.
              Therefore, users should compare each i_reps submitted by each
              P-Reps and make right decision. In addition, users who have
              participated in the vote will receive reward with Annual
              Delegation Reward Rate for Representative (r_rep).
            </p>
            <div className='box'>
              <p className='sub-title'>· Public Treasury</p>
              <p className='txt'>
                Public Treasury, a fully automated reward fund that stores all
                ICX rewards until ICONists claim their rewards using I-Score. It
                is funded by ICX issuance and network fees (Step).
              </p>
              <p className='sub-title'>· i_rep</p>
              <p className='txt'>
                Monthly Reward Variable for Representative is a variable that
                determines the reward amount for contribution by
                Representatives.
              </p>
              <p className='sub-title'>· r_rep</p>
              <p className='txt'>
                Annual Delegation Reward Rate for Representative is the rate
                received by an ICONist who delegates their ICX to a
                Representative. At the moment, considering the r_eep and r_dapp,
                the r_rep is tripled.
              </p>
              <p className='sub-title'>· Step Price</p>
              <p className='txt'>
                Step Price is a variable that determines the price of Step.
              </p>
            </div>
            <div className='btn-holder full'>
              <button
                className='btn-type-normal size-full'
                onClick={this.closeAbout}
              >
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
        <div
          key='suggest'
          className='popup-wrap suggest'
          style={{ display: 'none' }}
        >
          <div className='dimmed'></div>
          <div className='popup'>
            <h1 className='title'>Suggested Commission Rate</h1>
            <p className='txt'>
              Each Main P-Rep suggests a commission rate, then the ICON Network
              takes an average to form the Global Commission Rate
            </p>
            <div className='btn-holder full'>
              <button
                className='btn-type-normal size-full'
                onClick={this.closeAbout}
              >
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
        <div
          key='commission'
          className='popup-wrap commission'
          style={{ display: 'none' }}
        >
          <div className='dimmed'></div>
          <div className='popup'>
            <h1 className='title'>Global Commission Rate</h1>
            <p className='txt'>
              The percentage of block rewards that go to P-Reps. For example,
              with a 20% commission rate, if 100 ICX inflation is created then
              20 goes to P-Reps and 80 goes to voters.
            </p>
            <div className='btn-holder full'>
              <button
                className='btn-type-normal size-full'
                onClick={this.closeAbout}
              >
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
        <div
          key='governance'
          className='popup-wrap governance'
          style={{ display: 'none' }}
        >
          <div className='dimmed'></div>
          <div className='popup'>
            <h1 className='title'>Governance</h1>
            <p className='txt'>
              Teams with a “Yes” are doing extra work to manage and grow the
              ICON Network
            </p>
            <div className='btn-holder full'>
              <button
                className='btn-type-normal size-full'
                onClick={this.closeGovernance}
              >
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
        <div
          key='sponsor'
          className='popup-wrap sponsor'
          style={{ display: 'none' }}
        >
          <div className='dimmed'></div>
          <div className='popup'>
            <h1 className='title'>Sponsored Projects</h1>
            <p className='txt'>
              Sponsored Projects counts each time a team has invested their own
              ICX to support a project
            </p>
            <div className='btn-holder full'>
              <button
                className='btn-type-normal size-full'
                onClick={this.closeSponsor}
              >
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
        {isSearch && (
          <Search
            key='search'
            data={searchData}
            closeSearch={this.closeSearch}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    type: state.popup.type,
    data: state.popup.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initPopup: () => dispatch(initPopup())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { WalletInformation, WalletTransactions, NoData} from '../../components'
import { dateToUTC9, numberWithCommas, convertNumberToText } from '../../utils/utils';

class AddressesDetailPage extends Component {

  constructor(props) {
    super(props);
    const { location } = this.props;
    const query = queryString.parse(location.search);
    this.address = query.address;
  }

  componentWillMount() {
    this.props.getAddressDetail(this.address);
  }

  componentWillUnmount() {
    // this.props.initAddressDetail();
  }

  render() {
    const { loading, data, pageNum } = this.props;
    const content = (data) => {
      // 데이터가 없을 경우
      if (data === "") {
        return (
          <NoData string={this.address}/>
        )
      }
      else {
        const { walletDetail, walletTx } = data;
        return (
          <div className="content-wrap">
            <div className="screen0">
              <WalletInformation walletDetail={walletDetail}/>
            </div>
            <div className="screen1">
              <WalletTransactions walletTx={walletTx}/>
            </div>
          </div>
        )
      }
    }

    return (content(data));
  }
}

export default withRouter(AddressesDetailPage);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { WalletInformation, WalletTransactions, NoData, LoadingComponent } from '../../components'
import { dateToUTC9, numberWithCommas, convertNumberToText } from '../../utils/utils';

class AddressesDetailPage extends Component {

  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.pageId = this.props.match.params.pageId || 1;
  }

  componentWillMount() {
    this.props.getAddressDetail({
      address: this.id,
      pageNum: this.pageId
    });
  }

  render() {
    const { loading, data, pageNum, maxPageNum } = this.props;
    const content = (data) => {
      // 데이터가 없을 경우
      if (data === "") {
        return (
          <NoData string={this.id}/>
        )
      }

      const { walletDetail, walletTx } = data;
      return (
        <div className="content-wrap">
          <div className="screen0">
            <WalletInformation walletDetail={walletDetail}/>
          </div>
          <div className="screen1">
            <WalletTransactions walletTx={walletTx} pageNum={this.pageId} maxPageNum={maxPageNum}/>
          </div>
        </div>
      )
    }

    return (content(data));
  }
}

export default withRouter(AddressesDetailPage);

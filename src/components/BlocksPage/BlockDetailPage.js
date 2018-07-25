import React, { Component } from 'react';
import {
  BLOCK_TABS
} from '../../utils/const'
import {
  BlockInfo,
  BlockTabs,
  DetailPage
} from '../../components/';

class BlockDetailPage extends Component {

  render() {
    const { block } = this.props;
    const { loading, error } = block

    return (
      <DetailPage
        {...this.props}
        loading={loading}
        error={error}
        TABS={BLOCK_TABS}
        ROUTE="/block"
        getInfo={height => {this.props.blockInfo({ height })}}
        getList={[
          height => {
            this.props.blockTxList({ height, page: 1, count: 10})
          }
        ]}
        InfoComponent={BlockInfo}
        TabsComponent={BlockTabs}
      />
    )
  }
}

export default BlockDetailPage;

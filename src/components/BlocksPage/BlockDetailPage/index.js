import React, { Component } from 'react';
import BlockInfo from './BlockInfo'
import BlockTabs from './BlockTabs'
import {
  BLOCK_TABS
} from '../../../utils/const'
import {
  DetailPage
} from '../../../components';

class BlockDetailPage extends Component {

  render() {
    const { block } = this.props;
    const { loading, error } = block
    {console.log(this.props, "what is this? ")}

    return (
      
      <DetailPage
        {...this.props}
        loading={loading}
        error={error}
        TABS={BLOCK_TABS}
        ROUTE="/block"
        getInfo={number => {this.props.blockInfo({ number })}}
        getList={[
          number => {
            this.props.blockTxList({ number, limit: 25, page: 1, count: 10})
          }
        ]}
        InfoComponent={BlockInfo}
        TabsComponent={BlockTabs}
      />
    )
  }
}

export default BlockDetailPage;

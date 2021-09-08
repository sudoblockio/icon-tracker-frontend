import React, { Component } from 'react';
import { BlockDetailPageContainer } from '../containers'

class BlockDetailPage extends Component {
  render() {
    console.log(this.props)
    return (
      <BlockDetailPageContainer />
    );
  }
}

export default BlockDetailPage;

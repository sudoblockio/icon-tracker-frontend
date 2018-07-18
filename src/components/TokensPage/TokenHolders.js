import React, { Component } from 'react';
import {
  TxBottomWrapper
} from '../../components'

class TokenHolders extends Component {
  render() {
    return (
      <TxBottomWrapper
        {...this.props}
      />
    )
  }
}

export default TokenHolders;


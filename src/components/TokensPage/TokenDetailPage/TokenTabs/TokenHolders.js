import React, { Component } from 'react';
import {
  TxBottom
} from '../../../../components'

class TokenHolders extends Component {
  
  render() {
    console.log(this.props, "token holder bottom props")
    return <TxBottom {...this.props}/>
  }
}

export default TokenHolders;


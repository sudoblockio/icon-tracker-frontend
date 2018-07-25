import React, { Component } from 'react';
import {
  ContractRead
} from '../../../components'

class TokenContractRead extends Component {
  render() {
    return <ContractRead {...this.props}/>
  }
}

export default TokenContractRead;

import React, { Component } from 'react';
import {
  TxBottom
} from '../../../../components'

class AddressBonded extends Component {
    render() {
      console.log(this.props, "bonded")
    return <TxBottom {...this.props}/>
  }
}

export default AddressBonded;


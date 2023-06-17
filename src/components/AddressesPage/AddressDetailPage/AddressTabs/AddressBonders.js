
import React, { Component } from 'react';
import {
  TxBottom
} from '../../../../components'
class AddressBonders extends Component {
  
  render() {
      console.log(this.props, "props address bonders")
    return <TxBottom  {...this.props}/>
  }
}

export default AddressBonders;


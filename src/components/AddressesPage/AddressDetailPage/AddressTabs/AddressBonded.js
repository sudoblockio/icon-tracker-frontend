
import React, { Component } from 'react';
import {
  TxBottom
} from '../../../../components'
import {getBondList} from '../../../../redux/store/iiss'
class AddressBonded extends Component {
  
  async componentDidMount(){
    let payload = {address: `${this.props.address}`}
    this.bonds = await getBondList(payload)

  }
    render() {
      console.log(this.props, "what props here")
    return <TxBottom 
      {...this.props}
      />
  }
}

export default AddressBonded;


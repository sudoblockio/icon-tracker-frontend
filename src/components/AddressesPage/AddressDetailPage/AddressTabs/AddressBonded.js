
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
      
    return <TxBottom 
      {...this.props}
      />
  }
}

export default AddressBonded;


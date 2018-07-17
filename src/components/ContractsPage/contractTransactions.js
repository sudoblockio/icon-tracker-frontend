import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { 
    LoadingComponent, 
    AddressTableHead,
    AddressTableBody,
    NoBox
} from '../../components'
import { TX_TYPE } from '../../utils/const'

class TokenTransfers extends Component {
    
    render() {   
        const Contents = (_data, _totalData, _loading) => {
            if (_loading) {
                return (
                    <LoadingComponent height='349px' />
                )
            }
            else if (_data.length === 0) {
                return (
                    <NoBox text='No Transaction'/>
                )
            }
            else {
                return (
                    <div className="contents">
                        <p className="txt"><span>A Total of<em className="mint" onClick={this.props.goAllTx}>{_totalData} Token transfers</em> found</span></p>
                        <table className="table-typeF">
                            <thead>
                                <AddressTableHead txType={TX_TYPE.TOKEN_TX}/>
                            </thead>
                            <tbody>
                            {
                                _data.map((transfer, index) => (
                                    <AddressTableBody key={index} txType={TX_TYPE.TOKEN_TX} data={transfer} />
                                ))
                            }                     
                            </tbody>
                        </table>
                    </div>
                )            
            }
        }

        const { tokenTransfers } = this.props 
        const { data, totalData, loading } = tokenTransfers
        return Contents(data, totalData, loading)
    }
}

export default withRouter(TokenTransfers);
